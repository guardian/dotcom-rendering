import { css } from '@emotion/react';
import { neutral } from '@guardian/source-foundations';
import { ExpandingWrapper } from '@guardian/source-react-components-development-kitchen';
import type { CalloutBlockElementV2 } from '../../types/content';
import { CalloutBlock } from './Callout/Callout';
import { CalloutExpired } from './Callout/CalloutComponents';
import { Deadline } from './Callout/Deadline';

export const CalloutBlockComponent = ({
	callout,
	format,
}: {
	callout: CalloutBlockElementV2;
	format: ArticleFormat;
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

	return (
		<>
			{!isNonCollapsible ? (
				<aside>
					<ExpandingWrapper
						name={`${callout.formId} form`}
						renderExtra={() => <Deadline until={activeUntil} />}
					>
						<CalloutBlock
							formId={formId}
							heading={title}
							formFields={formFields}
							format={format}
							description={description}
							submissionURL={calloutsUrl}
							isExpired={isExpired(activeUntil)}
						/>
					</ExpandingWrapper>
				</aside>
			) : (
				<CalloutBlock
					formId={formId}
					heading={title}
					formFields={formFields}
					format={format}
					description={description}
					submissionURL={calloutsUrl}
					isExpired={isExpired(activeUntil)}
				/>
			)}
		</>
	);
};
