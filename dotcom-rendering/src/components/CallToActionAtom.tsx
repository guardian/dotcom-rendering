import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSansBold24,
	textSansBold28,
} from '@guardian/source/foundations';
import { Button, SvgExternal } from '@guardian/source/react-components';
import { transparentColour } from '../lib/transparentColour';

type CallToActionProps = {
	linkUrl: string;
	backgroundImage?: string;
	text?: string;
	buttonText?: string;
};

const overlayMaskGradientStyles = (angle: string, startPosition: number) => {
	const positions = [0, 8, 16, 24, 32, 40, 48, 56, 64].map(
		(offset) => startPosition + offset,
	);
	return css`
		mask-image: linear-gradient(
			${angle},
			transparent ${positions[0]}px,
			rgba(0, 0, 0, 0.0381) ${positions[1]}px,
			rgba(0, 0, 0, 0.1464) ${positions[2]}px,
			rgba(0, 0, 0, 0.3087) ${positions[3]}px,
			rgba(0, 0, 0, 0.5) ${positions[4]}px,
			rgba(0, 0, 0, 0.6913) ${positions[5]}px,
			rgba(0, 0, 0, 0.8536) ${positions[6]}px,
			rgba(0, 0, 0, 0.9619) ${positions[7]}px,
			rgb(0, 0, 0) ${positions[8]}px
		);
	`;
};

const blurStyles = css`
	position: absolute;
	inset: 0;
	backdrop-filter: blur(12px) brightness(0.5);
	@supports not (backdrop-filter: blur(12px)) {
		background-color: ${transparentColour(sourcePalette.neutral[10], 0.7)};
	}
	${overlayMaskGradientStyles('180deg', 0)};

	${from.mobileLandscape} {
		${overlayMaskGradientStyles('180deg', 20)};
	}

	${from.tablet} {
		${overlayMaskGradientStyles('180deg', 80)};
	}

	${from.desktop} {
		${overlayMaskGradientStyles('180deg', 100)};
	}

	${from.leftCol} {
		${overlayMaskGradientStyles('180deg', 210)};
	}
`;

const buttonWrapperStyles = css`
	${blurStyles}
	display: flex;
	position: absolute;
	flex-direction: column;
	justify-content: end;
	align-items: center;
	padding: 0 ${space[2]}px ${space[6]}px;
	bottom: 0;
	left: 0;
	right: 0;

	button {
		width: 100%;

		${from.tablet} {
			width: auto;
		}
	}

	${from.tablet} {
		flex-direction: row;
		align-items: flex-end;
		padding: ${space[8]}px ${space[9]}px;
	}

	${from.desktop} {
		justify-content: start;
		padding: ${space[8]}px ${space[5]}px;
	}
`;

const textStyles = css`
	${textSansBold24}
	width: 100%;
	margin-bottom: ${space[5]}px;
	color: ${sourcePalette.neutral[100]};

	${from.tablet} {
		${textSansBold28}
		margin: 0;
		padding-right: ${space[5]}px;
	}

	${from.desktop} {
		width: auto;
		max-width: 621px;
	}
`;

export const CallToActionAtom = ({
	linkUrl,
	backgroundImage,
	text,
	buttonText,
}: CallToActionProps) => {
	return (
		<a
			href={linkUrl}
			css={css`
				text-decoration: none;
			`}
		>
			<picture
				css={css`
					position: relative;
					display: flex;
				`}
			>
				<img
					src={backgroundImage}
					alt={''}
					css={css`
						height: 200px;
						object-fit: cover;
						flex-grow: 1;

						${from.tablet} {
							height: 250px;
						}
						${from.leftCol} {
							height: 375px;
						}
					`}
				/>
				<div css={buttonWrapperStyles}>
					{!!text && <h2 css={textStyles}>{text}</h2>}
					<Button
						iconSide="right"
						size="small"
						icon={<SvgExternal />}
						theme={{
							textPrimary: sourcePalette.neutral[7],
							backgroundPrimary: sourcePalette.neutral[100],
							backgroundPrimaryHover: sourcePalette.neutral[86],
						}}
					>
						{buttonText}
					</Button>
				</div>
			</picture>
		</a>
	);
};
