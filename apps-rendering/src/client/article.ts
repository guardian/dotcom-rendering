// ----- Imports ----- //

import type { Client as NotificationsClient } from '@guardian/bridget/Notifications';
import type { Client as TagClient } from '@guardian/bridget/Tag';
import { Topic } from '@guardian/bridget/Topic';
import {
	ads,
	getAdSlots,
	reportNativeElementPositionChanges,
	sendTargetingParams,
	slideshow,
	videos,
} from 'client/nativeCommunication';
import setup from 'client/setup';
import { createEmbedComponentFromProps } from 'components/EmbedWrapper';
import EpicContent from 'components/EpicContent';

import { compare } from 'compare-versions';
import {
	FollowNotificationStatus,
	FollowTagStatus,
} from 'components/FollowStatus';
import FooterContent from 'components/FooterContent';
import { handleErrors, isObject } from 'lib';
import {
	acquisitionsClient,
	commercialClient,
	environmentClient,
	navigationClient,
	notificationsClient,
	tagClient,
	userClient,
} from 'native/nativeApi';
import type { Optional } from 'optional';
import type { FC, ReactElement } from 'react';
import { createElement as h } from 'react';
import ReactDOM from 'react-dom';
import { logger } from '../logger';
import { getBridgetVersion } from './bridgetVersion';
import { callouts } from './callouts';
import './liveblog';
import { initSignupForms } from './newsletterSignupForm';

// ----- Run ----- //

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

function followToggle(
	topic: Topic,
	querySelector: string,
	followStatusComponent: FC<{
		isFollowing: boolean;
		contributorName: string;
	}>,
	bridgetClient: NotificationsClient<void> | TagClient<void>,
): void {
	const followStatus = document.querySelector(querySelector);
	if (!followStatus) return;
	void bridgetClient.isFollowing(topic).then((following) => {
		if (following) {
			void bridgetClient.unfollow(topic).then((_) => {
				ReactDOM.render(
					h(followStatusComponent, {
						isFollowing: false,
						contributorName: topic.displayName,
					}),
					followStatus,
				);
			});
		} else {
			void bridgetClient.follow(topic).then((_) => {
				ReactDOM.render(
					h(followStatusComponent, {
						isFollowing: true,
						contributorName: topic.displayName,
					}),
					followStatus,
				);
			});
		}
	});
}

function notificationsFollowClick(e: Event): void {
	const follow = document.querySelector('.js-follow-notifications');
	const topic = getTopic(follow);
	if (topic) {
		followToggle(
			topic,
			'.js-follow-notifications-status',
			FollowNotificationStatus,
			notificationsClient,
		);
	}
}

function tagFollowClick(e: Event): void {
	const follow = document.querySelector('.js-follow-tag');
	const topic = getTopic(follow);
	if (topic) {
		followToggle(
			topic,
			'.js-follow-tag-status',
			FollowTagStatus,
			tagClient,
		);
	}
}

function conditionallyRenderFollowTagComponent(
	topic: Topic,
	followTagStatus: Element | null,
	followTag: Element | null,
): void {
	const checkBridgetCompatibilty = (
		bridgetVersion: Optional<string>,
	): boolean =>
		bridgetVersion
			.map((versionString) => compare(versionString, '2.5.0', '>='))
			.withDefault(false);

	const isBridgetCompatible = getBridgetVersion().then((version) => {
		return checkBridgetCompatibilty(version);
	});

	const isMyGuardianEnabled = environmentClient.isMyGuardianEnabled();

	const tagIsFollowingState = tagClient.isFollowing(topic);

	void Promise.all([
		isBridgetCompatible,
		isMyGuardianEnabled,
		tagIsFollowingState,
	])
		.then(
			([
				isBridgetCompatible,
				isMyGuardianEnabled,
				tagIsFollowingState,
			]) => {
				isBridgetCompatible &&
					isMyGuardianEnabled &&
					followTagStatus &&
					ReactDOM.render(
						h(FollowTagStatus, {
							isFollowing: tagIsFollowingState,
							contributorName: topic.displayName,
						}),
						followTagStatus,
					);

				followTag?.addEventListener('click', tagFollowClick);
			},
		)
		.catch((error) => {
			logger.error(error);
		});
}

function topics(): void {
	const followNotifications = document.querySelector(
		'.js-follow-notifications',
	);
	const followNotificationsStatus = document.querySelector(
		'.js-follow-notifications-status',
	);
	const followTag = document.querySelector('.js-follow-tag');
	const followTagStatus = document.querySelector('.js-follow-tag-status');

	const topic = getTopic(followNotifications) ?? getTopic(followTag);

	if (topic) {
		followNotifications?.addEventListener(
			'click',
			notificationsFollowClick,
		);
		void notificationsClient.isFollowing(topic).then((following) => {
			if (following && followNotificationsStatus) {
				ReactDOM.render(
					h(FollowNotificationStatus, {
						isFollowing: true,
						contributorName: topic.displayName,
					}),
					followNotificationsStatus,
				);
			}
		});

		conditionallyRenderFollowTagComponent(
			topic,
			followTagStatus,
			followTag,
		);
	}
}

// TODO: show epics on opinion articles
function insertEpic(): void {
	const epicPlaceholder = document.getElementById('js-epic-placeholder');
	if (epicPlaceholder) {
		epicPlaceholder.innerHTML = '';
	}
	if (navigator.onLine && epicPlaceholder) {
		Promise.all([userClient.isPremium(), acquisitionsClient.getEpics()])
			.then(([isPremium, maybeEpic]) => {
				if (!isPremium && maybeEpic.epic) {
					const { title, body, firstButton, secondButton } =
						maybeEpic.epic;
					const epicProps = {
						title,
						body,
						firstButton,
						secondButton,
					};
					ReactDOM.render(h(EpicContent, epicProps), epicPlaceholder);
				}
			})
			.catch((error) => console.error(error));
	}
}

function footerLinks(): void {
	const privacySettingsLink = document.getElementById('js-privacy-settings');
	const privacyPolicyLink = document.getElementById('js-privacy-policy');

	privacyPolicyLink?.addEventListener('click', (e) => {
		e.preventDefault();
		void navigationClient.openPrivacyPolicy();
	});

	privacySettingsLink?.addEventListener('click', (e) => {
		e.preventDefault();
		void navigationClient.openPrivacySettings();
	});
}

function footerInit(): void {
	userClient
		.doesCcpaApply()
		.then((isCcpa) => {
			const comp = h(FooterContent, { isCcpa });
			ReactDOM.render(comp, document.getElementById('js-footer'));
			footerLinks();
		})
		.catch((error) => {
			logger.error(error);
		});
}

function hasSeenCards(): void {
	const articleIds = Array.from(document.querySelectorAll('.js-card'))
		.map((card) => card.getAttribute('data-article-id') ?? '')
		.filter((articleId) => articleId !== '');

	void userClient.filterSeenArticles(articleIds).then((seenArticles) => {
		seenArticles.forEach((id) => {
			document
				.querySelector(`.js-card[data-article-id='${id}']`)
				?.classList.add('fade');
		});
	});
}

function richLinks(): void {
	document
		.querySelectorAll('.js-rich-link[data-article-id]')
		.forEach((richLink) => {
			const articleId = richLink.getAttribute('data-article-id');
			if (articleId) {
				const options = {
					headers: {
						Accept: 'application/json',
					},
				};
				void fetch(`${articleId}?richlink`, options)
					.then(handleErrors)
					.then((resp) => resp.json())
					.then((response: unknown) => {
						if (isObject(response)) {
							const pillar =
								typeof response.pillar === 'string'
									? response.pillar.toLowerCase()
									: null;
							const image = response.image;

							if (pillar) {
								richLink.classList.add(`js-${pillar}`);
							}

							const placeholder =
								richLink.querySelector('.js-image');
							if (placeholder && typeof image === 'string') {
								const img = document.createElement('img');
								img.addEventListener('load', (_) => {
									const currentAdSlots = getAdSlots();
									void commercialClient.updateAdverts(
										currentAdSlots,
									);
								});
								img.setAttribute('alt', 'Related article');
								img.setAttribute('src', image);
								placeholder.appendChild(img);
							}
						}
					})
					.catch((error) => console.error(error));
			}
		});
}

function hydrateClickToView(): void {
	document
		.querySelectorAll('.js-click-to-view-container')
		.forEach((container) =>
			createEmbedComponentFromProps(container).either(
				(error: string) => {
					logger.error(
						`Failed to create Embed for hydration: ${error}`,
					);
				},
				(embedComponent: ReactElement) => {
					ReactDOM.hydrate(embedComponent, container);
				},
			),
		);
}

const isIframe = (elem: Element): elem is HTMLIFrameElement =>
	elem.tagName === 'IFRAME';

function resizeEmailSignups(): void {
	const emailSignupIframes = document.querySelectorAll('.js-email-signup');
	Array.from(emailSignupIframes)
		.filter(isIframe)
		.forEach((emailSignupIframe) => {
			emailSignupIframe.style.width = '100%';
		});
}

setup();
sendTargetingParams();
ads();
videos();
resizeEmailSignups();
topics();
slideshow();
footerInit();
insertEpic();
callouts();
hasSeenCards();
richLinks();
hydrateClickToView();
void initSignupForms();

/*
 We run this last to help precisely position native elements over their placeholders in the webview.
 For more detail see https://github.com/guardian/dotcom-rendering/pull/6047
 */
reportNativeElementPositionChanges();
