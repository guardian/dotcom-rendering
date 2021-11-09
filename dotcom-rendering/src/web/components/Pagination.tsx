import { SerializedStyles, css } from '@emotion/react';

import {
	space,
	news,
	culture,
	lifestyle,
	sport,
	opinion,
	labs,
	specialReport,
} from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { LinkButton } from '@guardian/src-button';
import { textSans } from '@guardian/src-foundations/typography';
import {
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/src-icons';
import { until } from '@guardian/src-foundations/mq';
import { ArticlePillar, ArticleSpecial } from '@guardian/libs';
import { Hide } from './Hide';

type Props = {
	currentPage: number;
	totalPages: number;
	newest?: string;
	newer?: string;
	oldest?: string;
	older?: string;
	format: ArticleFormat;
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<nav
		// Used to scroll the page to this point when using permalinks
		id="liveblog-navigation"
		css={css`
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		`}
	>
		{children}
	</nav>
);

const Section = ({ children }: { children: React.ReactNode }) => (
	<section
		css={css`
			display: flex;
			align-items: center;
		`}
	>
		{children}
	</section>
);

const Bold = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			font-weight: bold;
		`}
	>
		{children}
	</div>
);

const Position = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
			${textSans.small()}
		`}
	>
		{children}
	</div>
);

const Of = () => <span>&nbsp;of&nbsp;</span>;

const Space = () => (
	<div
		css={css`
			${until.phablet} {
				width: ${space[2]}px;
			}
			width: ${space[4]}px;
		`}
	/>
);

const decidePaginationCss = (format: ArticleFormat): SerializedStyles => {
	switch (format.theme) {
		case ArticlePillar.News:
			return css`
				color: ${news[300]};
				border: 1px solid ${neutral[86]};
				:hover {
					border: 1px solid ${news[300]};
				}
			`;
		case ArticlePillar.Culture:
			return css`
				color: ${culture[300]};
				border: 1px solid ${neutral[86]};
				:hover {
					border: 1px solid ${culture[300]};
				}
			`;
		case ArticlePillar.Lifestyle:
			return css`
				color: ${lifestyle[300]};
				border: 1px solid ${neutral[86]};
				:hover {
					border: 1px solid ${lifestyle[300]};
				}
			`;
		case ArticlePillar.Sport:
			return css`
				color: ${sport[300]};
				border: 1px solid ${neutral[86]};
				:hover {
					border: 1px solid ${sport[300]};
				}
			`;
		case ArticlePillar.Opinion:
			return css`
				color: ${opinion[300]};
				border: 1px solid ${neutral[86]};
				:hover {
					border: 1px solid ${opinion[300]};
				}
			`;
		case ArticleSpecial.Labs:
			return css`
				color: ${labs[300]};
				border: 1px solid ${neutral[86]};
				:hover {
					border: 1px solid ${labs[300]};
				}
			`;
		case ArticleSpecial.SpecialReport:
			return css`
				color: ${specialReport[300]};
				border: 1px solid ${neutral[86]};
				:hover {
					border: 1px solid ${specialReport[300]};
				}
			`;
	}
};

export const Pagination = ({
	currentPage,
	totalPages,
	oldest,
	older,
	newest,
	newer,
	format,
}: Props) => {
	return (
		<Container>
			{currentPage !== 1 && (
				<Section>
					<LinkButton
						size="small"
						priority="tertiary"
						icon={<SvgChevronLeftSingle />}
						iconSide="left"
						href={newest}
						cssOverrides={decidePaginationCss(format)}
					>
						<Hide when="below" breakpoint="phablet">
							Newest
						</Hide>
					</LinkButton>
					<Space />
					<LinkButton
						size="small"
						priority="tertiary"
						icon={<SvgChevronLeftSingle />}
						hideLabel={true}
						href={newer}
						cssOverrides={decidePaginationCss(format)}
					>
						<Hide when="below" breakpoint="phablet">
							Previous
						</Hide>
					</LinkButton>
				</Section>
			)}
			<Section>
				<Position>
					<Bold>{currentPage}</Bold>
					<Of />
					<Bold>{totalPages}</Bold>
				</Position>
			</Section>
			<Section>
				<LinkButton
					size="small"
					priority="tertiary"
					icon={<SvgChevronRightSingle />}
					hideLabel={true}
					href={older}
					cssOverrides={decidePaginationCss(format)}
				>
					<Hide when="below" breakpoint="phablet">
						Next
					</Hide>
				</LinkButton>
				<Space />
				<LinkButton
					size="small"
					priority="tertiary"
					icon={<SvgChevronRightSingle />}
					iconSide="right"
					href={oldest}
					cssOverrides={decidePaginationCss(format)}
				>
					<Hide when="below" breakpoint="phablet">
						Oldest
					</Hide>
				</LinkButton>
			</Section>
		</Container>
	);
};
