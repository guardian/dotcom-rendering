import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { palette as schemedPalette } from '../../palette';
import { Summary } from './Summary';

const containerStyling = css`
	display: block;
	position: relative;
`;

export const detailStyling: SerializedStyles = css`
	margin: 16px 0 36px;
	background: ${schemedPalette('--expanding-atom-background')};
	color: inherit;
	padding: 0 5px 6px;
	border-image: repeating-linear-gradient(
			to bottom,
			${schemedPalette('--expanding-atom-border')},
			${schemedPalette('--expanding-atom-border')} 1px,
			transparent 1px,
			transparent 4px
		)
		13;
	border-top: 13px solid black;
	position: relative;
	summary {
		list-style: none;
		margin: 0 0 16px;
	}

	/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#Customizing_the_disclosure_widget */
	summary::-webkit-details-marker {
		display: none;
	}

	summary:focus {
		outline: none;
	}
`;

export const Container = ({
	id,
	title,
	children,
	format,
	expandForStorybook,
	atomType,
	atomTypeTitle,
	expandCallback,
}: {
	id: string;
	title: string;
	format: ArticleFormat;
	expandForStorybook?: boolean;
	atomType: string;
	atomTypeTitle: string;
	children: React.ReactNode;
	expandCallback: () => void;
}): JSX.Element => (
	<div css={containerStyling} data-atom-id={id} data-atom-type={atomType}>
		<details
			css={detailStyling}
			data-atom-id={id}
			data-snippet-type={atomType}
			open={expandForStorybook}
		>
			<Summary
				sectionTitle={atomTypeTitle}
				format={format}
				title={title}
				expandCallback={expandCallback}
			/>
			{children}
		</details>
	</div>
);
