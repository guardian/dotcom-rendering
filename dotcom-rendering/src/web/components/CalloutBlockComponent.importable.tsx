import { ExpandingWrapper } from '@guardian/source-react-components-development-kitchen';
import type { CalloutBlockElementV2 } from '../../types/content';
import { CalloutBlock } from './Callout/Callout';
import { CalloutExpired } from './Callout/CalloutComponents';
import { Deadline } from './Callout/Deadline';

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

	const isExpired = (date: number | undefined): boolean => {
		if (date !== undefined) {
			return Math.floor(new Date().getTime() / 1000) > date;
		}
		return false;
	};

	if (!isNonCollapsible && isExpired(activeUntil)) {
		return null;
	}

	if (isNonCollapsible && isExpired(activeUntil)) {
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
						<CalloutBlock
							formId={id}
							prompt={prompt}
							heading={title}
							description={description}
							formFields={formFields}
							submissionURL={calloutsUrl}
							isExpired={isExpired(activeUntil)}
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
					isExpired={isExpired(activeUntil)}
					isNonCollapsible={isNonCollapsible}
					contacts={contacts}
					pageId={pageId}
				/>
			)}
		</>
	);
};
