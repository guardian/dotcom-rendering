import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { body, headline, remSpace } from '@guardian/source-foundations';
import { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { FC, ReactElement } from 'react';
import { renderCalloutDescriptionText } from 'renderer';
import CalloutForm from './calloutForm';

export interface CalloutBlockProps {
	formId: number;
	heading: string;
	name: string;
	formFields: FormField[];
	format: ArticleFormat;
	description?: DocumentFragment;
	isTabbable?: boolean;
}

const containerStyles = (theme: any): SerializedStyles => css`
	background: ${theme.background};
	color: ${theme.text};
	padding-bottom: ${remSpace[12]};

	a {
		color: ${theme.linkColor};
	}
`;
const calloutDetailsStyles = css`
	padding-bottom: ${remSpace[6]};

	/* IE does not support summary HTML elements, so we need to hide children ourself */
	:not([open]) > *:not(summary) {
		display: none;
	}
`;

const summaryStyles = css`
	/* Remove default styles from summery tag */
	::-webkit-details-marker {
		display: none;
	}
	outline: none;

	/* We don't want the summary to open when we click anything but the button, so we pointer-event: none the summary */
	pointer-events: none;

	/*  why hide visibility?
        We want to prevent the user for tabbing to the summery HTML element
        without using tabIndex={-1} which would disable focus on all child DOM elements

        NOTE: requires "visibility: visible;" on child elements to display and enable focus */
	visibility: hidden;

	a {
		/* but we do want to allow click on links */
		pointer-events: all;
	}
`;

const summaryContentWrapper = css`
	padding-left: ${remSpace[2]};
	visibility: visible;
`;

const titleStyles = (theme: any): SerializedStyles => css`
	${headline.xxsmall({ fontWeight: 'bold' })};
	color: ${theme.primary};
`;

const headingTextHeaderStyles = css`
	${headline.xxsmall()}
`;

const descriptionStyles = css`
	${body.medium()}
	padding: ${remSpace[3]} 0;
`;

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
		<div css={containerStyles}>
			<details css={calloutDetailsStyles} open={true}>
				<summary css={summaryStyles}>
					<div css={summaryContentWrapper}>
						<div css={titleStyles}>{heading}</div>
						<h4 css={headingTextHeaderStyles}>{name}</h4>
							<div css={descriptionStyles}>
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
