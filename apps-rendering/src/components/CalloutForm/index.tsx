import { ThemeProvider } from '@emotion/react';
import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { ArticleFormat } from '@guardian/libs';
import type { Option } from '@guardian/types';
import type { FC, ReactElement } from 'react';
import Callout from './callout';
import DeadlineDate from './deadlineDate';
import ExpandingWrapper from './expandingWrapper';
import { getTheme } from './theme';

export interface CalloutProps {
	campaign: Campaign;
	format: ArticleFormat;
	description: Option<DocumentFragment>;
	isNonCollapsable?: boolean;
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CalloutForm: FC<CalloutProps> = ({
	campaign,
	format,
	description,
	isNonCollapsable,
	onSubmit,
}): ReactElement => {
	return (
		<aside>
			{isNonCollapsable ? (
				<ThemeProvider theme={getTheme(format)}>
					<Callout
						onSubmit={onSubmit}
						format={format}
						campaign={campaign}
						description={description}
					/>
					<DeadlineDate until={campaign.activeUntil} />
				</ThemeProvider>
			) : (
				<ThemeProvider theme={getTheme(format)}>
					<ExpandingWrapper
						format={format}
						renderExtra={(): ReactElement => (
							<DeadlineDate until={campaign.activeUntil} />
						)}
						name={`${campaign.name} form`}
					>
						<Callout
							onSubmit={onSubmit}
							format={format}
							campaign={campaign}
							description={description}
						/>
					</ExpandingWrapper>
				</ThemeProvider>
			)}
		</aside>
	);
};

export default CalloutForm;
