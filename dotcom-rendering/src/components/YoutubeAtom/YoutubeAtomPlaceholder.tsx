import { css } from '@emotion/react';

const placeholderStyles = css`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-grow: 1;
	background-color: black;
`;

type Props = {
	uniqueId: string;
};

export const YoutubeAtomPlaceholder = ({ uniqueId }: Props) => {
	const id = `youtube-placeholder-${uniqueId}`;
	return <div data-name={id} data-testid={id} css={placeholderStyles} />;
};
