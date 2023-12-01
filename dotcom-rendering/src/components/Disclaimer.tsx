import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';

const disclaimerStyles = css`
	${textSans.medium({ lineHeight: 'regular' })};
	max-width: 540px;

	sup {
		font-size: 85%;
	}

	margin-bottom: 16px;
`;

type Props = {
	html: string;
};

export const Disclaimer = ({ html }: Props) => (
	<aside
		css={disclaimerStyles}
		data-testid="affiliate-disclaimer"
		dangerouslySetInnerHTML={{
			__html: html,
		}}
	/>
);
