import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	textSansBold20,
} from '@guardian/source/foundations';
import { Button, SvgExternal } from '@guardian/source/react-components';

type Props = {
	linkUrl: string;
	backgroundImage: string;
	text: string;
	buttonText: string;
};

export const CallToActionAtom = ({
	linkUrl,
	backgroundImage,
	text,
	buttonText,
}: Props) => {
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
						width: auto
						object-fit: cover;

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
						{text}
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
						{buttonText}
					</Button>
				</div>
			</picture>
		</a>
	);
};
