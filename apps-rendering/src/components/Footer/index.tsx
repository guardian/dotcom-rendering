// ----- Imports ----- //

import { ArticleDesign, ArticleFormat } from '@guardian/libs';
import { ArticleDisplay } from '@guardian/libs';
import type { FC } from 'react';
import DefaultFooter, { defaultStyles } from './Footer.defaults';
import ImmersiveFooter from './ImmersiveFooter';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	isCcpa: boolean;
}

const Footer: FC<Props> = ({ format, isCcpa }) => {
	if (format.display === ArticleDisplay.Immersive) {
		return <ImmersiveFooter format={format} isCcpa={isCcpa} />;
	}

	switch (format.design) {
		case ArticleDesign.Gallery:
			return <ImmersiveFooter format={format} isCcpa={isCcpa} />;
		default:
			return (
				<DefaultFooter css={defaultStyles(format)} isCcpa={isCcpa} />
			);
	}
};

// ----- Exports ----- //

export default Footer;
