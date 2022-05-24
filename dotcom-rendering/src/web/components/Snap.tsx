import { css } from '@emotion/react';

const snapStyles = css`
	overflow-y: hidden;
	position: relative;
`;

type Props = {
	enriched?: DCREnrichedContent;
};

export const Snap = ({ enriched }: Props) => {
	if (enriched?.embedHtml === undefined) {
		return <></>;
	}

	return (
		<div
			css={[
				snapStyles,
				css`
					${enriched?.embedCss}
				`,
			]}
			dangerouslySetInnerHTML={{ __html: enriched?.embedHtml }}
		/>
	);
};
