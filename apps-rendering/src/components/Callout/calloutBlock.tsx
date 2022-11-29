import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { ArticleFormat } from '@guardian/libs';
import type { FC, ReactElement } from 'react';
import { renderCalloutDescriptionText } from 'renderer';
import CalloutForm from './calloutForm';
import {
	calloutContainerStyles,
	calloutDescription,
	calloutDetailsStyles,
	calloutHeadingText,
	calloutSummaryContentWrapper,
	calloutSummaryStyles,
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
	isTabbable = true,
}): ReactElement => {
	return (
		<div css={calloutContainerStyles(format)}>
			<details css={calloutDetailsStyles} open={true}>
				<summary css={calloutSummaryStyles}>
					<div css={calloutSummaryContentWrapper}>
						<div css={calloutTitle(format)}>{heading}</div>
						<h4 css={calloutHeadingText}>{name}</h4>
						<div css={calloutDescription}>
							<>
								{renderCalloutDescriptionText(
									isTabbable,
									format,
									description,
								)}
							</>
						</div>
					</div>
				</summary>
				<CalloutForm
					id={formId}
					fields={formFields}
					format={format}
					disableInputs={!isTabbable}
				/>
			</details>
		</div>
	);
};

export default CalloutBlock;
