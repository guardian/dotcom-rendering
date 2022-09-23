// ----- Imports ----- //

import './liveblog';

import 'regenerator-runtime/runtime.js';
import { AudioAtom } from '@guardian/atoms-rendering';
import type { ICommentResponse as CommentResponse } from '@guardian/bridget';
import { Topic } from '@guardian/bridget/Topic';
import { App } from '@guardian/discussion-rendering/build/App';
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
import FollowStatus from 'components/FollowStatus';
import FooterContent from 'components/FooterContent';
import { handleErrors, isObject } from 'lib';
import {
	acquisitionsClient,
	commercialClient,
	discussionClient,
	navigationClient,
	notificationsClient,
	userClient,
} from 'native/nativeApi';
import type { ReactElement } from 'react';
import { createElement as h } from 'react';
import ReactDOM from 'react-dom';
import { stringToPillar } from 'themeStyles';
import { logger } from '../logger';
import { hydrate as hydrateAtoms } from './atoms';

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

function followToggle(topic: Topic): void {
	const followStatus = document.querySelector('.js-follow-status');
	if (!followStatus) return;
	void notificationsClient.isFollowing(topic).then((following) => {
		if (following) {
			void notificationsClient.unfollow(topic).then((_) => {
				ReactDOM.render(
					h(FollowStatus, {
						isFollowing: false,
						contributorName: topic.displayName,
					}),
					followStatus,
				);
			});
		} else {
			void notificationsClient.follow(topic).then((_) => {
				ReactDOM.render(
					h(FollowStatus, {
						isFollowing: true,
						contributorName: topic.displayName,
					}),
					followStatus,
				);
			});
		}
	});
}

function topicClick(e: Event): void {
	const follow = document.querySelector('.js-follow');
	const topic = getTopic(follow);

	if (topic) {
		followToggle(topic);
	}
}

function topics(): void {
	const follow = document.querySelector('.js-follow');
	const topic = getTopic(follow);

	const followStatus = document.querySelector('.js-follow-status');

	if (topic) {
		follow?.addEventListener('click', topicClick);
		void notificationsClient.isFollowing(topic).then((following) => {
			if (following && followStatus) {
				ReactDOM.render(
					h(FollowStatus, {
						isFollowing: true,
						contributorName: topic.displayName,
					}),
					followStatus,
				);
			}
		});
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

declare type ArticlePillar =
	| 'news'
	| 'opinion'
	| 'sport'
	| 'culture'
	| 'lifestyle';

function isPillarString(pillar: string): boolean {
	return ['news', 'opinion', 'sport', 'culture', 'lifestyle'].includes(
		pillar.toLowerCase(),
	);
}
function renderComments(): void {
	const commentContainer = document.getElementById('comments');
	const pillarString = commentContainer?.getAttribute('data-pillar');
	const shortUrl = commentContainer?.getAttribute('data-short-id');
	const isClosedForComments = !!commentContainer?.getAttribute('pillar');

	if (pillarString && isPillarString(pillarString) && shortUrl) {
		const pillar = pillarString as ArticlePillar;
		const user = {
			userId: 'abc123',
			displayName: 'Jane Smith',
			webUrl: '',
			apiUrl: '',
			secureAvatarUrl: '',
			avatar: '',
			badge: [],
		};

		const additionalHeaders = {};

		const props = {
			shortUrl,
			baseUrl: 'https://discussion.theguardian.com/discussion-api',
			pillar: stringToPillar(pillar),
			user,
			isClosedForComments,
			additionalHeaders,
			expanded: false,
			apiKey: 'ios',
			onPermalinkClick: (commentId: number): void => {
				console.log(commentId);
			},
			onRecommend: (commentId: number): Promise<boolean> => {
				return discussionClient.recommend(commentId);
			},
			onComment: (
				shortUrl: string,
				body: string,
			): Promise<CommentResponse & { status: 'ok' | 'error' }> => {
				return discussionClient
					.comment(shortUrl, body)
					.then((response) => ({ ...response, status: 'ok' }));
			},
			onReply: (
				shortUrl: string,
				body: string,
				parentCommentId: number,
			): Promise<CommentResponse & { status: 'ok' | 'error' }> => {
				return discussionClient
					.reply(shortUrl, body, parentCommentId)
					.then((response) => ({ ...response, status: 'ok' }));
			},
			onPreview: (body: string): Promise<string> => {
				return discussionClient.preview(body);
			},
		};

		ReactDOM.render(h(App, props), commentContainer);
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

type FormData = Record<string, string>;

function submit(body: FormData, form: Element): void {
	fetch(
		'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
		{
			method: 'POST',
			body: JSON.stringify(body),
		},
	)
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
				errorPlaceholder.textContent =
					'Sorry, there was a problem submitting your form. Please try again later.';
			}
		});
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
		});

		reader.addEventListener('error', () => {
			reject();
		});

		reader.readAsDataURL(file);
	});
}

function callouts(): void {
	const callouts = Array.from(document.querySelectorAll('.js-callout'));
	callouts.forEach((callout) => {
		const buttons = Array.from(
			callout.querySelectorAll('.js-callout-expand'),
		);
		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				callout.toggleAttribute('open');
			});
		});

		const form = callout.querySelector('form');
		if (!form) return;
		form.addEventListener(
			'submit',
			// eslint-disable-next-line @typescript-eslint/no-misused-promises -- use async function
			async (e): Promise<void> => {
				try {
					e.preventDefault();
					const elements = form.getElementsByTagName('input');
					const data = Array.from(elements).reduce(
						async (o: Promise<FormData>, elem) => {
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
						},
						Promise.resolve({}),
					);

					submit(await data, form);
				} catch (e) {
					const errorPlaceholder =
						form.querySelector('.js-error-message');
					if (errorPlaceholder) {
						errorPlaceholder.textContent =
							'There was a problem with the file you uploaded above. We accept images and pdfs up to 6MB';
					}
				}
			},
		);
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

function initAudioAtoms(): void {
	Array.from(document.querySelectorAll('.js-audio-atom')).forEach((atom) => {
		const id = atom.getAttribute('id');
		const trackUrl = atom.getAttribute('trackurl');
		const kicker = atom.getAttribute('kicker');
		const title = atom.getAttribute('title');
		const pillar = parseInt(atom.getAttribute('pillar') ?? '0');
		// Work required to provide the audio atom duration server side.
		const duration = parseInt(atom.getAttribute('duration') ?? '0');
		if (id && trackUrl && kicker && title && pillar) {
			ReactDOM.hydrate(
				h(AudioAtom, { id, trackUrl, pillar, kicker, title, duration }),
				atom,
			);
		}
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
renderComments();
hasSeenCards();
initAudioAtoms();
hydrateAtoms();
richLinks();
hydrateClickToView();
reportNativeElementPositionChanges();
