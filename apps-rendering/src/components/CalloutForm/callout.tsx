import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { ArticleFormat } from '@guardian/libs';
import {
	body,
	headline,
	remSpace,
} from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { renderCalloutDescriptionText } from 'renderer';
import CalloutForm from './form';

export interface CalloutProps {
	campaign: Campaign;
	format: ArticleFormat;
	description: Option<DocumentFragment>;
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}



const containerStyles = (theme: any): SerializedStyles => css`
	background: ${theme.background};
	color: ${theme.text};
	padding-bottom: ${remSpace[12]};

	a {
		color: ${theme.linkColor}
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

const Callout: FC<CalloutProps> = ({ campaign, format, description, onSubmit }) => {
	const { name, fields } = campaign;
	const { callout } = fields;

	return (
		<div css={theme => containerStyles(theme)}>
			<details css={calloutDetailsStyles} open={true}>
				<summary css={summaryStyles}>
					<div css={summaryContentWrapper}>
						<div css={titleStyles}>{callout}</div>
						<h4 css={headingTextHeaderStyles}>{name}</h4>
						{maybeRender(
							description,
							(description: DocumentFragment) => (
								<div css={descriptionStyles}>
									{renderCalloutDescriptionText(
										description,
										format,
									)}
								</div>
							),
						)}
					</div>
				</summary>
				<CalloutForm onSubmit={onSubmit} campaign={campaign} format={format} />
			</details>
		</div>
	);
};

export default Callout;
