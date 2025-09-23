import { css } from '@emotion/react';
import { breakpoints, palette, until } from '@guardian/source/foundations';
import type { Size } from '@guardian/source/react-components';
import {
	Button,
	LinkButton,
	SvgCheckmark,
	SvgShareWeb,
} from '@guardian/source/react-components';
import { useEffect, useMemo, useState } from 'react';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { transparentColour } from '../lib/transparentColour';
import { useMatchMedia } from '../lib/useMatchMedia';
import { palette as themePalette } from '../palette';

type Props = {
	size?: Size;
	pageId: string;
	/**
	 * Optional hash fragment (without the leading '#'). Example: 'block-abc123' | 'img-5'.
	 * If provided it will be appended as a URL fragment (#hash)
	 */
	hash?: string;
	/**
	 * Optional extra query parameters to append to the share URL. Values are stringified.
	 * Example for live blogs: { page: `with:block-${blockId}` }
	 */
	queryParams?: URLSearchParams;
	webTitle: string;
	format: ArticleFormat;
	context: Context;
};

type ButtonKind = 'native' | 'copy' | 'email';

type Context = 'ArticleMeta' | 'LiveBlock' | 'SubMeta' | 'ImageCaption';

const sharedButtonStyles = (sizeXSmall: boolean) => css`
	transition: none;
	border-color: ${sizeXSmall
		? themePalette('--share-button-xsmall-border')
		: themePalette('--share-button-border')};
	height: ${sizeXSmall ? '24px' : '36px'};
`;

const copiedButtonStyles = (sizeXSmall: boolean) => css`
	color: ${themePalette('--share-button-copied')};
	width: ${sizeXSmall ? '101px' : '132px'};
	padding: ${sizeXSmall ? '0 4px' : '0 10px'};
	:hover {
		background-color: inherit;
	}
	svg {
		fill: ${palette.success[400]};
	}
`;

const buttonStyles = (sizeXSmall: boolean) => css`
	color: ${themePalette('--share-button')};
	width: ${sizeXSmall ? '79px' : '105px'};
	padding: ${sizeXSmall && '0 10px'};
	svg {
		fill: ${themePalette('--share-button')};
		transition: inherit;
	}
	:hover {
		background-color: ${themePalette('--share-button')};
		border-color: ${themePalette('--share-button')};
		color: ${themePalette('--share-button-hover')};
		svg {
			fill: ${themePalette('--share-button-hover')};
		}
	}
`;

const hoverStyles = css`
	:hover {
		color: ${themePalette('--share-button-liveblog-mobile-meta')};
		background-color: ${palette.neutral[100]};
		border-color: ${palette.neutral[100]};
		svg {
			fill: ${themePalette('--share-button-liveblog-mobile-meta')};
		}
	}
`;

const liveBlogMobileMeta = (isCopied: boolean) => css`
	${until.desktop} {
		color: ${palette.neutral[100]};
		border-color: ${transparentColour(palette.neutral[100], 0.4)};
		svg {
			fill: ${isCopied ? palette.success[500] : palette.neutral[100]};
		}
		${!isCopied && hoverStyles}
	}
`;

const getUrl = ({
	pageId,
	hash,
	queryParams = new URLSearchParams(),
}: {
	pageId: string;
	hash?: string;
	queryParams?: URLSearchParams;
}) => {
	const searchParams = new URLSearchParams({});
	searchParams.append('CMP', 'share_btn_url');
	for (const [key, value] of Object.entries(queryParams)) {
		searchParams.append(key, String(value));
	}

	const fragment = hash ? `#${hash.replace(/^#/, '')}` : '';
	const paramsString = searchParams.toString();
	return new URL(
		`${pageId}${paramsString ? '?' + paramsString : ''}${fragment}`,
		'https://www.theguardian.com/',
	).href;
};

export const CopyNativeShareButton = ({
	onShare,
	size,
	isLiveBlogMeta,
	isCopied,
}: {
	onShare: () => void;
	size?: Size;
	isLiveBlogMeta: boolean;
	isCopied: boolean;
}) => {
	const sizeXSmall = size === 'xsmall';
	return (
		<Button
			onClick={onShare}
			size={size}
			type="button"
			priority="tertiary"
			iconSide="left"
			icon={isCopied ? <SvgCheckmark /> : <SvgShareWeb />}
			cssOverrides={css([
				...(isCopied
					? [copiedButtonStyles(sizeXSmall)]
					: [buttonStyles(sizeXSmall)]),
				sharedButtonStyles(sizeXSmall),
				isLiveBlogMeta && liveBlogMobileMeta(isCopied),
			])}
			data-gu-name="share-button"
		>
			{isCopied ? 'Link copied' : 'Share'}
		</Button>
	);
};

export const EmailLink = ({
	href,
	size,
	isLiveBlogMeta,
}: {
	href: string;
	size?: Size;
	isLiveBlogMeta: boolean;
}) => {
	const sizeXSmall = size === 'xsmall';
	return (
		<LinkButton
			href={href}
			size={size}
			type="button"
			priority="tertiary"
			iconSide="left"
			icon={<SvgShareWeb />}
			cssOverrides={css([
				buttonStyles(sizeXSmall),
				sharedButtonStyles(sizeXSmall),
				isLiveBlogMeta && liveBlogMobileMeta(false),
			])}
		>
			Share
		</LinkButton>
	);
};

/**
 * A button or link for sharing articles:
 * - if `canShare` is supported, triggers native share
 * - otherwise if `clipboard` is supported, a copy button
 * - otherwise a `mailto:` link
 *
 * ## Why does this need to be an Island?
 *
 * We need JS to identify if the browser supports specific
 * features, and trigger share or clipboard copy.
 *
 * ---
 *
 * [`ShareButton` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-sharebutton&buildNumber=6976&k=65d716aedbc77e22153b20a9-1200px-interactive-true&h=13&b=-2)
 */
export const ShareButton = ({
	size = 'small',
	pageId,
	hash,
	queryParams,
	webTitle,
	format,
	context,
}: Props) => {
	const [isCopied, setIsCopied] = useState(false);
	const [buttonKind, setButtonKind] = useState<ButtonKind>('email');

	const isLiveBlogMeta =
		format.design === ArticleDesign.LiveBlog && context === 'ArticleMeta';

	const isDesktop = useMatchMedia(`(min-width: ${breakpoints.desktop}px)`);

	const isLiveBlogBlockDesktop = isDesktop && context === 'LiveBlock';

	const shareData = useMemo(
		() => ({
			title: webTitle,
			text: webTitle,
			url: getUrl({
				pageId,
				hash,
				queryParams,
			}),
		}),
		[webTitle, pageId, hash, queryParams],
	);

	useEffect(() => {
		if (
			!isLiveBlogBlockDesktop &&
			'share' in navigator &&
			'canShare' in navigator &&
			navigator.canShare(shareData)
		) {
			setButtonKind('native');
		} else if ('clipboard' in navigator) {
			setButtonKind('copy');
		} else {
			setButtonKind('email');
		}
	}, [shareData, isLiveBlogBlockDesktop]);

	useEffect(() => {
		if (!isCopied) return;
		const timer = setTimeout(() => {
			setIsCopied(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [isCopied]);

	switch (buttonKind) {
		case 'native':
			return (
				<CopyNativeShareButton
					onShare={() => {
						navigator.share(shareData).catch(console.error);
					}}
					size={size}
					isLiveBlogMeta={isLiveBlogMeta}
					isCopied={isCopied}
				/>
			);
		case 'copy':
			return (
				<CopyNativeShareButton
					onShare={() => {
						navigator.clipboard
							.writeText(shareData.url)
							.then(() => {
								setIsCopied(true);
							})
							.catch(console.error);
					}}
					size={size}
					isLiveBlogMeta={isLiveBlogMeta}
					isCopied={isCopied}
				/>
			);
		case 'email':
			return (
				<EmailLink
					href={`mailto:?subject=${webTitle}&body=${shareData.url}`}
					size={size}
					isLiveBlogMeta={isLiveBlogMeta}
				/>
			);
	}
};
