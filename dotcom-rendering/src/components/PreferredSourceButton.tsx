import { css } from '@emotion/react';
import {
	from,
	space,
	textSans12Object,
	textSans14Object,
} from '@guardian/source/foundations';
import { LinkButton, SvgGoogleBrand } from '@guardian/source/react-components';
import { palette } from '../palette';

export const PreferredSourceButton = () => (
	<LinkButton
		priority="tertiary"
		icon={<SvgGoogleBrand />}
		size="small"
		href="https://www.google.com/preferences/source?q=theguardian.com"
		data-component={`preferred-source-button-prefer`}
		data-link-name={`preferred-source-button-prefer`}
		cssOverrides={css({
			...textSans14Object,
			padding: '8px 12px 10px',
			transitionProperty: 'background-color',
			'.src-button-space': {
				flexBasis: space[1],
			},
			svg: {
				flexBasis: 20,
			},
			[from.leftCol]: {
				...textSans12Object,
				textWrap: 'wrap',
				height: 'unset',
				padding: '4px 8px 6px 6px',
				'.src-button-space': {
					flexBasis: 2,
					flexShrink: 0,
				},
			},
			[from.wide]: {
				padding: '10px 12px',
				height: 36,
				'.src-button-space': {
					flexBasis: space[2],
				},
			},
		})}
		theme={{
			textTertiary: palette('--preferred-source-button-text'),
			borderTertiary: palette('--preferred-source-button-border'),
			backgroundTertiaryHover: palette('--preferred-source-button-hover'),
		}}
	>
		{'Prefer the Guardian on Google'}
	</LinkButton>
);
