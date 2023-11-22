/**
 * @jest-environment jsdom
 */

/* eslint-disable react/no-deprecated -- currently still working in 17 mode */

import { matchers } from '@emotion/jest';
import { EmbedTracksType } from '@guardian/content-api-models/v1/embedTracksType';
import { none, some } from '@guardian/types';
import type {
	EmailSignup,
	Embed,
	Generic,
	Instagram,
	Spotify,
	YouTube,
} from 'embed';
import { EmbedKind } from 'embed';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Result } from 'result';
import type { SourceDetails } from './';
import EmbedComponentWrapper, {
	createEmbedComponentFromProps,
	EmbedComponentInClickToView,
} from './';

expect.extend(matchers);

let container: Element = document.createElement('div');
beforeEach(() => {
	// setup a DOM element as a render target
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = document.createElement('div');
});

describe('EmbedComponentWrapper.embedComponentFromWrapperProps', () => {
	const testCreateContentFromProps = (
		embed: Embed,
		editions: boolean,
		sourceDetails: SourceDetails,
	): void => {
		const embedComponentWrapper = (
			<EmbedComponentWrapper embed={embed} editions={editions} />
		);

		act(() => {
			render(embedComponentWrapper, container);
		});

		const expectedWrapperContents = (
			<EmbedComponentInClickToView
				embed={embed}
				editions={editions}
				sourceDetails={sourceDetails}
			/>
		);

		if (container.firstElementChild) {
			const embedComponentFromWrapperProps =
				createEmbedComponentFromProps(container.firstElementChild);
			expect(embedComponentFromWrapperProps).toStrictEqual(
				Result.ok(expectedWrapperContents),
			);
		} else {
			fail('EmbedComponentWrapper was not rendered');
		}
	};

	it('should recreate contents of wrapper from wrapper data props for generic embed', () => {
		const genericEmbed: Generic = {
			kind: EmbedKind.Generic,
			alt: some('some alt text'),
			html: '<iframe src="http://test.com" />',
			height: 300,
			mandatory: true,
			source: some('An Embed Provider'),
			sourceDomain: some('anembedprovider.com'),
			tracking: EmbedTracksType.TRACKS,
		};

		const sourceDetails = {
			source: genericEmbed.source,
			sourceDomain: genericEmbed.sourceDomain,
		};

		testCreateContentFromProps(genericEmbed, false, sourceDetails);
	});

	it('should recreate contents of wrapper from wrapper data props for email signup embed', () => {
		const emailSignupEmbed: EmailSignup = {
			kind: EmbedKind.EmailSignup,
			alt: some('some alt text'),
			caption: some('some caption text'),
			src: 'http://test.com',
			source: some('An Embed Provider'),
			sourceDomain: some('anembedprovider.com'),
			tracking: EmbedTracksType.TRACKS,
		};

		const sourceDetails = {
			source: emailSignupEmbed.source,
			sourceDomain: emailSignupEmbed.sourceDomain,
		};

		testCreateContentFromProps(emailSignupEmbed, false, sourceDetails);
	});

	it('should recreate contents of wrapper from wrapper data props for generic embed without optional parameters', () => {
		const genericEmbed: Generic = {
			kind: EmbedKind.Generic,
			alt: none,
			html: '<iframe src="http://test.com" />',
			height: 300,
			mandatory: true,
			source: none,
			sourceDomain: some('anembedprovider.com'),
			tracking: EmbedTracksType.TRACKS,
		};

		const sourceDetails = {
			source: genericEmbed.source,
			sourceDomain: genericEmbed.sourceDomain,
		};

		testCreateContentFromProps(genericEmbed, false, sourceDetails);
	});

	it('should recreate contents of wrapper from wrapper data props for spotify embed', () => {
		const spotifyEmbed: Spotify = {
			kind: EmbedKind.Spotify,
			src: 'https://spotify.com/someembed',
			width: 200,
			height: 300,
			tracking: EmbedTracksType.TRACKS,
		};

		const sourceDetails = {
			source: some('Spotify'),
			sourceDomain: some('www.spotify.com'),
		};

		testCreateContentFromProps(spotifyEmbed, false, sourceDetails);
	});

	it('should recreate contents of wrapper from wrapper data props for Youtube embed', () => {
		const youTubeEmbed: YouTube = {
			kind: EmbedKind.YouTube,
			id: 'videoid',
			height: 300,
			width: 200,
			tracking: EmbedTracksType.TRACKS,
		};

		const sourceDetails = {
			source: some('YouTube'),
			sourceDomain: some('www.youtube.com'),
		};

		testCreateContentFromProps(youTubeEmbed, false, sourceDetails);
	});

	it('should recreate contents of wrapper from wrapper data props for Instagram embed', () => {
		const instagramEmbed: Instagram = {
			kind: EmbedKind.Instagram,
			id: 'instagramid',
			caption: some('An Instagram Caption'),
			tracking: EmbedTracksType.TRACKS,
		};

		const sourceDetails = {
			source: some('Instagram'),
			sourceDomain: some('www.instagram.com'),
		};

		testCreateContentFromProps(instagramEmbed, false, sourceDetails);
	});

	it('should recreate contents of wrapper from wrapper data props with editions prop', () => {
		const instagramEmbed: Instagram = {
			kind: EmbedKind.Instagram,
			id: 'instagramid',
			caption: some('An Instagram Caption'),
			tracking: EmbedTracksType.TRACKS,
		};

		const sourceDetails = {
			source: some('Instagram'),
			sourceDomain: some('www.instagram.com'),
		};

		testCreateContentFromProps(instagramEmbed, true, sourceDetails);
	});
});
