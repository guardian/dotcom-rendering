// import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { ArticleFormat } from '@guardian/libs';
import type { FC, ReactElement } from 'react';
import { renderCalloutDescriptionText } from 'renderer';
import CalloutForm from './calloutForm';
import {
	calloutContainerStyles,
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
	isTabbable?: boolean;
}

const CalloutBlock: FC<CalloutBlockProps> = ({
	formId,
	heading,
	name,
	formFields,
	format,
	description,
}): ReactElement => (
	<div css={calloutContainerStyles(format)}>
		<div css={calloutTitle(format)}>{heading}</div>
		<h4 css={calloutHeadingText}>{name}</h4>
		{description && (
			<div css={calloutDescription}>
				{renderCalloutDescriptionText(format, description)}
			</div>
		)}
		<CalloutForm id={formId} fields={formFields} format={format} />
	</div>
);

export default CalloutBlock;
