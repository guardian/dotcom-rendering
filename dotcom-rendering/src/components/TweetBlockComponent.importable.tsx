import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { body, border } from '@guardian/source-foundations';
import { useEffect } from 'react';
import { unescapeData } from '../lib/escapeData';
import type { TweetBlockElement } from '../types/content';

type Props = {
	element: TweetBlockElement;
};

// fallback styling for when JS is disabled
const noJSStyling = css`
	.nojs-tweet:not(.nojs-tweet-rendered) {
		border: 1px solid ${border.secondary};
		border-radius: 4px;
		padding: 20px;
		width: 100%;
		margin-bottom: 16px;
		${body.small()};
	}

	.nojs-tweet iframe {
		/* Unfortunately due to how Twitter embeds work setting !important is the only way to overwrite tweet CSS */
		/* stylelint-disable-next-line declaration-no-important */
		width: 100% !important;
	}

	.nojs-tweet p {
		padding-bottom: 10px;
	}

	a {
		/* stylelint-disable-next-line color-no-hex */
		color: #2b7bb9;
	}
`;

/**
 * loadTweet takes the nojs default version of a Twitter tweet embed
 * and enhances it using Twitter's platform api script
 *
 * This code should only execute if switches.enhanceTweets is true (see
 * renderElements)
 *
 * @param element TweetBlockElement - The tweet element we want to enhance
 */
const loadTweet = (element: TweetBlockElement) => {
	const tweetContainer = document.getElementById(
		`tweet-container-${element.elementId}`,
	);
	if (!tweetContainer) return;
	const tweet = document.querySelector(
		`#tweet-container-${element.elementId} > blockquote.nojs-tweet`,
	);
	if (!tweet) return;
	if (isUndefined(twttr)) return;

	// We need this classname to exist as this is what Twitter uses
	// to find the tweet on the page. We *remove* this class in
	// enhanceTweets()
	tweet.classList.add('twitter-tweet');
	twttr.ready((twitter) => {
		twitter.widgets.load(tweetContainer);
	});
};

export const TweetBlockComponent = ({ element }: Props) => {
	useEffect(() => {
		// This code only runs if this component is hydrated, which
		// only happens if the enhanceTweets switch is on
		loadTweet(element);
	}, [element]);

	return (
		<div
			id={`tweet-container-${element.elementId}`}
			css={noJSStyling}
			dangerouslySetInnerHTML={{ __html: unescapeData(element.html) }}
		/>
	);
};
