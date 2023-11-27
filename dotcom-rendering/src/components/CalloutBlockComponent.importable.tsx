import { ExpandingWrapper } from '@guardian/source-react-components-development-kitchen';
import { palette } from '../palette';
import type { CalloutBlockElementV2 } from '../types/content';
import { CalloutBlock } from './Callout/Callout';
import { CalloutExpired } from './Callout/CalloutComponents';
import { Deadline } from './Callout/Deadline';

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
}: {
	callout: CalloutBlockElementV2;
	pageId: string;
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
						theme={{
							'--background': palette(
								'--expandingWrapper--background',
							),
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
							'--expandText': palette(
								'--expandingWrapper--expandText',
							),
						}}
						renderExtra={() => <Deadline until={activeUntil} />}
						collapsedHeight={'160px'}
					>
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
						/>
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
				/>
			)}
		</>
	);
};
