import { css } from '@emotion/react';
import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { ArticleFormat } from '@guardian/libs';
import { error, remSpace, textSans, until } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import type { FC } from 'react';
import { renderDisclaimer, renderField } from './formFields';

export interface CalloutProps {
	campaign: Campaign;
	format: ArticleFormat;
	description?: DocumentFragment;
}

const formStyles = css`
	margin: ${remSpace[3]};
`;

const errorStyles = css`
	color: ${error[400]};
	${textSans.small()};
`;

const buttonStyles = css`
	${until.tablet} {
		width: 100%;
		justify-content: center;
	}
`;

const CalloutForm: FC<CalloutProps> = ({ campaign, format }) => {
	return (
		<form css={formStyles} action="#" method="post">
			{renderDisclaimer(format)}
			<input name="formId" type="hidden" value={campaign.fields.formId} />
			{campaign.fields.formFields.map((field) =>
				renderField(field, format),
			)}
			<p css={errorStyles} className="js-error-message"></p>
			<Button
				// TODO: The button should be using the format Branding
				// css={getStyles(format)}
				priority="primary"
				type="submit"
				cssOverrides={buttonStyles}
			>
				Submit
			</Button>
		</form>
	);
};

export default CalloutForm;
