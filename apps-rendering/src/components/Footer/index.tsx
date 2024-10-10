// ----- Imports ----- //

import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
} from '../../articleFormat';
import DefaultFooter, { defaultStyles } from './Footer.defaults';
import GalleryFooter from './GalleryFooter';
import ImmersiveFooter from './ImmersiveFooter';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	isCcpa: boolean;
}

const Footer = ({ format, isCcpa }: Props) => {
	if (format.display === ArticleDisplay.Immersive) {
		return <ImmersiveFooter format={format} isCcpa={isCcpa} />;
	}

	switch (format.design) {
		case ArticleDesign.Gallery:
			return <GalleryFooter format={format} isCcpa={isCcpa} />;
		default:
			return (
				<DefaultFooter css={defaultStyles(format)} isCcpa={isCcpa} />
			);
	}
};

// ----- Exports ----- //

export default Footer;
