// ----- Imports ----- //

import type { FC } from 'react';
import { ArticleDisplay, ArticleFormat } from '@guardian/libs';
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

	return <DefaultFooter css={defaultStyles(format)} isCcpa={isCcpa} />
}

// ----- Exports ----- //

export default Footer;
