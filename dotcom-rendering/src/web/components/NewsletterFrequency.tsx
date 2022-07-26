import { css } from '@emotion/react';
import {
	brandAltBackground,
	from,
	space,
	textSans,
} from '@guardian/source-foundations';
import { SvgNewsletter } from './SvgNewsletter';

export const NewsletterFrequency = ({ frequency }: { frequency: string }) => {
	return (
		<div
			css={css`
				display: flex;
				margin-top: ${space[2]}px;
				${from.tablet} {
					margin-top: 0;
				}
			`}
		>
			<div
				css={css`
					height: 28px;
					svg {
						background: ${brandAltBackground.primary};
						border-radius: 50%;
						height: 100%;
						padding: 2px;
						margin-right: ${space[1]}px;
					}
				`}
			>
				<SvgNewsletter />
			</div>
			<div
				css={css`
					${textSans.medium({ fontWeight: 'bold' })}
				`}
			>
				{frequency}
			</div>
		</div>
	);
};
