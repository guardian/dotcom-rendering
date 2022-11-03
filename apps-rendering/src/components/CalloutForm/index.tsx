import Callout from './callout';
import ExpandingWrapper from './expandingWrapper';

import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { ArticleFormat } from '@guardian/libs';
import type { Option } from '@guardian/types';
import type { FC } from 'react';

export interface CalloutProps {
	isNonCollapsable: boolean;
	campaign: Campaign;
	format: ArticleFormat;
	description: Option<DocumentFragment>;
}

const CalloutForm: FC<CalloutProps> = ({ isNonCollapsable, campaign, format, description }) => {
	return (
		<aside>
			{isNonCollapsable ? (
				<Callout format={format} campaign={campaign} description={description} />
			) : (<ExpandingWrapper format={format}>
				<Callout format={format} campaign={campaign} description={description} />
			</ExpandingWrapper>)}
		</aside>
)};

export default CalloutForm;
