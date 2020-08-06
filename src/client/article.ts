// ----- Imports ----- //

import { notificationsClient, acquisitionsClient } from 'native/nativeApi';
import { Topic } from '@guardian/bridget/Topic';
import { IMaybeEpic as MaybeEpic } from '@guardian/bridget/MaybeEpic';
import { formatDate } from 'date';
import { logger } from "../logger";
import { createElement as h } from 'react';
import setup from 'client/setup';
import Epic from 'components/shared/epic';
import ReactDOM from 'react-dom';
import { ads, slideshow, videos, reportNativeElementPositionChanges } from 'client/nativeCommunication';


// ----- Run ----- //

const followText = 'Follow ';
const followingText = 'Following ';

interface FontFaceSet {
    readonly ready: Promise<FontFaceSet>;
}

declare global {
    interface Document {
        fonts: FontFaceSet;
    }
}

function getTopic(follow: Element | null): Topic | null {
    const id = follow?.getAttribute('data-id');
    const displayName = follow?.getAttribute('data-display-name');

    if (!id) {
        logger.error('No id for topic');
        return null;
    }

    if (!displayName) {
        logger.error('No display name for topic');
        return null;
    }
    return new Topic({ id, displayName, type: 'tag-contributor' });
}

function topicClick(e: Event): void {
    const follow = document.querySelector('.js-follow');
    const status = follow?.querySelector('.js-status');
    const statusText = status?.textContent;
    const topic = getTopic(follow);

    if (topic) {
        if (statusText && statusText === followText) {
            notificationsClient.follow(topic).then(success => {
                if (status?.textContent && success) {
                    status.textContent = followingText;
                }
            })
        } else {
            notificationsClient.unfollow(topic).then(success => {
                if (status?.textContent && success) {
                    status.textContent = followText;
                }
            })
        }
    }
}

function topics(): void {
    const follow = document.querySelector('.js-follow');
    const status = follow?.querySelector('.js-status');
    const topic = getTopic(follow);

    if (topic) {
        follow?.addEventListener('click', topicClick);
        notificationsClient.isFollowing(topic).then(following => {
            if (following && status?.textContent) {
                status.textContent = followingText;
            }
        })
    }
}

function formatDates(): void {
    Array.from(document.querySelectorAll('time[data-date]'))
        .forEach(time => {
            try {
                const timestamp = time.getAttribute('data-date');
                if (timestamp) {
                    time.textContent = formatDate(new Date(timestamp))
                }
            } catch (e) {
                logger.error(`Unable to parse and format date ${time}`, e);
            }
        })
}

function insertEpic(): void {
    if (navigator.onLine && !document.getElementById('epic-container')) {
        acquisitionsClient.getEpics().then((maybeEpic: MaybeEpic) => {
            if (maybeEpic.epic) {
                const epicContainer = document.createElement('div');
                epicContainer.id = 'epic-container';
                document.querySelector('footer')?.prepend(epicContainer);
                const { title, body, firstButton, secondButton } = maybeEpic.epic;
                const epicProps =  { title, body, firstButton, secondButton };
                ReactDOM.render(h(Epic, epicProps), epicContainer)
            }
        })
    }
}

interface FormData {
    [key: string]: string;
}

function submit(body: FormData, form: Element): void {
    fetch('https://callouts.code.dev-guardianapis.com/formstack-campaign/submit', {
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(() => {
        form.innerHTML = "<p>Thank you for your contribution</p>"
    })
    .catch(() => {
        const errorPlaceholder = form.querySelector('.error-message');
        if (errorPlaceholder) {
            errorPlaceholder.textContent = "Sorry, there was a problem submitting your form. Please try again later."
        }
    })
}

function readFile(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        setTimeout(reject, 30000);

        reader.addEventListener('load', () => {
                if (reader.result) {
                    const fileAsBase64 = reader.result
                        .toString()
                        .split(';base64,')[1];
                    resolve(fileAsBase64);
                }
            }
        );

        reader.addEventListener('error', () => {
            reject();
        });

        reader.readAsDataURL(file);
    })
}

function callouts(): void {
    const callouts = Array.from(document.querySelectorAll('details.callout'));
    callouts.forEach(callout => {
        const buttons = Array.from(callout.querySelectorAll('.callout-expand'));
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                callout.toggleAttribute('open');
            })
        })

        const form = callout.querySelector('form');
        if (!form) return;
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        form.addEventListener('submit', async (e): Promise<void> => {
            try {
                e.preventDefault();
                const elements = form.elements as HTMLCollectionOf<HTMLInputElement>;
                const data = Array.from(elements).reduce(async (o: Promise<FormData>, elem) => {
                    const acc = await o;
                    const { type, checked, name, value, files } = elem;
                    if (type === 'radio') {
                        if (checked) {
                            acc[name] = value;
                        }
                    } else if (type === 'file' && files?.length) {
                        acc[name] = await readFile(files[0]);
                    } else if (value) {
                        acc[name] = value;
                    }
                    return Promise.resolve(acc);
                }, Promise.resolve({}));

                submit(await data, form);
            } catch(e) {
                const errorPlaceholder = form.querySelector('.error-message');
                if (errorPlaceholder) {
                    errorPlaceholder.innerHTML = "There was a problem with the file you uploaded above. We accept images and pdfs up to 6MB"
                }
            }
        })
    })
}

setup();
ads();
videos();
reportNativeElementPositionChanges();
topics();
slideshow();
formatDates();
insertEpic();
callouts();
