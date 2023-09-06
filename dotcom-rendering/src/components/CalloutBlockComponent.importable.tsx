import { css } from '@emotion/react';
import { palette } from '@guardian/source-foundations';
import { ExpandingWrapper } from '@guardian/source-react-components-development-kitchen';
import type { CalloutBlockElementV2 } from '../types/content';
import { CalloutBlock } from './Callout/Callout';
import { CalloutExpired } from './Callout/CalloutComponents';
import { Deadline } from './Callout/Deadline';

const collapsibleCalloutStyle = css`
	background-color: ${palette.neutral[97]};
`;

/**
 * A callout to readers to share their stories.
 * This is the updated version of the CalloutEmbedBlockComponent.
 *
 * ## Why does this need to be an Island?
 *
 * We are responding to user interactions on the page,
 * and submitting a form.
 *
 */

export const CalloutBlockComponent = ({
	callout,
	pageId,
	format,
}: {
	callout: CalloutBlockElementV2;
	pageId: string;
	format: ArticleFormat;
}) => {
	const {
		prompt,
		title,
		description,
		formFields,
		activeUntil,
		calloutsUrl,
		formId,
		isNonCollapsible,
		contacts,
	} = callout;

	const isExpired =
		activeUntil === undefined
			? false
			: Math.floor(new Date().getTime() / 1000) > activeUntil;

	if (!isNonCollapsible && isExpired) {
		return null;
	}

	if (isNonCollapsible && isExpired) {
		return <CalloutExpired />;
	}

	const id = formId.toString();

	return (
		<>
			{!isNonCollapsible ? (
				<aside>
					<ExpandingWrapper
						name={`${callout.formId} form`}
						renderExtra={() => <Deadline until={activeUntil} />}
						collapsedHeight={'160px'}
					>
						<div css={collapsibleCalloutStyle}>
							<CalloutBlock
								formId={id}
								prompt={prompt}
								heading={title}
								description={description}
								formFields={formFields}
								submissionURL={calloutsUrl}
								isNonCollapsible={isNonCollapsible}
								contacts={contacts}
								pageId={pageId}
								format={format}
							/>
						</div>
					</ExpandingWrapper>
				</aside>
			) : (
				<CalloutBlock
					formId={id}
					prompt={prompt}
					heading={title}
					description={description}
					formFields={formFields}
					submissionURL={calloutsUrl}
					isNonCollapsible={isNonCollapsible}
					contacts={contacts}
					pageId={pageId}
					format={format}
				/>
			)}
		</>
	);
};
