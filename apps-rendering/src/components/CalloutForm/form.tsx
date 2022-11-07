import { css } from '@emotion/react';
import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { ArticleFormat } from '@guardian/libs';
import { error, remSpace, textSans, until } from '@guardian/source-foundations';
import { EditorialButton } from '@guardian/source-react-components-development-kitchen';
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
	${until.mobileLandscape} {
		button {
			width: 100%;
			justify-content: center;
		}
	}
`;

const CalloutForm: FC<CalloutProps> = ({ campaign, format }) => (
	<form css={formStyles} action="#" method="post">
		{renderDisclaimer(format)}
		<input name="formId" type="hidden" value={campaign.fields.formId} />
		{campaign.fields.formFields.map((field) => renderField(field, format))}
		<p css={errorStyles} className="js-error-message"></p>
		<div css={buttonStyles}>
			<EditorialButton format={format} type="submit" priority="primary">
				Submit
			</EditorialButton>
		</div>
	</form>
);

export default CalloutForm;
