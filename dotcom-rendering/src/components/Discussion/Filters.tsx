import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import type {
	FilterOptions,
	OrderByType,
	PageSizeType,
	ThreadsType,
} from '../../lib/discussion';
import { palette as schemedPalette } from '../../palette';
import { Dropdown } from './Dropdown';

type Props = {
	filters: FilterOptions;
	onFilterChange: (newFilterObject: FilterOptions) => void;
	topLevelCommentCount: number;
};

const filterBar = css`
	padding-top: ${space[1]}px;
	padding-bottom: ${space[2]}px;

	border-top: 1px solid ${schemedPalette('--discussion-border')};

	display: flex;
	flex-direction: row;
`;

const dividerStyles = css`
	position: relative;
	margin-left: ${space[2]}px;
	:after {
		content: '';
		display: block;
		width: 1px;
		background-color: ${schemedPalette('--discussion-border')};
		position: absolute;
		top: -${space[1]}px;
		bottom: ${space[1]}px;
		left: -${space[2]}px;
	}
`;

const filterPadding = css`
	padding-right: ${space[3]}px;
`;

export const Filters = ({
	filters,
	onFilterChange,
	topLevelCommentCount,
}: Props) => (
	<div id="comment-filters" css={filterBar}>
		<div css={filterPadding}>
			<Dropdown
				id="order-by-dropdown"
				label="Sort by"
				options={[
					{
						title: 'Newest',
						value: 'newest',
						isActive: filters.orderBy === 'newest',
					},
					{
						title: 'Oldest',
						value: 'oldest',
						isActive: filters.orderBy === 'oldest',
					},
					{
						title: 'Recommendations',
						value: 'recommendations',
						isActive: filters.orderBy === 'recommendations',
					},
				]}
				onSelect={(value) =>
					onFilterChange({
						...filters,
						orderBy: value as OrderByType,
					})
				}
			/>
		</div>
		<div css={dividerStyles} />
		<div css={filterPadding}>
			<Dropdown
				id="page-size-dropdown"
				label="Per page"
				options={[
					{
						title: '25',
						value: '25',
						disabled: topLevelCommentCount <= 25,
						isActive: filters.pageSize === 25,
					},
					{
						title: '50',
						value: '50',
						disabled: topLevelCommentCount <= 50,
						isActive: filters.pageSize === 50,
					},
					{
						title: '100',
						value: '100',
						disabled: topLevelCommentCount <= 100,
						isActive: filters.pageSize === 100,
					},
				]}
				onSelect={(value) =>
					onFilterChange({
						...filters,
						pageSize: parseInt(value) as PageSizeType,
					})
				}
			/>
		</div>
		<div css={dividerStyles} />
		<div css={filterPadding}>
			<Dropdown
				id="threads-dropdown"
				label="Display threads"
				options={[
					{
						title: 'Collapsed',
						value: 'collapsed',
						isActive: filters.threads === 'collapsed',
					},
					{
						title: 'Expanded',
						value: 'expanded',
						isActive: filters.threads === 'expanded',
					},
					{
						title: 'Unthreaded',
						value: 'unthreaded',
						isActive: filters.threads === 'unthreaded',
					},
				]}
				onSelect={(value) =>
					onFilterChange({
						...filters,
						threads: value as ThreadsType,
					})
				}
			/>
		</div>
	</div>
);
