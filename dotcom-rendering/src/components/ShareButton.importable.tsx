import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { palette, until } from '@guardian/source-foundations';
import type { Size } from '@guardian/source-react-components';
import {
	Button,
	SvgCheckmark,
	SvgShare,
} from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import { palette as themePalette } from '../palette';
import LinkIcon from '../static/icons/link-icon.svg';

type Props = {
	size?: Size;
	pageId: string;
	blockId?: string;
	webTitle: string;
	format: ArticleFormat;
	context: Context;
};

type Context = 'ArticleMeta' | 'LiveBlock' | 'SubMeta';

const sharedButtonStyles = (sizeXSmall: boolean) => css`
	border-color: ${themePalette('--share-button-border')};
	min-width: ${sizeXSmall ? '101px' : '132px'};
	max-width: ${sizeXSmall ? '101px' : '132px'};
	height: ${sizeXSmall ? '24px' : '36px'};
`;

const buttonStyles = css`
	color: ${themePalette('--share-button')};
	svg {
		fill: ${themePalette('--share-button')};
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

const copiedButtonStyles = (sizeXSmall: boolean) => css`
	color: ${themePalette('--share-button-copied')};
	padding: ${sizeXSmall ? '0 4px;' : '0 10px;'} svg {
		fill: ${palette.success[400]};
	}
`;

const nativeShare = (sizeXSmall: boolean) => css`
	min-width: ${sizeXSmall ? '79px' : '105px'};
	max-width: ${sizeXSmall ? '79px' : '105px'};
	border-color: ${themePalette('--share-button-border')};
`;

const liveBlogMobile = (isCopied: boolean) => css`
	${until.desktop} {
		color: ${palette.neutral[100]};
		border-color: rgba(255, 255, 255, 0.4);
		svg {
			fill: ${isCopied ? palette.success[500] : palette.neutral[100]};
		}
		${!isCopied &&
		`:hover {
			color: ${themePalette('--share-button-liveblog-mobile')};
			background-color: ${palette.neutral[100]};
			svg {
				fill: ${themePalette('--share-button-liveblog-mobile')};
			}
		}`}
	}
`;

const getUrl = ({
	pageId,
	CMP,
	blockId,
}: {
	pageId: string;
	CMP?: string;
	blockId?: string;
}) => {
	const searchParams = new URLSearchParams({});
	if (CMP) searchParams.append('CMP', CMP); // Do we want to track this?
	if (blockId) searchParams.append('page', `with:block-${blockId}`);

	const blockHash = blockId ? `#block-${blockId}` : '';
	const paramsString = searchParams.toString();
	return new URL(
		`${pageId}${paramsString ? '?' + paramsString : ''}${blockHash}`,
		'https://www.theguardian.com/',
	).href;
};

export const NativeShareButton = ({
	onShare,
	size,
	isLiveBlogArticleMeta,
}: {
	onShare: () => void;
	size?: Size;
	isLiveBlogArticleMeta: boolean;
}) => {
	const sizeXSmall = size === 'xsmall';

	return (
		<Button
			onClick={onShare}
			size={size}
			type="button"
			priority="tertiary"
			iconSide="left"
			icon={<SvgShare />}
			css={[
				buttonStyles,
				nativeShare(sizeXSmall),
				isLiveBlogArticleMeta && liveBlogMobile(false),
			]}
		>
			Share
		</Button>
	);
};

export const CopyLinkButton = ({
	onShare,
	size,
	isLiveBlogArticleMeta,
	isCopied,
}: {
	onShare: () => void;
	size?: Size;
	isLiveBlogArticleMeta: boolean;
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
			icon={isCopied ? <SvgCheckmark /> : <LinkIcon />}
			css={[
				...(isCopied
					? [copiedButtonStyles(sizeXSmall)]
					: [buttonStyles]),
				sharedButtonStyles(sizeXSmall),
				isLiveBlogArticleMeta && liveBlogMobile(isCopied),
			]}
		>
			{isCopied ? 'Link copied' : 'Copy link'}
		</Button>
	);
};

export const ShareButton = ({
	size = 'small',
	pageId,
	blockId,
	webTitle,
	format,
	context,
}: Props) => {
	const [isCopied, setIsCopied] = useState(false);

	const isLiveBlogArticleMeta =
		format.design === ArticleDesign.LiveBlog && context === 'ArticleMeta';

	const shareData = {
		title: webTitle,
		text: webTitle,
		url: getUrl({
			pageId,
			blockId,
		}),
	};

	useEffect(() => {
		if (!isCopied) return;
		const timer = setTimeout(() => {
			setIsCopied(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [isCopied]);

	return typeof window === 'undefined' || typeof navigator === 'undefined' ? (
		<></>
	) : 'share' in navigator && navigator.canShare(shareData) ? (
		<NativeShareButton
			onShare={() => {
				navigator.share(shareData).catch(console.error);
			}}
			size={size}
			isLiveBlogArticleMeta={isLiveBlogArticleMeta}
		/>
	) : 'clipboard' in navigator ? (
		<CopyLinkButton
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
			isCopied={isCopied}
			isLiveBlogArticleMeta={isLiveBlogArticleMeta}
		/>
	) : (
		<></>
	);
};
