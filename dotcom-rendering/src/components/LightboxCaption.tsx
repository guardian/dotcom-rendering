import { css } from '@emotion/react';
import {
	space,
	palette as srcPalette,
	textSans14,
} from '@guardian/source/foundations';
import { palette } from '../palette';

type Props = {
	captionText?: string;
	credit?: string;
	displayCredit?: boolean;
};

export const LightboxCaption = ({
	captionText,
	credit,
	displayCredit,
}: Props) => {
	return (
		<figcaption
			css={css`
				${textSans14};
				line-height: 135%;
				overflow-wrap: break-all;
				padding-top: ${space[2]}px;
				padding-bottom: ${space[2]}px;
				border-top: 3px solid ${palette('--lightbox-divider')};
			`}
		>
			{!!captionText && (
				<span
					css={[
						css`
							color: ${srcPalette.neutral[97]};
							a {
								color: inherit;
							}
							strong {
								font-weight: bold;
							}
						`,
					]}
					dangerouslySetInnerHTML={{
						__html: captionText || '',
					}}
					key="caption"
				/>
			)}
			{!!credit && displayCredit && (
				<div
					css={css`
						color: ${srcPalette.neutral[60]};
					`}
				>
					{credit}
				</div>
			)}
		</figcaption>
	);
};
