import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, space, textSans } from '@guardian/source-foundations';
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

/** Used to scroll the page to this point when using permalinks */
const id = 'liveblog-navigation';

const grid = css`
	display: grid;
	grid-template-areas: 'newer position older';
	grid-template-columns: 1fr auto 1fr;
	grid-gap: ${space[2]}px;
	align-items: center;

	padding-top: ${space[1]}px;
	padding-bottom: ${space[4]}px;
`;

const flexSection = css`
	display: flex;
	align-items: center;
	gap: ${space[2]}px;

	${from.phablet} {
		gap: ${space[4]}px;
	}
`;

const bold = css`
	font-weight: bold;
`;

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
		<nav id={id} css={grid}>
			{currentPage !== 1 && (
				<section
					style={{ gridArea: 'newer', justifySelf: 'start' }}
					css={flexSection}
				>
					{!!newest && (
						<>
							<Hide from="phablet">
								<LinkButton
									size="small"
									priority="tertiary"
									icon={<SvgChevronLeftDouble />}
									iconSide="left"
									hideLabel={true}
									// There’s no pagination at the top of the newest page
									href={`${newest}#maincontent`}
									cssOverrides={cssOverrides}
								>
									Newest
								</LinkButton>
							</Hide>
							<Hide until="phablet">
								<LinkButton
									size="small"
									priority="tertiary"
									icon={<SvgChevronLeftDouble />}
									iconSide="left"
									// There’s no pagination at the top of the newest page
									href={`${newest}#maincontent`}
									cssOverrides={cssOverrides}
								>
									Newest
								</LinkButton>
							</Hide>
						</>
					)}
					{!!newer && (
						<LinkButton
							size="small"
							priority="tertiary"
							icon={<SvgChevronLeftSingle />}
							hideLabel={true}
							href={`${newer}#${id}`}
							cssOverrides={cssOverrides}
						>
							Previous
						</LinkButton>
					)}
				</section>
			)}

			<section
				style={{ gridArea: 'position' }}
				css={css`
					${textSans.small()}
				`}
			>
				<strong css={bold}>{currentPage}</strong>
				&nbsp;of&nbsp;
				<strong css={bold}>{totalPages}</strong>
			</section>

			{currentPage !== totalPages && (
				<section
					style={{ gridArea: 'older', justifySelf: 'end' }}
					css={flexSection}
				>
					{!!older && (
						<LinkButton
							size="small"
							priority="tertiary"
							icon={<SvgChevronRightSingle />}
							hideLabel={true}
							href={`${older}#${id}`}
							cssOverrides={cssOverrides}
						>
							Next
						</LinkButton>
					)}
					{!!oldest && (
						<>
							<Hide from="phablet">
								<LinkButton
									size="small"
									priority="tertiary"
									icon={<SvgChevronRightDouble />}
									iconSide="right"
									href={`${oldest}#${id}`}
									hideLabel={true}
									cssOverrides={cssOverrides}
								>
									Oldest
								</LinkButton>
							</Hide>
							<Hide until="phablet">
								<LinkButton
									size="small"
									priority="tertiary"
									icon={<SvgChevronRightDouble />}
									iconSide="right"
									href={`${oldest}#${id}`}
									cssOverrides={cssOverrides}
								>
									Oldest
								</LinkButton>
							</Hide>
						</>
					)}
				</section>
			)}
		</nav>
	);
};
