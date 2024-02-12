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

const sharedButtonStyles = (sizeXSmall: boolean) => css`
	border-color: ${themePalette('--share-button-border')};
	min-width: ${sizeXSmall ? '101px' : '132px'};
	max-width: ${sizeXSmall ? '101px' : '132px'};
	font-size: ${sizeXSmall ? '14px' : '17px'};
	svg {
		width: ${sizeXSmall ? '13.33px' : '16.67px'};
		height: ${sizeXSmall ? '13.33px' : '16.67px'};
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
		color: ${themePalette('--share-button-hover')};
		svg {
			fill: ${themePalette('--share-button-hover')};
		}
	}
`;

const copiedButtonStyles = css`
	color: ${themePalette('--share-button-copied')};
	svg {
		fill: ${palette.success[400]};
	}
`;

const nativeShare = (sizeXSmall: boolean) => css`
	min-width: ${sizeXSmall ? '79px' : '105px'};
	max-width: ${sizeXSmall ? '79px' : '105px'};
	svg {
		margin-right: 6px;
		width: 18.33px;
		height: 18.33px;
	}
	border-color: ${themePalette('--share-button-border')};
`;

const liveBlogMobile = css`
	${until.desktop} {
		color: ${palette.neutral[100]};
		border-color: rgba(
			255,
			255,
			255,
			0.4
		); // combination of neutral[100] and opacity 40%
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
	isLiveBlogMeta,
}: {
	onShare: () => Promise<void>;
	size?: Size | undefined;
	isLiveBlogMeta: boolean;
}) => {
	const sizeXSmall = size === 'xsmall';

	return (
		<Button
			onClick={() => onShare().catch(() => {})}
			size={size}
			type="button"
			priority="tertiary"
			iconSide="left"
			icon={<SvgShare />}
			css={[
				buttonStyles,
				nativeShare(sizeXSmall),
				isLiveBlogMeta && liveBlogMobile,
			]}
		>
			Share
		</Button>
	);
};

export const CopyLinkButton = ({
	onShare,
	size,
	isLiveBlogMeta,
	isCopied,
}: {
	onShare: () => Promise<void>;
	size?: Size | undefined;
	isLiveBlogMeta: boolean;
	isCopied: boolean;
}) => {
	const sizeXSmall = size === 'xsmall';
	return (
		<Button
			onClick={() => onShare().catch(() => {})}
			size={size}
			type="button"
			priority="tertiary"
			iconSide="left"
			icon={isCopied ? <SvgCheckmark /> : <LinkIcon />}
			css={
				isCopied
					? [copiedButtonStyles, sharedButtonStyles(sizeXSmall)]
					: [
							buttonStyles,
							sharedButtonStyles(sizeXSmall),
							isLiveBlogMeta && liveBlogMobile,
					  ]
			}
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
}: Props) => {
	const [isCopied, setIsCopied] = useState(false);
	const [isShareSupported, setIsShareSupported] = useState(false);

	const isLiveBlogMeta = format.design === 11 && size !== 'xsmall';

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
			isLiveBlogMeta={isLiveBlogMeta}
		/>
	) : (
		<CopyLinkButton
			onShare={onShare}
			size={size}
			isCopied={isCopied}
			isLiveBlogMeta={isLiveBlogMeta}
		/>
	);
};
