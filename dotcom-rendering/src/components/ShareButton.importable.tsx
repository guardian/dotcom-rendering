import { css } from '@emotion/react';
import { palette } from '@guardian/source-foundations';
import type { Size } from '@guardian/source-react-components';
import { Button, SvgCheckmark } from '@guardian/source-react-components';
import { useState } from 'react';
import { palette as themePalette } from '../palette';
import LinkIcon from '../static/icons/link-icon.svg';

type Props = {
	size?: Size | undefined;
};

const buttonStyles = css`
	border-color: ${palette.neutral[86]};
	min-width: 132px;
	max-width: 132px;
	svg {
		width: 18.33px;
		height: 18.33px;
	}
`;

const buttonColor = css`
	${buttonStyles};
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

const copiedButtonColor = css`
	${buttonStyles};
	color: ${palette.neutral[7]};
	font-size: 16px;
	svg {
		fill: ${palette.success[400]};
		margin-right: 2px;
	}
`;

export const ShareButton = ({ size = 'small' }: Props) => {
	const [isCopied, setIsCopied] = useState(false);
	return (
		<>
			<Button
				onClick={() => {
					navigator.clipboard
						.writeText(window.location.href)
						.then(() => {
							setIsCopied(true);
							setTimeout(() => {
								setIsCopied(false);
							}, 3000); // Revert back after 3 seconds
						});
				}}
				size={size}
				type="button"
				priority="tertiary"
				iconSide="left"
				icon={isCopied ? <SvgCheckmark /> : <LinkIcon />}
				css={isCopied ? copiedButtonColor : buttonColor}
			>
				{isCopied ? 'Link copied' : 'Copy link'}
			</Button>
		</>
	);
};
