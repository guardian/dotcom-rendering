import { isUndefined } from '@guardian/libs';
import type {
	CalloutContactType,
	ReporterCalloutBlockElement,
} from '../types/content';
import { palette } from '../palette';
import { Deadline } from './Callout/Deadline';
import { ExpandingWrapper } from '@guardian/source-development-kitchen/react-components';
import { css } from '@emotion/react';
import {
	article17,
	headlineBold20,
	headlineMedium20,
	space,
} from '@guardian/source/foundations';

/**
 * A callout to readers to share tips with reporters
 *
 * ## TODO: check if this needs to be an island - possibly not as there's no user interaction beyond expanding the box
 *
 */

const promptStyles = css`
	${headlineBold20};
`;

const subtitleTextHeaderStyles = css`
	${headlineMedium20}
	padding-bottom: ${space[3]}px;
`;

const linkStyles = css`
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
`;

const calloutStyles = css`
	padding-bottom: ${space[4]}px;
	${article17}
	b {
		font-weight: bold;
	}
`;

const dangerouslyRenderField = (field?: string, title?: string) => {
	return field ? (
		<div css={[linkStyles, calloutStyles]}>
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
		id,
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

	console.log('CONTACTS', mainText);

	return isExpired ? (
		<></>
	) : (
		<div data-gu-name="callout">
			<ExpandingWrapper
				name={`${title} callout`}
				theme={{
					'--background': palette('--expandingWrapper--background'),
					'--border': palette('--expandingWrapper--border'),
					'--collapseBackground': palette(
						'--expandingWrapper--collapseBackground',
					),
					'--collapseBackgroundHover': palette(
						'--expandingWrapper--collapseBackgroundHover',
					),
					'--collapseText': palette(
						'--expandingWrapper--collapseText',
					),
					'--collapseTextHover': palette(
						'--expandingWrapper--collapseTextHover',
					),
					'--text': palette('--expandingWrapper--text'),
					'--horizontalRules': palette(
						'--expandingWrapper--horizontalRules',
					),
					'--expandBackground': palette(
						'--expandingWrapper--expandBackground',
					),
					'--expandBackgroundHover': palette(
						'--expandingWrapper--expandBackgroundHover',
					),
					'--expandText': palette('--expandingWrapper--expandText'),
				}}
				collapsedHeight={'160px'}
			>
				<div
					style={css`
						paddingbottom: ${space[4]}px;
					`}
				>
					<div
						css={promptStyles}
						style={{
							color: palette('--callout-prompt'),
						}}
					>
						{title}
					</div>

					<h4 css={subtitleTextHeaderStyles}>{subtitle}</h4>

					{dangerouslyRenderField(intro)}
					<h4 css={subtitleTextHeaderStyles}>{mainTextHeading}</h4>
					{dangerouslyRenderField(mainText)}
					{dangerouslyRenderField(emailContact, 'Email')}
					{dangerouslyRenderField(messagingContact, 'Messaging apps')}
					{dangerouslyRenderField(securedropContact, 'SecureDrop')}
					{dangerouslyRenderField(endNote)}
				</div>
			</ExpandingWrapper>
		</div>
	);
};
