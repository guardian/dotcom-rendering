import React from 'react';
import { css } from 'emotion';

import { headline, textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';

type Props = {
	href: string;
	title: string;
};
export const ItemListLink = ({ href, title }: Props) => {
	return (
		<>
			<p
				className={css`
					${textSans.small()}
					padding-bottom: ${space[1]}px;
				`}
			>
				Full review:
			</p>
			<a
				className={css`
					${headline.xxxsmall({ fontWeight: 'bold' })}
					text-decoration: none;
					:hover {
						text-decoration: underline;
					}
				`}
				href={href}
			>
				{title}
			</a>
		</>
	);
};
