import type { FC } from 'react';
import { css } from '@emotion/react';
import { body, headline, neutral, news } from '@guardian/source-foundations';
// import type { Palette } from '../../types/palette';
// import { decidePalette } from '../lib/decidePalette';
import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { ArticleFormat } from '@guardian/libs';
// import { Form } from './CalloutNew/Form';
import { plainTextElement } from 'renderer';
import { parse } from 'client/parser';
import type { Option } from '@guardian/types';

export interface CalloutProps {
	campaign: Campaign;
	format: ArticleFormat;
	description?: DocumentFragment;
}

const wrapperStyles = css`
	margin-bottom: 26px;
	margin-top: 16px;
	padding-left: 10px;
	padding-right: 10px;
`;

const calloutDetailsStyles = css`
	border-top: 1px ${neutral[86]} solid;
	border-bottom: 1px ${neutral[86]} solid;
	position: relative;
	padding-bottom: 10px;

	/* IE does not support summary HTML elements, so we need to hide children ourself */
	:not([open]) > *:not(summary) {
		display: none;
	}
`;

const backgroundColorStyle = css`
	background-color: ${neutral[97]};
`;

const summaryStyles = css`
	/* Removing default styles from summery tag */
	::-webkit-details-marker {
		display: none;
	}
	outline: none;

	/* We don't want the summary to open when we click anything but the button, so we pointer-event: none the summary */
	/* 176da211-05aa-4280-859b-1e3157b3f19e */
	pointer-events: none;

	/*
        why hide visibility?
        because we want to prevent the user for tabbing to the summery HTML element
        without using tabIndex={-1} which would disable focus on all child DOM elements

        NOTE: requires "visibility: visible;" on child elements to display and enable focus
    */
	visibility: hidden;

	a {
		/* but we do want to allow click on links */
		pointer-events: all;
	}
`;

const summaryContentWrapper = css`
	padding-left: 10px;
	visibility: visible;
`;

const titleStyles = css`
	${headline.xxsmall({ fontWeight: 'bold' })}
	color: ${news[300]}
`;

const headingTextHeaderStyles = css`
	${headline.xxsmall()}
`;

const descriptionStyles = css`
	${body.medium()}
`;

// const headingTextStyles = (palette: Palette) => css`
// 	a {
// 		color: ${palette.text.calloutHeading};
// 		text-decoration: none;
// 		:hover {
// 			text-decoration: underline;
// 		}
// 	}
// `;

// const Callout = ({
// 	// callout,
// 	// format,
// }: {
// 	// callout: CalloutBlockElement;
// 	// format: ArticleFormat;
// }) => {
// 	// const palette = decidePalette(format);
// 	// const { title, description, formFields } = callout;

const renderDescription = (html: string) => {
	if (!html) return;
	const parser = new DOMParser();
	const parseDescription = parse(parser);
	const description: Option<DocumentFragment> = parseDescription(html).toOption();
	return (
		<div>
			{{description}}
		</div>
	)
}

const Callout: FC<CalloutProps> = ({ campaign, format, description }) => {
	// TODO: When we render this, how are priority & displayOnSensitive used?
	const {name, fields} = campaign
	const { callout} = fields;

	// console.log('*** description', description);

	// const parser = new DOMParser();
	// const parseDescription = parse(parser);

	// const standfirst: Option<DocumentFragment> = parseDescription(fields.description || "").toOption();



	return (
		<>
			<figure css={wrapperStyles}>
				<details
					css={[calloutDetailsStyles, backgroundColorStyle]}
					aria-hidden={true}
					open={true}
				>
					<summary css={summaryStyles}>
						<div css={summaryContentWrapper}>
							<div>
							{/* <div css={headingTextStyles(palette)}> */}
								<div css={titleStyles}>
									{callout}
								</div>
								<h4 css={headingTextHeaderStyles}>{name}</h4>
								{ description &&
								<div css={descriptionStyles}>
									Test Description
									{/* {description} */}
									{/* {Array.from(description.childNodes).map(plainTextElement)} */}
									{/* {renderDescription(description)} */}

								</div>
								}
							</div>
						</div>
					</summary>
					{/* <Form formFields={formFields} onSubmit={() => {}} /> */}
				</details>
			</figure>
		</>
	);
};

export default Callout
