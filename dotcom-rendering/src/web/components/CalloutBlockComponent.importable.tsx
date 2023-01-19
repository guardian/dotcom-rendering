import { ExpandingWrapper } from '@guardian/source-react-components-development-kitchen';
import type { CalloutBlockElementV2 } from '../../types/content';
import { CalloutBlock } from './Callout/Callout';
import { CalloutExpired } from './Callout/CalloutComponents';
import { Deadline } from './Callout/Deadline';

export const CalloutBlockComponent = ({
	callout,
}: {
	callout: CalloutBlockElementV2;
}) => {
	const {
		title,
		description,
		formFields,
		activeUntil,
		calloutsUrl,
		formId,
		isNonCollapsible,
	} = callout;

	const isExpired = (date: number | undefined): boolean => {
		if (date) {
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
					>
						<CalloutBlock
							formId={id}
							heading={title}
							formFields={formFields}
							description={description}
							submissionURL={calloutsUrl}
							isExpired={isExpired(activeUntil)}
							showCalloutTitle={false}
						/>
					</ExpandingWrapper>
				</aside>
			) : (
				<CalloutBlock
					formId={id}
					heading={title}
					formFields={formFields}
					description={description}
					submissionURL={calloutsUrl}
					isExpired={isExpired(activeUntil)}
				/>
			)}
		</>
	);
};
