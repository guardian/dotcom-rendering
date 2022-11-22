import { ThemeProvider } from '@emotion/react';
import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { ArticleFormat } from '@guardian/libs';
import { ExpandingWrapper } from '@guardian/source-react-components-development-kitchen';
import type { Option } from '@guardian/types';
import { useState } from 'react';
import type { FC, ReactElement } from 'react';
import CalloutBlock from './calloutBlock';
import DeadlineDate from './deadlineDate';
import { getTheme } from './theme';

export interface CalloutProps {
	campaign: Campaign;
	format: ArticleFormat;
	description: Option<DocumentFragment>;
	isNonCollapsable?: boolean;
}

const Callout: FC<CalloutProps> = ({
	campaign,
	format,
	description,
	isNonCollapsable,
}): ReactElement => {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<aside>
			{isNonCollapsable ? (
				<ThemeProvider theme={getTheme(format)}>
					<CalloutBlock
						format={format}
						campaign={campaign}
						description={description}
					/>
					<DeadlineDate until={campaign.activeUntil} />
				</ThemeProvider>
			) : (
				<ThemeProvider theme={getTheme(format)}>
					<ExpandingWrapper
						renderExtra={() => (
							<DeadlineDate until={campaign.activeUntil} />
						)}
						name={`${campaign.name} form`}
						expandCallback={setIsExpanded}
					>
						<CalloutBlock
							format={format}
							campaign={campaign}
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
