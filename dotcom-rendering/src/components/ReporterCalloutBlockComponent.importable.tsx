import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	article17,
	headlineBold20,
	headlineMedium20,
	space,
} from '@guardian/source/foundations';
import { ExpandingWrapper } from '@guardian/source-development-kitchen/react-components';
import { palette } from '../palette';
import type { ReporterCalloutBlockElement } from '../types/content';

/**
 * A callout to readers to share tips with reporters
 *
 * ## TODO: check if this needs to be an island - possibly not as there's no user interaction beyond expanding the box
 *
 */

const expandingWrapperTheme = {
	'--background': palette('--expandingWrapper--background'),
	'--border': palette('--expandingWrapper--border'),
	'--collapseBackground': palette('--expandingWrapper--collapseBackground'),
	'--collapseBackgroundHover': palette(
		'--expandingWrapper--collapseBackgroundHover',
	),
	'--collapseText': palette('--expandingWrapper--collapseText'),
	'--collapseTextHover': palette('--expandingWrapper--collapseTextHover'),
	'--text': palette('--expandingWrapper--text'),
	'--horizontalRules': palette('--expandingWrapper--horizontalRules'),
	'--expandBackground': palette('--expandingWrapper--expandBackground'),
	'--expandBackgroundHover': palette(
		'--expandingWrapper--expandBackgroundHover',
	),
	'--expandText': palette('--expandingWrapper--expandText'),
};

const promptStyles = css`
	${headlineBold20};
`;

const subtitleTextHeaderStyles = css`
	${headlineMedium20};
	padding-bottom: ${space[3]}px;
`;

const reporterCalloutFieldStyles = css`
	a {
		color: ${palette('--article-link-text')};
		text-decoration-color: ${palette('--article-link-border')};
		text-underline-offset: 0.375em;
		text-decoration-thickness: 1px;
	}
	a:hover,
	a:active {
		text-decoration-color: currentColor;
	}
	padding-bottom: ${space[4]}px;
	${article17}
	b {
		font-weight: bold;
	}
`;
const reporterCalloutWrapperStyles = css`
	padding-bottom: ${space[4]}px;
	margin-left: ${space[2]}px;
	margin-right: ${space[2]}px;
`;

const dangerouslyRenderField = (field?: string, title?: string) => {
	return field ? (
		<div css={reporterCalloutFieldStyles}>
			{!!title && <h4 css={subtitleTextHeaderStyles}>{title}</h4>}
			<div
				dangerouslySetInnerHTML={{
					__html: field,
				}}
			/>
		</div>
	) : (
		''
	);
};

export const ReporterCalloutBlockComponent = ({
	callout,
}: {
	callout: ReporterCalloutBlockElement;
}) => {
	const {
		title,
		subtitle,
		intro,
		mainText,
		mainTextHeading,
		emailContact,
		messagingContact,
		securedropContact,
		endNote,
		activeUntil,
	} = callout;
	const isExpired = isUndefined(activeUntil)
		? false
		: Math.floor(new Date().getTime() / 1000) > activeUntil;

	return isExpired ? (
		<></>
	) : (
		<div data-gu-name="reporter-callout">
			<ExpandingWrapper
				name={`${title} reporter callout`}
				theme={expandingWrapperTheme}
				collapsedHeight={'160px'}
			>
				<div css={reporterCalloutWrapperStyles}>
					<div
						css={promptStyles}
						style={{
							// reuse atom styling for now unless we get special callout designs
							color: palette('--expandable-atom-text-hover'),
						}}
					>
						{title}
					</div>

					<h4 css={subtitleTextHeaderStyles}>{subtitle}</h4>

					{dangerouslyRenderField(intro)}
					{dangerouslyRenderField(mainText, mainTextHeading)}
					{dangerouslyRenderField(emailContact, 'Email')}
					{dangerouslyRenderField(messagingContact, 'Messaging apps')}
					{dangerouslyRenderField(securedropContact, 'SecureDrop')}
					{dangerouslyRenderField(endNote)}
				</div>
			</ExpandingWrapper>
		</div>
	);
};
