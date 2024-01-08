import { css } from '@emotion/react';
import { palette, textSans } from '@guardian/source-foundations';
import { nestedOphanComponents } from '../lib/ophan-helpers';

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
				background: ${palette.neutral[100]};
				display: block;
				text-align: center;
				margin: 0;
				text-decoration: none;
				color: ${palette.neutral[0]};
				&:focus,
				&:active {
					border: 5px solid ${palette.focus[400]};
					position: static;
				}
				&:visited,
				&:active {
					color: ${palette.neutral[0]};
				}
			`}
		>
			{label}
		</a>
	);
};
