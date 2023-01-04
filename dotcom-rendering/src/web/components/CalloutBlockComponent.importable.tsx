import { css } from '@emotion/react';
import { neutral } from '@guardian/source-foundations';
import { ExpandingWrapper } from '@guardian/source-react-components-development-kitchen';
import type { CalloutBlockElementV2 } from '../../types/content';
import { CalloutBlock } from './Callout/Callout';
import { Deadline } from './Callout/Deadline';

const ruleStyles = css`
	border-image: repeating-linear-gradient(
			to bottom,
			${neutral[86]},
			${neutral[86]} 1px,
			transparent 1px,
			transparent 4px
		)
		13;
	border-top: 13px solid ${neutral[86]};
`;

export const CalloutBlockComponent = ({
	callout,
	format,
}: {
	callout: CalloutBlockElementV2;
	format: ArticleFormat;
}) => {
	const { title, description, formFields, activeUntil, calloutsUrl, formId } =
		callout;
	const isEmbed = !callout.isNonCollapsible;

	const isExpired = (date: number | undefined): boolean => {
		if (date) {
			return Math.floor(new Date().getTime() / 1000) > date;
		}
		return false;
	};

	if (isEmbed && isExpired(activeUntil)) {
		return null;
	}

	return (
		<>
			{isEmbed ? (
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
				<div css={ruleStyles}>
					<CalloutBlock
						formId={formId}
						heading={title}
						formFields={formFields}
						format={format}
						description={description}
						submissionURL={calloutsUrl}
						isExpired={isExpired(activeUntil)}
					/>
				</div>
			)}
		</>
	);
};
