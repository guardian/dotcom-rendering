import React from 'react';
import { css } from '@emotion/react';

const imageStyles = css`
	height: 11.25rem;
`;

export const ContributorAvatar: React.FC<{
	imageSrc: string;
	imageAlt: string;
}> = ({ imageSrc, imageAlt }) => {
	return <img src={imageSrc} alt={imageAlt} css={imageStyles} />;
};
