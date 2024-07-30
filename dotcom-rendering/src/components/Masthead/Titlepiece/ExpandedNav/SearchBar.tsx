import { css } from '@emotion/react';
import { from, space, textSans15 } from '@guardian/source/foundations';
import {
	Button,
	Label,
	SvgArrowRightStraight,
	SvgMagnifyingGlass,
	TextInput,
} from '@guardian/source/react-components';
import { nestedOphanComponents } from '../../../../lib/ophan-helpers';
import { palette as themePalette } from '../../../../palette';

const searchBar = css`
	box-sizing: border-box;
	display: block;
	margin-left: ${space[4]}px;
	max-width: 380px;
	position: relative;
	margin-bottom: 24px;
	margin-right: 41px;
	padding-bottom: 15px;
	${from.desktop} {
		margin: 0;
	}
`;

const searchInput = css`
	${textSans15}
	background-color: ${themePalette('--nav-search-bar-background')};
	border: 0;
	border-radius: 1000px;
	box-sizing: border-box;
	color: ${themePalette('--nav-search-bar-text')};
	height: 36px;
	padding-left: 38px;
	vertical-align: middle;
	width: 100%;
	&::placeholder {
		color: ${themePalette('--nav-search-bar-text')};
	}
	&:focus {
		padding-right: 40px;
		&::placeholder {
			opacity: 0;
		}
	}
	&:focus ~ button {
		background-color: transparent;
		opacity: 1;
		pointer-events: all;
	}
`;

const searchGlass = css`
	position: absolute;
	left: 7px;
	top: 7px;
	fill: ${themePalette('--nav-search-bar-icon')};
`;

const searchSubmit = css`
	background: transparent;
	border: 0;
	bottom: 0;
	cursor: pointer;
	display: block;
	opacity: 0;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
	width: 50px;
	fill: ${themePalette('--nav-search-bar-icon')};
	&:focus,
	&:active {
		opacity: 0;
		pointer-events: all;
	}
	&:before {
		height: 12px;
		top: ${space[3]}px;
		width: 12px;
	}
	&:after {
		border-right: 0;
		top: 17px;
		width: 20px;
	}
`;

export const SearchBar = () => {
	const searchId = 'gu-search';
	return (
		<form css={searchBar} action="https://www.google.co.uk/search">
			<TextInput
				hideLabel={true}
				label="Search input"
				cssOverrides={searchInput}
				name="q" // query param sent to google
				placeholder="Search the Guardian"
				data-link-name={nestedOphanComponents('header', 'search')}
				className="selectableMenuItem"
				tabIndex={-1}
				id={searchId}
			/>

			<Label hideLabel={true} text="google-search" htmlFor={searchId}>
				<div css={searchGlass}>
					<SvgMagnifyingGlass
						isAnnouncedByScreenReader={true}
						size="medium"
					/>
				</div>
			</Label>
			<Button
				icon={
					<SvgArrowRightStraight
						isAnnouncedByScreenReader={false}
						size="medium"
					/>
				}
				aria-label="Search with Google"
				cssOverrides={searchSubmit}
				data-link-name={nestedOphanComponents(
					'header',
					'search',
					'submit',
				)}
				type="submit"
				tabIndex={-1}
			></Button>
			<input
				type="hidden"
				name="as_sitesearch"
				value="www.theguardian.com"
			/>
		</form>
	);
};
