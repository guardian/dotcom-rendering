import { SerializedStyles, css } from '@emotion/react';

import { space } from '@guardian/src-foundations';
import { LinkButton } from '@guardian/src-button';
import { textSans } from '@guardian/src-foundations/typography';
import {
	SvgChevronLeftSingle,
	SvgChevronLeftDouble,
	SvgChevronRightDouble,
	SvgChevronRightSingle,
} from '@guardian/src-icons';
import { until } from '@guardian/src-foundations/mq';
import { Hide } from './Hide';
import { decidePalette } from '../lib/decidePalette';

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
			padding-bottom: ${space[3]}px;
		`}
	>
		{children}
	</nav>
);

const Section = ({
	isFirst = false,
	children,
}: {
	isFirst?: boolean;
	children: React.ReactNode;
}) => (
	<section
		css={css`
			display: flex;
			align-items: center;
			visibility: ${isFirst ? 'hidden' : 'visible'};
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

const decidePaginationCss = (palette: Palette): SerializedStyles => {
	return css`
		color: ${palette.text.pagination};
		border: 1px solid ${palette.border.pagination};
		:hover {
			border: 1px solid ${palette.hover.pagination};
		}
	`;
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
	const palette = decidePalette(format);

	return (
		<Container>
			<Section isFirst={currentPage === 1}>
				<Hide when="above" breakpoint="phablet">
					<LinkButton
						size="small"
						priority="tertiary"
						icon={<SvgChevronLeftDouble />}
						iconSide="left"
						hideLabel={true}
						href={newest}
						cssOverrides={decidePaginationCss(palette)}
					>
						Newest
					</LinkButton>
				</Hide>
				<Hide when="below" breakpoint="phablet">
					<LinkButton
						size="small"
						priority="tertiary"
						icon={<SvgChevronLeftDouble />}
						iconSide="left"
						href={newest}
						cssOverrides={decidePaginationCss(palette)}
					>
						Newest
					</LinkButton>
				</Hide>
				<Space />
				<LinkButton
					size="small"
					priority="tertiary"
					icon={<SvgChevronLeftSingle />}
					hideLabel={true}
					href={newer}
					cssOverrides={decidePaginationCss(palette)}
				>
					{/* Label needed for screen readers? */}
					Previous
				</LinkButton>
			</Section>
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
					cssOverrides={decidePaginationCss(palette)}
				>
					Next
				</LinkButton>
				<Space />
				<Hide when="above" breakpoint="phablet">
					<LinkButton
						size="small"
						priority="tertiary"
						icon={<SvgChevronRightDouble />}
						iconSide="right"
						href={oldest}
						hideLabel={true}
						cssOverrides={decidePaginationCss(palette)}
					>
						Oldest
					</LinkButton>
				</Hide>
				<Hide when="below" breakpoint="phablet">
					<LinkButton
						size="small"
						priority="tertiary"
						icon={<SvgChevronRightDouble />}
						iconSide="right"
						href={oldest}
						cssOverrides={decidePaginationCss(palette)}
					>
						Oldest
					</LinkButton>
				</Hide>
			</Section>
		</Container>
	);
};
