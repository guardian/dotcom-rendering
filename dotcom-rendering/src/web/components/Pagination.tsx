import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { space, textSans, until } from '@guardian/source-foundations';
import {
	Hide,
	LinkButton,
	SvgChevronLeftDouble,
	SvgChevronLeftSingle,
	SvgChevronRightDouble,
	SvgChevronRightSingle,
} from '@guardian/source-react-components';
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

const NavWrapper = ({ children }: { children: React.ReactNode }) => (
	<nav
		// Used to scroll the page to this point when using permalinks
		id="liveblog-navigation"
		css={css`
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding-top: ${space[1]}px;
			padding-bottom: ${space[4]}px;
		`}
	>
		{children}
	</nav>
);

const FlexSection = ({
	hide = false,
	children,
}: {
	hide?: boolean;
	children: React.ReactNode;
}) => (
	<section
		css={css`
			display: flex;
			align-items: center;
			visibility: ${hide ? 'hidden' : 'visible'};
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

const decidePaginationCss = (format: ArticleFormat): SerializedStyles => css`
	color: ${decidePalette(format).text.pagination};
	border: 1px solid ${decidePalette(format).border.pagination};
	:hover {
		border: 1px solid ${decidePalette(format).hover.pagination};
	}
`;

export const Pagination = ({
	currentPage,
	totalPages,
	oldest,
	older,
	newest,
	newer,
	format,
}: Props) => {
	const cssOverrides = decidePaginationCss(format);

	return (
		<NavWrapper>
			<FlexSection hide={currentPage === 1}>
				<Hide above="phablet">
					<LinkButton
						size="small"
						priority="tertiary"
						icon={<SvgChevronLeftDouble />}
						iconSide="left"
						hideLabel={true}
						href={newest}
						cssOverrides={cssOverrides}
					>
						Newest
					</LinkButton>
				</Hide>
				<Hide below="phablet">
					<LinkButton
						size="small"
						priority="tertiary"
						icon={<SvgChevronLeftDouble />}
						iconSide="left"
						href={newest}
						cssOverrides={cssOverrides}
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
					cssOverrides={cssOverrides}
				>
					Previous
				</LinkButton>
			</FlexSection>
			<FlexSection>
				<Position>
					<Bold>{currentPage}</Bold>
					<Of />
					<Bold>{totalPages}</Bold>
				</Position>
			</FlexSection>
			<FlexSection hide={currentPage === totalPages}>
				<LinkButton
					size="small"
					priority="tertiary"
					icon={<SvgChevronRightSingle />}
					hideLabel={true}
					href={older}
					cssOverrides={cssOverrides}
				>
					Next
				</LinkButton>
				<Space />
				<Hide above="phablet">
					<LinkButton
						size="small"
						priority="tertiary"
						icon={<SvgChevronRightDouble />}
						iconSide="right"
						href={oldest}
						hideLabel={true}
						cssOverrides={cssOverrides}
					>
						Oldest
					</LinkButton>
				</Hide>
				<Hide below="phablet">
					<LinkButton
						size="small"
						priority="tertiary"
						icon={<SvgChevronRightDouble />}
						iconSide="right"
						href={oldest}
						cssOverrides={cssOverrides}
					>
						Oldest
					</LinkButton>
				</Hide>
			</FlexSection>
		</NavWrapper>
	);
};
