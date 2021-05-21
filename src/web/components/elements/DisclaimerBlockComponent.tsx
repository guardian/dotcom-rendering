import { body } from '@guardian/src-foundations/typography';
import { css } from 'emotion';

const disclaimerStyles = css`
	${body.small()};

	sup {
		font-size: 85%;
	}

	margin-bottom: 16px;
`;

export const DisclaimerBlockComponent: React.FC<{
	html: string;
}> = ({ html }) => (
	<footer
		className={disclaimerStyles}
		data-cy="affiliate-disclaimer"
		dangerouslySetInnerHTML={{
			__html: html,
		}}
	/>
);
