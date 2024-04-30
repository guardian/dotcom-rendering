import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	neutral,
	space,
	until,
	textSans15,
} from '@guardian/source-foundations';
import {
	Hide,
	LinkButton,
	SvgChevronLeftDouble,
	SvgChevronLeftSingle,
	SvgChevronRightDouble,
	SvgChevronRightSingle,
} from '@guardian/source-react-components';
import { border, hover, text } from 'palette';
import type { FC, ReactElement, ReactNode } from 'react';
import { darkModeCss } from 'styles';

type Props = {
	currentPage: number;
	totalPages: number;
	newest?: string;
	newer?: string;
	oldest?: string;
	older?: string;
	format: ArticleFormat;
};

const NavWrapper: FC<{ children: ReactNode }> = ({ children }) => (
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

const FlexSection: FC<{
	hide?: boolean;
	children: ReactNode;
}> = ({ hide = false, children }) => (
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

const Bold: FC<{ children: ReactNode }> = ({ children }) => (
	<div
		css={css`
			font-weight: bold;
		`}
	>
		{children}
	</div>
);

const Position: FC<{
	children: ReactNode;
}> = ({ children }) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
			${textSans15}

			${darkModeCss`
				color: ${neutral[60]};
			`}
		`}
	>
		{children}
	</div>
);

const Of = (): ReactElement => <span>&nbsp;of&nbsp;</span>;

const Space = (): ReactElement => (
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
	color: ${text.pagination(format)};
	border: 1px solid ${border.pagination(format)};
	:hover {
		border: 1px solid ${hover.pagination(format)};
	}
`;

const Pagination: FC<Props> = ({
	currentPage,
	totalPages,
	oldest,
	older,
	newest,
	newer,
	format,
}) => {
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
						cssOverrides={decidePaginationCss(format)}
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
						cssOverrides={decidePaginationCss(format)}
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
					cssOverrides={decidePaginationCss(format)}
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
					cssOverrides={decidePaginationCss(format)}
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
						cssOverrides={decidePaginationCss(format)}
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
						cssOverrides={decidePaginationCss(format)}
					>
						Oldest
					</LinkButton>
				</Hide>
			</FlexSection>
		</NavWrapper>
	);
};

export { Pagination };
