import React from 'react';

import { LiveBlock } from '../components/LiveBlock';

type Props = {
	format: Format;
	blocks: Block[];
	adTargeting: AdTargeting;
	host?: string;
	abTests: CAPIType['config']['abTests'];
	pageId: string;
	webTitle: string;
};

export const LiveBlogRenderer = ({
	format,
	blocks,
	adTargeting,
	host,
	abTests,
	pageId,
	webTitle,
}: Props) => {
	return (
		<>
			{blocks.map((block) => {
				return (
					<LiveBlock
						format={format}
						block={block}
						pageId={pageId}
						webTitle={webTitle}
						abTests={abTests}
						adTargeting={adTargeting}
						host={host}
					/>
				);
			})}
		</>
	);
};
