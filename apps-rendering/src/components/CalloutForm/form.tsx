import { css } from '@emotion/react';
import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace, textSans, until } from '@guardian/source-foundations';
import type { FC } from 'react';
import type { SerializedStyles } from '@emotion/react';
import { Disclaimer, renderField } from './formFields';
import { Button } from '@guardian/source-react-components';
import {ShareLink}	from './shareLink';

export interface CalloutProps {
	campaign: Campaign;
	format: ArticleFormat;
	description?: DocumentFragment;
}

const formStyles = css`
	margin: ${remSpace[3]};
`;

const errorStyles = (theme: any): SerializedStyles => css`
	color: ${theme.error};
	${textSans.small()};
`;

const buttonStyles = (theme: any): SerializedStyles => css`
	background: ${theme.primary};
	${until.mobileLandscape} {
		button {
			width: 100%;
			justify-content: center;
		}
	}
`;

const CalloutForm: FC<CalloutProps> = ({ campaign, format }) => (
	<form css={formStyles} action="#" method="post">
		<ShareLink />
		<Disclaimer />
		<input name="formId" type="hidden" value={campaign.fields.formId} />
		{campaign.fields.formFields.map((field) => renderField(field, format))}
		<p css={errorStyles} className="js-error-message"></p>
		<div >
			<Button css={buttonStyles} type="submit" priority='primary'>Submit</Button>
		</div>
	</form>
);

export default CalloutForm;
