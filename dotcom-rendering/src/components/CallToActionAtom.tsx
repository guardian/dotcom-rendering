import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	textSansBold20,
} from '@guardian/source/foundations';
import { Button, SvgExternal } from '@guardian/source/react-components';

type Props = {
	ctaLinkURL: string;
	ctaBackgroundImage: string;
	ctaText: string;
	ctaButtonText: string;
};

export const CallToActionAtom = ({
	ctaLinkURL,
	ctaBackgroundImage,
	ctaText,
	ctaButtonText,
}: Props) => {
	return (
		<a
			href={ctaLinkURL}
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
					src={ctaBackgroundImage}
					alt={
						'alt text'
					} /* We need alt text here if it is included in the atom data otherwise we need to have a general description */
					css={css`
						height: 200px;
						width: auto
							/* This might not be necessary once we have the correct grid in place with article body data */
							${from.tablet} {
							height: 250px;
						}
						${from.leftCol} {
							height: 375px;
						}
					`}
				/>
				<div
					css={css`
						position: absolute;
						bottom: 10%;
						left: 10%;
						transform: translate(-10%, -10%);
					`}
				>
					<h2
						css={css`
							${textSansBold20}
							margin-bottom: 8px;
							color: white;
						`}
					>
						{ctaText}
					</h2>
					<Button
						iconSide="right"
						size="small"
						icon={<SvgExternal />}
						theme={{
							textPrimary: sourcePalette.neutral[7],
							backgroundPrimary: sourcePalette.neutral[97],
							backgroundPrimaryHover: sourcePalette.neutral[73],
						}}
					>
						{ctaButtonText}
					</Button>
				</div>
			</picture>
		</a>
	);
};
