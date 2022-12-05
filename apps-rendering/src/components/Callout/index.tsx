import { css, ThemeProvider } from '@emotion/react';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import { ExpandingWrapper } from '@guardian/source-react-components-development-kitchen';
import type Int64 from 'node-int64';
import { useState } from 'react';
import type { FC, ReactElement } from 'react';
import CalloutBlock from './calloutBlock';
import { DeadlineDate, Highlight, isCalloutActive } from './deadlineDate';
import { getTheme } from './theme';

export interface CalloutProps {
	heading: string;
	formId: number;
	formFields: FormField[];
	format: ArticleFormat;
	description?: DocumentFragment;
	isNonCollapsible: boolean;
	activeUntil?: Int64;
	name: string;
}

const Callout: FC<CalloutProps> = ({
	heading,
	description,
	formId,
	formFields,
	format,
	isNonCollapsible,
	activeUntil,
	name,
}): ReactElement => {
	const isActive = isCalloutActive(activeUntil);

	if (!isActive && isNonCollapsible) {
		return (
			<Highlight>
				This form has been deactivated and is closed to any further
				submissions.
			</Highlight>
		);
	} else if (!isActive && !isNonCollapsible) {
		return <></>;
	}

	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<aside>
			{isNonCollapsible ? (
				<>
					<CalloutBlock
						formId={formId}
						heading={heading}
						name={name}
						formFields={formFields}
						format={format}
						description={description}
					/>
					<span
						css={css`
							position: absolute;
							right: 0;
							margin-top: -${remSpace[6]};
						`}
					>
						<DeadlineDate until={activeUntil} />
					</span>
				</>
			) : (
					<ExpandingWrapper
						renderExtra={(): ReactElement => (
							<DeadlineDate until={activeUntil} />
						)}
						name={`${name} form`}
						expandCallback={setIsExpanded}
					>
						<CalloutBlock
							formId={formId}
							heading={heading}
							name={name}
							formFields={formFields}
							format={format}
							description={description}
							// TODO: This potentially not futureproof, would it be better to
							// set the tabIndex on all children with js?
							isTabbable={isExpanded}
						/>
					</ExpandingWrapper>
			)}
		</aside>
	);
};

export default Callout;
