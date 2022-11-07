import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { ArticleFormat } from '@guardian/libs';
import type { Option } from '@guardian/types';
import type { FC, ReactElement } from 'react';
import Callout from './callout';
import DeadlineDate from './deadlineDate';
import ExpandingWrapper from './expandingWrapper';

export interface CalloutProps {
	campaign: Campaign;
	format: ArticleFormat;
	description: Option<DocumentFragment>;
	isNonCollapsable?: boolean;
}

const CalloutForm: FC<CalloutProps> = ({
	campaign,
	format,
	description,
	isNonCollapsable,
}): ReactElement => {
	return (
		<aside>
			{isNonCollapsable ? (
				<>
					<Callout
						format={format}
						campaign={campaign}
						description={description}
					/>
					<DeadlineDate until={campaign.activeUntil} />
				</>
			) : (
				<>
					<ExpandingWrapper
						format={format}
						renderExtra={(): ReactElement => (
							<DeadlineDate until={campaign.activeUntil} />
						)}
					>
						<Callout
							format={format}
							campaign={campaign}
							description={description}
						/>
					</ExpandingWrapper>
				</>
			)}
		</aside>
	);
};

export default CalloutForm;
