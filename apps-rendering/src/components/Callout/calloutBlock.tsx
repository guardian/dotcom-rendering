import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { ArticleFormat } from '@guardian/libs';
import type { FC, ReactElement } from 'react';
import { renderCalloutDescriptionText } from 'renderer';
import CalloutForm from './calloutForm';
import {
	calloutContainer,
	calloutDescription,
	calloutHeadingText,
	calloutTitle,
} from './styles';

export interface CalloutBlockProps {
	formId: number;
	heading: string;
	name: string;
	formFields: FormField[];
	format: ArticleFormat;
	description?: DocumentFragment;
}

const CalloutBlock: FC<CalloutBlockProps> = ({
	formId,
	heading,
	formFields,
	format,
	description,
}): ReactElement => (
	<div css={calloutContainer(format)}>
		<div css={calloutTitle(format)}>Tell Us</div>
		<h4 css={calloutHeadingText}>{heading}</h4>
		{description && (
			<div css={calloutDescription}>
				{renderCalloutDescriptionText(format, description)}
			</div>
		)}
		<CalloutForm id={formId} fields={formFields} format={format} />
	</div>
);

export default CalloutBlock;
