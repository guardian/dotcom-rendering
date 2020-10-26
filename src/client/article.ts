// ----- Imports ----- //

import { notificationsClient, acquisitionsClient, userClient } from 'native/nativeApi';
import { Topic } from '@guardian/bridget/Topic';
import { formatDate } from 'date';
import { logger } from "../logger";
import { createElement as h } from 'react';
import setup from 'client/setup';
import Epic from 'components/shared/epic';
import ReactDOM from 'react-dom';
import { ads, slideshow, videos, reportNativeElementPositionChanges } from 'client/nativeCommunication';
import { AudioAtom } from '@guardian/atoms-rendering';
import { QuizAtom } from '@guardian/atoms-rendering';
import { QuizAtomType } from '@guardian/atoms-rendering/dist/QuizAtom';
import FooterCcpa from 'components/shared/footer';


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
            void notificationsClient.follow(topic).then(success => {
                if (status?.textContent && success) {
                    status.textContent = followingText;
                }
            })
        } else {
            void notificationsClient.unfollow(topic).then(success => {
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
        void notificationsClient.isFollowing(topic).then(following => {
            if (following && status?.textContent) {
                status.textContent = followingText;
            }
        })
    }
}

function formatDates(): void {
    Array.from(document.querySelectorAll('time[data-date]'))
        .forEach(time => {
            const timestamp = time.getAttribute('data-date');

            try {
                if (timestamp) {
                    time.textContent = formatDate(new Date(timestamp))
                }
            } catch (e) {
                const message = timestamp ?? 'because the data-date attribute was empty';

                logger.error(`Unable to parse and format date ${message}`, e);
            }
        })
}

// TODO: show epics on opinion articles
function insertEpic(): void {
    const epicPlaceholder = document.getElementById('epic-placeholder');
    if (epicPlaceholder) {
        epicPlaceholder.innerHTML = "";
    }
    if (navigator.onLine && epicPlaceholder) {
        Promise.all([userClient.isPremium(), acquisitionsClient.getEpics()]).then(
            ([isPremium, maybeEpic]) => {
                if (!isPremium && maybeEpic.epic) {
                    const { title, body, firstButton, secondButton } = maybeEpic.epic;
                    const epicProps =  {
                        title,
                        body,
                        firstButton,
                        secondButton
                    };
                    ReactDOM.render(h(Epic, epicProps), epicPlaceholder);
                }
            }
        ).catch(error => console.error(error));
    }
}

function footerInit(): void {
    const isAndroid = /(android)/i.test(navigator.userAgent);
    const footer = document.getElementById('articleFooter');
    if (footer && isAndroid){
        footer.innerHTML = '';
    } else {
        isCCPA();
    }
}

function isCCPA(): void {
    userClient.doesCcpaApply().then(isOptedIn => {
        const comp = h(FooterCcpa, {isCcpa: isOptedIn});
        ReactDOM.render(comp, document.getElementById('articleFooter'));
    }).catch((error)=>{
        console.log(error);
    })
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
            const message = document.createElement('p');
            message.textContent = 'Thank you for your contribution';
            if (form.firstChild) {
                form.replaceChild(message, form.firstChild);
            }
        })
        .catch(() => {
            const errorPlaceholder = form.querySelector('.js-error-message');
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
    const callouts = Array.from(document.querySelectorAll('.js-callout'));
    callouts.forEach(callout => {
        const buttons = Array.from(callout.querySelectorAll('.js-callout-expand'));
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
                const elements = form.getElementsByTagName('input');
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
                const errorPlaceholder = form.querySelector('.js-error-message');
                if (errorPlaceholder) {
                    errorPlaceholder.textContent = "There was a problem with the file you uploaded above. We accept images and pdfs up to 6MB"
                }
            }
        })
    })
}

function hasSeenCards(): void {
    const articleIds = Array.from(document.querySelectorAll('.js-card'))
        .map(card => card.getAttribute('data-article-id') ?? '');

    void userClient.filterSeenArticles(articleIds).then(seenArticles => {
        seenArticles.forEach(id => {
            document.querySelector(`.js-card[data-article-id='${id}']`)?.classList.add('fade');
        });
    })
}

function initAudioAtoms(): void {
    Array.from(document.querySelectorAll('.js-audio-atom'))
        .forEach(atom => {
            const id = atom.getAttribute('id');
            const trackUrl = atom.getAttribute('trackurl');
            const kicker = atom.getAttribute('kicker');
            const title = atom.getAttribute('title');
            const pillar = parseInt(atom.getAttribute('pillar') ?? '0');
            if (id && trackUrl && kicker && title && pillar) {
                ReactDOM.hydrate(h(AudioAtom, { id, trackUrl, pillar, kicker, title }), atom);
            }
        })
}

function hydrateQuizAtoms(): void {
    Array.from(document.querySelectorAll('.js-quiz'))
        .forEach(atom => {
            const props = atom.querySelector('.js-quiz-params')?.innerHTML;
            try {
                if (props) {
                    const quizProps: unknown = JSON.parse(props.replace(/&quot;/g, '"'));
                    ReactDOM.hydrate(h(QuizAtom, quizProps as QuizAtomType), atom);
                }
            } catch(e) {
                console.error(e);
            }
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
hasSeenCards();
initAudioAtoms();
hydrateQuizAtoms();
footerInit();
