import { css } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import { ExpandingWrapper } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type Int64 from 'node-int64';
import { remSpace } from '@guardian/source-foundations';
import type { FC, ReactElement } from 'react';
import CalloutBlock from './calloutBlock';
import {isCalloutActive, DeadlineDate} from './deadlineDate';
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
		return <p>This callout has now expired</p>
	} else if (!isActive && !isNonCollapsible) { return <></>}

	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<aside>
			{isNonCollapsible ? (
				<ThemeProvider theme={getTheme(format)}>
					<CalloutBlock
						formId={formId}
						heading={heading}
						name={name}
						formFields={formFields}
						format={format}
						description={description}
					/>
					<span css={css`
						position: absolute;
						right: 0;
						margin-top: -${remSpace[6]};
					`}>
						<DeadlineDate until={activeUntil} />
					</span>
				</ThemeProvider>
			) : (
				<ThemeProvider theme={getTheme(format)}>
					<ExpandingWrapper
						renderExtra={() => (
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
							// TODO: This is pretty heavy (and not futureproof), would it be better to
							// set the tabIndex on all children with js?
							isTabbable={isExpanded}
						/>
					</ExpandingWrapper>
				</ThemeProvider>
			)}
		</aside>
	);
};

export default Callout;
