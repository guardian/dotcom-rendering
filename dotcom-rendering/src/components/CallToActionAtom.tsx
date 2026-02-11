import { css } from '@emotion/react';
import { Button, SvgExternal } from '@guardian/source/react-components';

type Props = {
	ctaLinkURL: string;
	ctaBackgroundImage: string;
	ctaText: string;
	ctaButtonText: string;
	accentColour: string;
};

export const CallToActionAtom = ({
	ctaLinkURL,
	ctaBackgroundImage,
	ctaText,
	ctaButtonText,
	accentColour,
}: Props) => {
	return (
		<div
			css={css`
				background-image: url(${ctaBackgroundImage});
			`}
		>
			<a
				href={ctaLinkURL}
				css={css`
					text-decoration: none;
				`}
			>
				<h2>{ctaText}</h2>
				<Button
					iconSide="right"
					size="small"
					icon={<SvgExternal />}
					cssOverrides={css`
						background-color: ${accentColour};
					`}
				>
					{ctaButtonText}
				</Button>
			</a>
		</div>
	);
};
