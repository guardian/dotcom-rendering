import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { palette } from '../palette';
import type { TrailType } from '../types/trails';
import { MiniCard } from './MiniCard';

type Props = {
	trails: TrailType[];
	showImage: boolean;
};

const columnRuleColour = css`
	column-rule: 1px solid ${palette('--article-border')};
`;

const topBorderColour = css`
	border-top: 1px solid ${palette('--card-border-top')};
`;

const ulStyles = css`
	column-gap: 10px;
`;

const liStyles = css`
	padding-top: ${space[1]}px;
	padding-bottom: ${space[3]}px;

	${from.tablet} {
		margin-left: 10px;
		margin-right: 10px;
	}
`;

const textColumns = css`
	column-count: 1;
	${from.tablet} {
		column-count: 3;
	}
	${from.desktop} {
		column-count: 4;
	}
`;

const mediaColumns = css`
	column-count: 1;
	${from.tablet} {
		column-count: 3;
	}
`;

export const NavList = ({ trails, showImage }: Props) => {
	return (
		<ul
			css={[
				ulStyles,
				columnRuleColour,
				showImage ? mediaColumns : textColumns,
			]}
		>
			{trails.map((trail) => (
				<li key={trail.url} css={[liStyles, topBorderColour]}>
					<MiniCard trail={trail} showImage={showImage} />
				</li>
			))}
		</ul>
	);
};
