import { css } from '@emotion/react';
import { border, neutral, textSans } from '@guardian/source-foundations';
import { nestedOphanComponents } from '../lib/ophan-helpers.ts';

type Identifier =
	| 'maincontent'
	| 'navigation'
	| 'keyevents'
	| 'key-events-carousel';

type Props = {
	id: Identifier;
	label: string;
};

export const SkipTo = ({ id, label }: Props) => {
	const ophanComponentId = id === 'maincontent' ? 'main content' : id;
	return (
		<a
			href={`#${id}`}
			data-link-name={nestedOphanComponents('skip', ophanComponentId)}
			css={css`
				${textSans.medium()}
				height: 40px;
				top: -40px;
				line-height: 30px;
				overflow: hidden;
				padding: 0;
				position: absolute;
				background: ${neutral[100]};
				display: block;
				text-align: center;
				margin: 0;
				text-decoration: none;
				color: ${neutral[0]};
				&:focus,
				&:active {
					border: 5px solid ${border.focusHalo};
					position: static;
				}
				&:visited,
				&:active {
					color: ${neutral[0]};
				}
			`}
		>
			{label}
		</a>
	);
};
