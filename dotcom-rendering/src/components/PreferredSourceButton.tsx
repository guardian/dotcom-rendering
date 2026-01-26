import { css } from '@emotion/react';
import { from, space, textSans14Object } from '@guardian/source/foundations';
import { LinkButton, SvgGoogleBrand } from '@guardian/source/react-components';
import { palette } from '../palette';

type Props = {
	text: string;
};

export const PreferredSourceButton = ({ text }: Props) => (
	<LinkButton
		priority="tertiary"
		icon={<SvgGoogleBrand />}
		size="small"
		href="https://www.google.com/preferences/source?q=theguardian.com"
		cssOverrides={css({
			...textSans14Object,
			'.src-button-space': {
				flexBasis: space[1],
			},
			svg: {
				flexBasis: 20,
			},
			[from.leftCol]: {
				textWrap: 'wrap',
				height: 'unset',
				padding: '4px 16px 6px',
				'.src-button-space': {
					flexBasis: space[2],
					flexShrink: 0,
				},
			},
		})}
		theme={{
			textTertiary: palette('--preferred-source-button-text'),
			borderTertiary: palette('--preferred-source-button-border'),
			backgroundTertiaryHover: palette('--preferred-source-button-hover'),
		}}
	>
		{text}
	</LinkButton>
);
