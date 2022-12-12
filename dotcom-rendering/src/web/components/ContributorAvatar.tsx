import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';

const imageStyles = css`
	height: 9.375rem;

	${from.mobileLandscape} {
		height: 11.25rem;
	}
`;

type Props = {
	imageSrc: string;
	imageAlt: string;
};

export const ContributorAvatar = ({ imageSrc, imageAlt }: Props) => {
	return <img src={imageSrc} alt={imageAlt} css={imageStyles} />;
};
