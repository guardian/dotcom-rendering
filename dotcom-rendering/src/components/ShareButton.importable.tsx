import { css } from '@emotion/react';
import { ArticleDesign, type ArticleFormat } from '@guardian/libs';
import { palette, until } from '@guardian/source/foundations';
import type { Size } from '@guardian/source/react-components';
import {
	Button,
	LinkButton,
	SvgCheckmark,
	SvgShare,
} from '@guardian/source/react-components';
import { useEffect, useMemo, useState } from 'react';
import { transparentColour } from '../lib/transparentColour';
import { palette as themePalette } from '../palette';

type Props = {
	size?: Size;
	pageId: string;
	blockId?: string;
	webTitle: string;
	format: ArticleFormat;
	context: Context;
};

type ButtonKind = 'native' | 'copy' | 'email';

type Context = 'ArticleMeta' | 'LiveBlock' | 'SubMeta';

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

const getUrl = ({ pageId, blockId }: { pageId: string; blockId?: string }) => {
	const searchParams = new URLSearchParams({});
	searchParams.append('CMP', 'share_btn_url');
	if (blockId) searchParams.append('page', `with:block-${blockId}`);

	const blockHash = blockId ? `#block-${blockId}` : '';
	const paramsString = searchParams.toString();
	return new URL(
		`${pageId}${paramsString ? '?' + paramsString : ''}${blockHash}`,
		'https://www.theguardian.com/',
	).href;
};

export const CopyNativeShareButton = ({
	onShare,
	size,
	isLiveBlogMeta: isLiveBlogMeta,
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
			icon={isCopied ? <SvgCheckmark /> : <SvgShare />}
			css={[
				...(isCopied
					? [copiedButtonStyles(sizeXSmall)]
					: [buttonStyles(sizeXSmall)]),
				sharedButtonStyles(sizeXSmall),
				isLiveBlogMeta && liveBlogMobileMeta(isCopied),
			]}
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
			icon={<SvgShare />}
			css={[
				buttonStyles(sizeXSmall),
				sharedButtonStyles(sizeXSmall),
				isLiveBlogMeta && liveBlogMobileMeta(false),
			]}
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
	blockId,
	webTitle,
	format,
	context,
}: Props) => {
	const [isCopied, setIsCopied] = useState(false);
	const [buttonKind, setButtonKind] = useState<ButtonKind>('email');

	const isLiveBlogMeta =
		format.design === ArticleDesign.LiveBlog && context === 'ArticleMeta';

	const shareData = useMemo(
		() => ({
			title: webTitle,
			text: webTitle,
			url: getUrl({
				pageId,
				blockId,
			}),
		}),
		[webTitle, pageId, blockId],
	);

	useEffect(() => {
		if ('share' in navigator && navigator.canShare(shareData)) {
			setButtonKind('native');
		} else if ('clipboard' in navigator) {
			setButtonKind('copy');
		} else {
			setButtonKind('email');
		}
	}, [shareData]);

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
							.writeText(
								getUrl({
									pageId,
									blockId,
								}),
							)
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
					href={`mailto:?subject=${webTitle}&body=${getUrl({
						pageId,
						blockId,
					})}`}
					size={size}
					isLiveBlogMeta={isLiveBlogMeta}
				/>
			);
	}
};
