import { css, Global } from '@emotion/react';

const snapStyles = css`
	overflow-y: hidden;
	position: relative;
`;

type Props = {
	enriched?: DCREnrichedContent;
};

export const Snap = ({ enriched }: Props) => {
	return (
		<div css={snapStyles}>
			{enriched?.embedCss !== undefined && (
				<Global styles={enriched?.embedCss} />
			)}

			{enriched?.embedHtml !== undefined && (
				<div
					dangerouslySetInnerHTML={{ __html: enriched?.embedHtml }}
				/>
			)}

			{enriched?.embedJs !== undefined && (
				<script
					dangerouslySetInnerHTML={{ __html: enriched?.embedJs }}
				/>
			)}
		</div>
	);
};
