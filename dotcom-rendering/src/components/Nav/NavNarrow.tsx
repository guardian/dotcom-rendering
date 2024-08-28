import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { grid } from '../../grid';
import { getZIndex } from '../../lib/getZIndex';
import type { NavType } from '../../model/extract-nav';
import { palette } from '../../palette';
import type { DCRArticle } from '../../types/frontend';
import { Masthead } from '../Masthead/Masthead';
import { Nav } from './Nav';

type Props = {
	article: DCRArticle;
	NAV: NavType;
};

const styles = css`
	${getZIndex('headerWrapper')}
	background-color: ${palette('--masthead-nav-background')};
	${grid.container}
`;

const wrapperStyles = css`
	${grid.column.centre}

	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}

	${from.leftCol} {
		${grid.between('left-column-start', 'right-column-end')}
	}
`;

export const NavNarrow = ({ article, ...props }: Props) => {
	const inUpdatedHeaderABTest =
		article.config.abTests.updatedHeaderDesignVariant === 'variant';

	if (inUpdatedHeaderABTest) {
		return (
			<Masthead
				nav={props.NAV}
				editionId={article.editionId}
				idUrl={article.config.idUrl}
				mmaUrl={article.config.mmaUrl}
				discussionApiUrl={article.config.discussionApiUrl}
				idApiUrl={article.config.idApiUrl}
				contributionsServiceUrl={article.contributionsServiceUrl}
				showSubNav={false}
				isImmersive={true}
				hasPageSkin={false}
				hasPageSkinContentSelfConstrain={false}
			/>
		);
	}

	return (
		<nav css={styles}>
			<div css={wrapperStyles}>
				<Nav
					isImmersive={true}
					displayRoundel={true}
					selectedPillar={props.NAV.selectedPillar}
					nav={props.NAV}
					subscribeUrl={
						article.nav.readerRevenueLinks.header.contribute
					}
					editionId={article.editionId}
				/>
			</div>
		</nav>
	);
};
