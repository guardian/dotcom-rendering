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
import { ads, slideshow } from 'client/nativeCommunication';

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

setup();
ads();
topics();
slideshow();
formatDates();
insertEpic();
