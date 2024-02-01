import { css } from '@emotion/react';
import { palette } from '@guardian/source-foundations';
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
};

const sharedButtonStyles = css`
	border-color: ${palette.neutral[86]};
	min-width: 132px;
	max-width: 132px;
	svg {
		width: 18.33px;
		height: 18.33px;
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
	font-size: 16px;
	svg {
		fill: ${palette.success[400]};
		margin-right: 2px;
	}
`;

const nativeShare = css`
	${buttonStyles}
	border-color: ${palette.neutral[86]};
	max-width: 105px;
	svg {
		margin-left: 0;
		width: 18.33px;
		height: 18.33px;
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

export const ShareButton = ({
	size = 'small',
	pageId,
	blockId,
	webTitle,
}: Props) => {
	const [isCopied, setIsCopied] = useState(false);
	const [isShareSupported, setIsShareSupported] = useState(false);

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

	return (
		<>
			{isShareSupported ? (
				<Button
					onClick={() => onShare().catch(() => {})}
					size={size}
					type="button"
					priority="tertiary"
					iconSide="left"
					icon={<SvgShare />}
					css={nativeShare}
				>
					Share
				</Button>
			) : (
				<Button
					onClick={() => onShare().catch(() => {})}
					size={size}
					type="button"
					priority="tertiary"
					iconSide="left"
					icon={isCopied ? <SvgCheckmark /> : <LinkIcon />}
					css={
						isCopied
							? [copiedButtonStyles, sharedButtonStyles]
							: [buttonStyles, sharedButtonStyles]
					}
				>
					{isCopied ? 'Link copied' : 'Copy link'}
				</Button>
			)}
		</>
	);
};
