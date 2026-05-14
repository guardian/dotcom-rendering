import { css } from '@emotion/react';
import {
	calculateHoverColour,
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
	accentColor?: string;
};

const blurStyles = css`
	position: absolute;
	inset: 0;
	backdrop-filter: blur(12px) brightness(0.5);
	@supports not (backdrop-filter: blur(12px)) {
		background-color: linear-gradient(
			${transparentColour(sourcePalette.neutral[10], 0.7)},
			0
		);
	}
	mask-image: linear-gradient(
		to top,
		${transparentColour(sourcePalette.neutral[10], 0.95)},
		${transparentColour(sourcePalette.neutral[10], 0.9)},
		${transparentColour(sourcePalette.neutral[10], 0.8)},
		${transparentColour(sourcePalette.neutral[10], 0.7)},
		transparent
	);
`;

const blurAndTextWrapperStyles = css`
	display: flex;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
`;

const textAndButtonWrapperStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: start;
	padding: 0 ${space[2]}px ${space[6]}px;
	z-index: 1;

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
		width: auto;
		margin: 0;
		margin-right: ${space[5]}px;
	}
`;

export const CallToActionAtom = ({
	linkUrl,
	backgroundImage,
	text,
	buttonText,
	accentColor,
}: CallToActionProps) => {
	const buttonBgColour = accentColor ?? sourcePalette.neutral[100];

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
			<div css={blurAndTextWrapperStyles}>
				<div css={textAndButtonWrapperStyles}>
					{!!text && <h2 css={textStyles}>{text}</h2>}
					<LinkButton
						href={linkUrl}
						iconSide="right"
						size="small"
						icon={<SvgExternal />}
						theme={{
							// We also still need to implement the dark mode based on the provided designs which should be the same as not providing an accent colour.
							textPrimary: accentColor
								? sourcePalette.neutral[100]
								: sourcePalette.neutral[0],
							backgroundPrimary: buttonBgColour,
							backgroundPrimaryHover:
								calculateHoverColour(buttonBgColour),
						}}
					>
						{buttonText ?? 'Learn more'}
					</LinkButton>
				</div>
				{/* blur overlay */}
				<div aria-hidden="true" css={blurStyles} />
			</div>
		</picture>
	);
};
