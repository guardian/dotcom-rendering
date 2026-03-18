import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSansBold24,
	textSansBold28,
} from '@guardian/source/foundations';
import { LinkButton, SvgExternal } from '@guardian/source/react-components';
import { transparentColour } from '../lib/transparentColour';

type CallToActionProps = {
	linkUrl: string;
	backgroundImage?: string;
	text?: string;
	buttonText?: string;
	accentColour?: string;
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
		justify-content: start;
		align-items: flex-end;
		padding: ${space[5]}px;
	}

	${from.desktop} {
		padding: ${space[6]}px;
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
		margin-right: ${space[5]}px;
	}

	${from.desktop} {
		width: auto;
	}
`;

export const CallToActionAtom = ({
	linkUrl,
	backgroundImage,
	text,
	buttonText,
	accentColour,
}: CallToActionProps) => {
	return (
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
				<LinkButton
					href={linkUrl}
					iconSide="right"
					size="small"
					icon={<SvgExternal />}
					theme={{
						// We also still need to implement the dark mode based on the provided designs which should be the same as not providing an accent colour.
						textPrimary: accentColour
							? sourcePalette.neutral[100]
							: sourcePalette.neutral[0],
						backgroundPrimary:
							accentColour ?? sourcePalette.neutral[100],
						backgroundPrimaryHover: transparentColour(
							accentColour ?? sourcePalette.neutral[100],
							0.8,
						),
					}}
				>
					{buttonText}
				</LinkButton>
			</div>
		</picture>
	);
};
