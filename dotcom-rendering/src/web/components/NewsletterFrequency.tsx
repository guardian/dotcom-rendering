import { css } from '@emotion/react';
import {
	brandAltBackground,
	space,
	textSans,
} from '@guardian/source-foundations';
import { SvgEnvelope } from '@guardian/source-react-components';

export const NewsletterFrequency = ({ frequency }: { frequency: string }) => {
	return (
		<div
			css={css`
				display: flex;
			`}
		>
			<div
				css={css`
					svg {
						background: ${brandAltBackground.primary};
						border-radius: 50%;
						height: 28px;
						padding: 2px;
						margin-right: ${space[1]}px;
					}
				`}
			>
				<SvgEnvelope />
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
