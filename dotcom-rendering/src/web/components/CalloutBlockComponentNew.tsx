import { css } from '@emotion/react';
import {
	body,
	headline,
	neutral,
	news,
	textSans,
} from '@guardian/source-foundations';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';
import { Form } from './CalloutNew/Form';

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

const shareCalloutStyles = css`
	display: flex;
	align-items: center;
`;
const shareCalloutTextStyles = css`
	display: inline-block;
	${textSans.xsmall()}
`;

const placeholderCircle = css`
	height: 33px;
	width: 35px;
	border-radius: 50%;
	background-color: yellow;
	border: black solid 2px;
	display: inline-block;
	margin: 10px 10px 10px 0px;
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

const headingTextStyles = (palette: Palette) => css`
	a {
		color: ${palette.text.calloutHeading};
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
`;
const titleStyles = css`
	${headline.xxsmall({ fontWeight: 'bold' })}
	color: ${news[300]}
`;

const subtitleTextHeaderStyles = css`
	${headline.xxsmall()}
`;

const descriptionStyles = css`
	${body.medium()}
`;

export const CalloutBlockComponent = ({
	callout,
	format,
}: {
	callout: CalloutBlockElement;
	format: ArticleFormat;
}) => {
	const palette = decidePalette(format);
	const { title, description, formFields } = callout;

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
							<div css={headingTextStyles(palette)}>
								<div css={titleStyles}>
									Share your experience
								</div>
								<h4 css={subtitleTextHeaderStyles}>{title}</h4>
								<div css={descriptionStyles}>{description}</div>
								<div css={shareCalloutStyles}>
									<span css={placeholderCircle}></span>{' '}
									<div css={shareCalloutTextStyles}>
										Know others who are affected?{' '}
										<a href="https://www.theguardian.com/tone/callout">
											Share this callout.
										</a>
									</div>
								</div>
							</div>
						</div>
					</summary>
					<Form formFields={formFields} onSubmit={() => {}} />
				</details>
			</figure>
		</>
	);
};
