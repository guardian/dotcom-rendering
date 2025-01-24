import { css } from '@emotion/react';
import { headlineMediumItalic17, space } from '@guardian/source/foundations';
import { palette } from '../palette';

const setterStyles = css`
	${headlineMediumItalic17}
	padding-bottom: ${space[2]}px;
	color: ${palette('--byline')};
	a {
		color: ${palette('--byline-anchor')};
		font-weight: 700;
		text-decoration: none;
		font-style: normal;
		:hover {
			text-decoration: underline;
		}
	}
`;

type Props = {
	setter: string;
	profile: string;
};

export const CrosswordSetter = ({ setter, profile }: Props) => (
	<address
		css={setterStyles}
		data-component="meta-byline"
		data-link-name="byline"
	>
		Set by: <a href={profile}>{setter}</a>
	</address>
);
