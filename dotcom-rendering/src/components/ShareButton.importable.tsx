import { css } from '@emotion/react';
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
	size?: Size | undefined;
	pageId: string;
	blockId?: string;
	webTitle: string;
	format: ArticleFormat;
};

const sharedButtonStyles = (blockId: string | undefined) => css`
	border-color: ${palette.neutral[86]};
	min-width: ${blockId ? '101px' : '132px'};
	max-width: ${blockId ? '101px' : '132px'};
	font-size: ${blockId ? '14px' : '17px'};
	svg {
		width: ${blockId ? '13.33px' : '16.67px'};
		height: ${blockId ? '13.33px' : '16.67px'};
	}
`;

const buttonStyles = css`
	color: ${themePalette('--share-button')};
	svg {
		fill: ${themePalette('--share-button')};
		margin-left: 0;
	}
	:hover {
		background-color: ${themePalette('--share-button')};
		border-color: ${themePalette('--share-button')};
		color: ${palette.neutral[100]};
		svg {
			fill: ${palette.neutral[100]};
		}
	}
`;

const copiedButtonStyles = css`
	color: ${palette.neutral[7]};
	svg {
		fill: ${palette.success[400]};
		margin-right: 2px;
	}
`;

const nativeShare = (blockId: string | undefined) => css`
	min-width: ${blockId ? '79px' : '132px'};
	max-width: ${blockId ? '79px' : '132px'};
	${buttonStyles}
	border-color: ${palette.neutral[86]};
	max-width: 105px;
	svg {
		margin-right: 6px;
		width: 18.33px;
		height: 18.33px;
	}
`;

const liveBlogNative = (blockId: string | undefined) => css`
	${nativeShare(blockId)}
	${until.desktop} {
		border-color: rgba(
			255,
			255,
			255,
			0.4
		); // combination of neutral[100] and opacity 40%
		color: ${palette.neutral[100]};
		svg {
			fill: ${palette.neutral[100]};
			margin-left: 0;
		}
		:hover {
			color: ${themePalette('--share-button-liveblog-mobile')};
			background-color: ${palette.neutral[100]};
			svg {
				fill: ${themePalette('--share-button-liveblog-mobile')};
			}
		}
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
	isLiveBlog,
	blockId,
}: {
	onShare: () => Promise<void>;
	size?: Size | undefined;
	isLiveBlog: boolean;
	blockId?: string;
}) => (
	<Button
		onClick={() => onShare().catch(() => {})}
		size={size}
		type="button"
		priority="tertiary"
		iconSide="left"
		icon={<SvgShare />}
		cssOverrides={
			isLiveBlog ? liveBlogNative(blockId) : nativeShare(blockId)
		}
	>
		Share
	</Button>
);

export const CopyLinkButton = ({
	onShare,
	size,
	isCopied,
	blockId,
}: {
	onShare: () => Promise<void>;
	size?: Size | undefined;
	isCopied: boolean;
	blockId?: string;
}) => (
	<Button
		onClick={() => onShare().catch(() => {})}
		size={size}
		type="button"
		priority="tertiary"
		iconSide="left"
		icon={isCopied ? <SvgCheckmark /> : <LinkIcon />}
		cssOverrides={
			isCopied
				? [copiedButtonStyles, sharedButtonStyles(blockId)]
				: [buttonStyles, sharedButtonStyles(blockId)]
		}
	>
		{isCopied ? 'Link copied' : 'Copy link'}
	</Button>
);

export const ShareButton = ({
	size = 'small',
	pageId,
	blockId,
	webTitle,
	format,
}: Props) => {
	const [isCopied, setIsCopied] = useState(false);
	const [isShareSupported, setIsShareSupported] = useState(false);

	const isLiveBlog = format.design === 11;

	useEffect(() => {
		setIsShareSupported(
			typeof navigator !== 'undefined' && 'share' in navigator,
		);
	}, []);

	const onShare = async () => {
		if (isShareSupported) {
			await navigator.share({
				title: `${webTitle}`,
				text: `${webTitle}: ${getUrl({
					pageId,
					blockId,
				})}`,
			});
		} else if ('clipboard' in navigator) {
			await navigator.clipboard.writeText(
				getUrl({
					pageId,
					blockId,
				}),
			);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 3000);
		}
	};

	return isShareSupported ? (
		<NativeShareButton
			onShare={onShare}
			size={size}
			isLiveBlog={isLiveBlog}
			blockId={blockId}
		/>
	) : (
		<CopyLinkButton
			onShare={onShare}
			size={size}
			isCopied={isCopied}
			blockId={blockId}
		/>
	);
};
