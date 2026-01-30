import type { FEArticle } from './feArticle';

/**
 * This type is what we receive from `frontend`,
 * hence the FE prefix.
 *
 * WARNING: run `gen-schema` task if changing this to update the associated JSON
 * schema definition.
 */
export type FEHostedContent = Omit<
	FEArticle,
	'beaconURL' | 'blocks' | 'crossword'
>;

/**
// Not sure if the following types are needed:

type HostedCampaign = {
	id: string;
	name: string;
	owner: string;
	logo: HostedLogo;
	fontColour: Colour;
};

type HostedCallToAction = {
	url: string;
	image?: string;
	label?: string;
	trackingCode?: string;
	btnText?: string;
};

type HostedLogo = {
	src: string;
	dimensions: {
		width: number;
		height: number;
	};
	link: string;
};

type HostedVideo = {
	mediaId: string;
	title: string;
	duration: number;
	posterUrl: string;
	youtubeId?: string;
	sources: Encoding[];
};

type HostedGalleryImage = {
	url: string;
	width?: number;
	height?: number;
	title: string;
	caption: string;
	credit: string;
};

type Colour = {
	hexCode: string;
};

type Encoding = {
	format: string;
	url: string;
	rawFormat: string;
};

 */
