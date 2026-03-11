import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	textSansBold20,
} from '@guardian/source/foundations';
import { Button, SvgExternal } from '@guardian/source/react-components';
import type { CallToActionProps } from './CallToActionAtomWrapper';

export const CallToActionAtom = ({
	url,
	image,
	label,
	btnText,
}: CallToActionProps) => {
	return (
		<a
			href={url}
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
					src={image}
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
				<div
					css={css`
						position: absolute;
						bottom: 10%;
						left: 10%;
						transform: translate(-10%, -10%);
					`}
				>
					{!!label && (
						<h2
							css={css`
								${textSansBold20}
								margin-bottom: 8px;
								color: white;
							`}
						>
							{label}
						</h2>
					)}
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
						{btnText}
					</Button>
				</div>
			</picture>
		</a>
	);
};
