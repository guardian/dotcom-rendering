import {
	SvgAudio,
	SvgCamera,
	SvgVideo,
} from '@guardian/source/react-components';
import type { MediaType } from '../types/layout';

export const Icon = ({ mediaType }: { mediaType: MediaType }) => {
	switch (mediaType) {
		case 'Gallery':
			return <SvgCamera />;
		case 'Video':
			return <SvgVideo />;
		case 'Audio':
			return <SvgAudio />;
	}
};
