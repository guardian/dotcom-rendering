import type { Switches } from '@guardian/libs';
import type { ServerSideTests, StageType } from '../types/config';

export interface FEHostedContent {
	// general / shared
	id: string;
	url: string;
	encodedUrl: string;
	campaign?: HostedCampaign;
	title: string;
	mainImageUrl: string;
	thumbnailUrl: string;
	standfirst: string;
	cta: HostedCallToAction;
	name: string;
	owner: string;
	logo: HostedLogo;
	fontColour: Colour;
	// article
	body?: string;
	mainPicture?: string;
	mainPictureCaption?: string;
	// video
	video?: HostedVideo;
	// gallery
	images: HostedGalleryImage[];

	// TODO!
	config: {
		stage: StageType;
		abTests: ServerSideTests;
		serverSideABTests: Record<string, string>;
		switches: Switches;
		frontendAssetsFullURL: string;
		isPaidContent?: boolean;
	};
}

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
