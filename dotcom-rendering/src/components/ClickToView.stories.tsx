import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { textSans } from '@guardian/source-foundations';
import type {
	DocumentBlockElement,
	EmbedBlockElement,
	InstagramBlockElement,
	MapBlockElement,
	RoleType,
	SoundcloudBlockElement,
	SpotifyBlockElement,
	TweetBlockElement,
	VideoVimeoBlockElement,
	VineBlockElement,
} from '../types/content';
import { ClickToView } from './ClickToView';
import { DocumentBlockComponent } from './DocumentBlockComponent.importable';
import { EmbedBlockComponent } from './EmbedBlockComponent.importable';
import { Figure } from './Figure';
import { InstagramBlockComponent } from './InstagramBlockComponent.importable';
import { MapEmbedBlockComponent } from './MapEmbedBlockComponent.importable';
import { Section } from './Section';
import { SoundcloudBlockComponent } from './SoundcloudBlockComponent';
import { SpotifyBlockComponent } from './SpotifyBlockComponent.importable';
import { TweetBlockComponent } from './TweetBlockComponent.importable';
import { UnsafeEmbedBlockComponent } from './UnsafeEmbedBlockComponent.importable';
import { VimeoBlockComponent } from './VimeoBlockComponent';
import { VineBlockComponent } from './VineBlockComponent.importable';

export default {
	component: ClickToView,
	title: 'Components/ClickToView',
};

const paragraphStyle = css`
	${textSans.medium()};
	font-weight: 300;
	margin-top: 0;
	margin-bottom: 8px;
`;

const RoleStory = ({
	children,
	role,
}: {
	children: React.ReactNode;
	role: RoleType;
}) => {
	return (
		<Section
			showTopBorder={false}
			title="Click To View"
			centralBorder="full"
		>
			<div
				css={css`
					max-width: 620px;
					clear: left;
					strong {
						font-weight: bold;
					}
				`}
			>
				<p css={paragraphStyle}>
					Lo-fi scenester ethical readymade. Hoodie marfa palo santo
					fixie hot chicken art party hell of thundercats skateboard
					synth. Skateboard thundercats hoodie pitchfork neutra
					pinterest kitsch literally polaroid irony mumblecore next
					level. Truffaut street art edison bulb, banh mi cliche
					post-ironic mixtape
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role={role}
				>
					<ClickToView
						role={role}
						isTracking={true}
						source="A Thirdparty Provider"
						sourceDomain="thirdparty.com"
						onAccept={() => {}}
					>
						{children}
					</ClickToView>
				</Figure>
				<p css={paragraphStyle}>
					Truffaut deep v before they sold out shoreditch. Enamel pin
					venmo gochujang shaman +1 try-hard keffiyeh freegan godard
					air plant humblebrag brooklyn meggings.
				</p>
				<p css={paragraphStyle}>
					Lo-fi scenester ethical readymade. Hoodie marfa palo santo
					fixie hot chicken art party hell of thundercats skateboard
					synth. Skateboard thundercats hoodie pitchfork neutra
					pinterest kitsch literally polaroid irony mumblecore next
					level. Truffaut street art edison bulb, banh mi cliche
					post-ironic mixtape
				</p>
				<p css={paragraphStyle}>
					Lo-fi scenester ethical readymade. Hoodie marfa palo santo
					fixie hot chicken art party hell of thundercats skateboard
					synth. Skateboard thundercats hoodie pitchfork neutra
					pinterest kitsch literally polaroid irony mumblecore next
					level. Truffaut street art edison bulb, banh mi cliche
					post-ironic mixtape
				</p>
				<p css={paragraphStyle}>
					Lo-fi scenester ethical readymade. Hoodie marfa palo santo
					fixie hot chicken art party hell of thundercats skateboard
					synth. Skateboard thundercats hoodie pitchfork neutra
					pinterest kitsch literally polaroid irony mumblecore next
					level. Truffaut street art edison bulb, banh mi cliche
					post-ironic mixtape
				</p>
			</div>
		</Section>
	);
};

export const InlineStory = () => {
	return (
		<RoleStory role="inline">
			<img
				src="http://placekitten.com/g/620/400"
				width="620"
				height="400"
				alt=""
			/>
		</RoleStory>
	);
};
InlineStory.storyName = "Click to view in 'inline' role";

export const SupportingStory = () => {
	return (
		<RoleStory role="supporting">
			<img
				src="http://placekitten.com/g/380/300"
				width="380"
				height="300"
				alt=""
			/>
		</RoleStory>
	);
};
SupportingStory.storyName = "Click to view in 'supporting' role";

export const ShowcaseStory = () => {
	return (
		<RoleStory role="showcase">
			<img
				src="http://placekitten.com/g/860/560"
				width="860"
				height="560"
				alt=""
			/>
		</RoleStory>
	);
};
ShowcaseStory.storyName = "Click to view in 'showcase' role";

export const HalfWidthStory = () => {
	return (
		<RoleStory role="halfWidth">
			<img
				src="http://placekitten.com/g/860/560"
				width="310"
				height="200"
				alt=""
			/>
		</RoleStory>
	);
};
HalfWidthStory.storyName = "Click to view in 'halfWidth' role";

export const ThumbnailStory = () => {
	return (
		<RoleStory role="thumbnail">
			<img
				src="http://placekitten.com/g/140/105"
				width="140"
				height="105"
				alt=""
			/>
		</RoleStory>
	);
};
ThumbnailStory.storyName = "Click to view in 'thumbnail' role";

const Inline: RoleType = 'inline';

const instagramEmbedEmbed: EmbedBlockElement = {
	elementId: 'mockId',
	source: 'Instagram',
	sourceDomain: 'instagram.com',
	height: undefined,
	width: undefined,
	isThirdPartyTracking: true,
	safe: false,
	alt: 'Idris Elba wedding',
	_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	html: '<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/BwwONCplEyj/" data-instgrm-version="12" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/BwwONCplEyj/" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div></a> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/BwwONCplEyj/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">Congratulations to newlyweds #IdrisElba and #SabrinaDhowre who exchanged vows in Morocco on April 26 2019. Celebrations were spread over three days in Marrakech. See more in the world exclusive in the July 2019 issue of #BritishVogue. Photographed by @SeanThomas_Photo.</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by <a href="https://www.instagram.com/britishvogue/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank"> British Vogue</a> (@britishvogue) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2019-04-27T09:10:49+00:00">Apr 27, 2019 at 2:10am PDT</time></p></div></blockquote> <script async src="//www.instagram.com/embed.js"></script>',
	isMandatory: false,
};

const instagramInstramEmbed: InstagramBlockElement = {
	isThirdPartyTracking: true,
	_type: 'model.dotcomrendering.pageElements.InstagramBlockElement',
	html: '<blockquote class="instagram-media" data-instgrm-version="7" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/BYJLF9SnA7I/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Taylor Swift (@taylorswift)</a> on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2017-08-23T16:39:48+00:00">Aug 23, 2017 at 9:39am PDT</time></p></div></blockquote>\n<script async defer src="//platform.instagram.com/en_US/embeds.js"></script>',
	elementId: 'mockId',
	source: 'Instagram',
	sourceDomain: 'platform.instagram.com',
	url: 'https://www.instagram.com/p/BYJLF9SnA7I/',
	hasCaption: true,
};

const formStackEmbed: EmbedBlockElement = {
	elementId: 'mockId',
	source: 'Formstack',
	sourceDomain: 'formstack.com',
	height: undefined,
	width: undefined,
	isThirdPartyTracking: true,
	safe: false,
	alt: 'Book clinic form',
	_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	html: '<script type="text/javascript" src="https://guardiannewsandmedia.formstack.com/forms/js.php/observer_book_clinic"></script>',
	isMandatory: true,
};

const facebookEmbed: EmbedBlockElement = {
	elementId: 'mockId',
	source: 'Facebook',
	sourceDomain: 'facebook.com',
	height: 221,
	width: 500,
	isThirdPartyTracking: true,
	safe: true,
	alt: 'Facebook post',
	_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	html: '<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmaureen.shrimpton%2Fposts%2F2165642433537707&width=500" width="500" height="211" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>',
	isMandatory: false,
};

const vimeoEmbedEmbed: EmbedBlockElement = {
	elementId: 'mockId',
	source: 'Vimeo',
	sourceDomain: 'vimeo.com',
	isThirdPartyTracking: false,
	safe: true,
	alt: 'the documentary Injustice',
	_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	html: '<iframe src="https://player.vimeo.com/video/34633260?dnt=true" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>',
	isMandatory: false,
};

const vimeoVideoEmbed: VideoVimeoBlockElement = {
	elementId: 'mockId',
	source: 'Vimeo',
	sourceDomain: 'vimeo.com',
	embedUrl: 'https://player.vimeo.com/video/21693673?app_id=122963&dnt=true',
	role: 'inline',
	isThirdPartyTracking: false,
	width: 460,
	_type: 'model.dotcomrendering.pageElements.VideoVimeoBlockElement',
	caption: 'How many beers is that?',
	originalUrl: 'https://vimeo.com/21693673',
	url: 'https://vimeo.com/21693673',
	height: 259,
	credit: undefined,
	title: undefined,
};

const scribdDocumentEmbed: DocumentBlockElement = {
	elementId: 'mockId',
	source: 'Scribd',
	sourceDomain: 'scribd.com',
	embedUrl: 'https://www.scribd.com/embeds/469886680/content',
	isThirdPartyTracking: true,
	width: 613,
	_type: 'model.dotcomrendering.pageElements.DocumentBlockElement',
	title: 'Russia Report',
	height: 460,
};

const scribdEmbedEmbed: EmbedBlockElement = {
	elementId: 'mockId',
	source: 'Scribd',
	sourceDomain: 'scribd.com',
	isThirdPartyTracking: true,
	safe: false,
	alt: 'Letter',
	_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	html: '<p  style=" margin: 12px auto 6px auto; font-family: Helvetica,Arial,Sans-serif; font-style: normal; font-variant: normal; font-weight: normal; font-size: 14px; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; display: block;"> <a title="View Climate Change Letter UN on Scribd" href="https://www.scribd.com/document/482633239/Climate-Change-Letter-UN#from_embed"  style="text-decoration: underline;" >Climate Change Letter UN</a> by <a title="View The Guardian\'s profile on Scribd" href="https://www.scribd.com/user/17081734/The-Guardian#from_embed"  style="text-decoration: underline;" >The Guardian</a> on Scribd</p><iframe class="scribd_iframe_embed" title="Climate Change Letter UN" src="https://www.scribd.com/embeds/482633239/content?start_page=1&view_mode=scroll&access_key=key-u8wwc0Osw6NCcbfolTy0" data-auto-height="false" data-aspect-ratio="0.7080062794348508" scrolling="no" id="doc_24425" width="100%" height="600" frameborder="0"></iframe>',
	isMandatory: false,
};

const tiktokEmbedEmbed: EmbedBlockElement = {
	elementId: 'mockId',
	source: 'TikTok',
	sourceDomain: 'tiktok.com',
	isThirdPartyTracking: true,
	safe: false,
	alt: 'Everything is cake on TikTok',
	_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	html: '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@danbanbam/video/6849106362224413958" data-video-id="6849106362224413958" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@danbanbam" href="https://www.tiktok.com/@danbanbam">@danbanbam</a> <p>Cake: The Movie. Coming this Fall. <a title="cake" target="_blank" href="https://www.tiktok.com/tag/cake">##cake</a> <a title="serve" target="_blank" href="https://www.tiktok.com/tag/serve">##serve</a> <a title="vibezone" target="_blank" href="https://www.tiktok.com/tag/vibezone">##VibeZone</a> <a title="movie" target="_blank" href="https://www.tiktok.com/tag/movie">##movie</a></p> <a target="_blank" title="♬ original sound - Daniel Spencer" href="https://www.tiktok.com/music/original-sound-6849097596150303493">♬ original sound - Daniel Spencer</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>',
	isMandatory: false,
};

const soundcloudAudioEmbed: SoundcloudBlockElement = {
	elementId: 'mockId',
	source: 'Soundcloud',
	sourceDomain: 'soundcloud.com',
	isTrack: true,
	isThirdPartyTracking: true,
	_type: 'model.dotcomrendering.pageElements.SoundcloudBlockElement',
	html: '\n            <iframe\n                height="460"\n                width="460"\n                src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F875169979&show_artwork=true"\n                frameborder="0"\n                allowfullscreen\n            ></iframe>\n        ',
	id: '875169979',
	isMandatory: true,
};

const soundcloudEmbedEmbed: SoundcloudBlockElement = {
	elementId: 'mockId',
	source: 'Soundcloud',
	sourceDomain: 'soundcloud.com',
	isTrack: true,
	isThirdPartyTracking: true,
	_type: 'model.dotcomrendering.pageElements.SoundcloudBlockElement',
	html: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/881588431&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/planetmurecords" title="Planet Mu Records" target="_blank" style="color: #cccccc; text-decoration: none;">Planet Mu Records</a> · <a href="https://soundcloud.com/planetmurecords/john-frusciante-amethblowl-timesig" title="John Frusciante - Amethblowl (TIMESIG011)" target="_blank" style="color: #cccccc; text-decoration: none;">John Frusciante - Amethblowl (TIMESIG011)</a></div>',
	id: '881588431',
	isMandatory: false,
};

const youtubeEmbedEmbed: EmbedBlockElement = {
	elementId: 'mockId',
	source: 'Youtube',
	sourceDomain: 'youtube.com',
	height: 315,
	width: undefined,
	isThirdPartyTracking: false,
	safe: true,
	alt: 'Watch the video for Sleaford Mods’ Second',
	_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	html: '<iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/IT09DGuXwYQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
	isMandatory: false,
};

const spotifyAudioEmbed: SpotifyBlockElement = {
	elementId: 'mockId',
	source: 'Spotify',
	sourceDomain: 'spotify.com',
	embedUrl:
		'https://embed.spotify.com/?uri=spotify:user:matthew.holmes.guardian:playlist:6UQ1JOduKGyS46SThaxy0B',
	isThirdPartyTracking: true,
	width: 300,
	_type: 'model.dotcomrendering.pageElements.SpotifyBlockElement',
	caption: 'Listen to the list on Spotify.',
	title: "Fuel RR playlist: 'love is...', a playlist by matthew.holmes.guardian on Spotify",
	height: 380,
};

const spotifyEmbedEmbed: EmbedBlockElement = {
	elementId: 'mockId',
	source: 'Spotify',
	sourceDomain: 'spotify.com',
	height: 380,
	width: 300,
	isThirdPartyTracking: true,
	safe: true,
	alt: 'Joy Division Ranked Spotify Playlist',
	_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	html: '<iframe src="https://embed.spotify.com/?uri=spotify%3Auser%3Aguardianmusic%3Aplaylist%3A1XUwszj7DC0uRY5L7Anj6I" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>',
	isMandatory: true,
};

const bandcampEmbedEmbed: EmbedBlockElement = {
	elementId: 'mockId',
	source: 'Bandcamp',
	sourceDomain: 'bandcamp.com',
	height: undefined,
	width: undefined,
	isThirdPartyTracking: true,
	safe: true,
	alt: 'Isaac by Jonny and the Baptists',
	_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	html: '<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=1077257657/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=2222104579/transparent=true/" seamless><a href="https://jonnyandthebaptists.bandcamp.com/album/love-you-hate-bastards">Love You &amp; Hate Bastards by Jonny &amp; The Baptists</a></iframe>',
	isMandatory: true,
};

const twitterTweetEmbed: TweetBlockElement = {
	elementId: 'mockId',
	source: 'Twitter',
	sourceDomain: 'twitter.com',
	role: Inline,
	isThirdPartyTracking: false,
	_type: 'model.dotcomrendering.pageElements.TweetBlockElement',
	html: '<blockquote class="nojs-tweet"><p lang="en" dir="ltr">A staff member at MSNBC has died of coronavirus. It’s hitting them pretty hard as you can see from <a href="https://twitter.com/maddow?ref_src=twsrc%5Etfw">@maddow</a>’s sign-off today <a href="https://t.co/nbqRRaammr">pic.twitter.com/nbqRRaammr</a></p>&mdash; Matt Bevan 🎙 (@MatthewBevan) <a href="https://twitter.com/MatthewBevan/status/1241244758653071360?ref_src=twsrc%5Etfw">March 21, 2020</a></blockquote>\n',
	hasMedia: false,
	id: '1241244758653071360',
	url: 'https://twitter.com/MatthewBevan/status/1241244758653071360',
};

const twitterEmbedEmbed: EmbedBlockElement = {
	elementId: 'mockId',
	source: 'Twitter',
	sourceDomain: 'twitter.com',
	height: undefined,
	width: undefined,
	isThirdPartyTracking: false,
	safe: false,
	alt: 'Video: social distancing',
	_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	html: '<blockquote class="nojs-tweet"><p lang="en" dir="ltr">Confused about the difference between self-isolation and social distancing - and who should do it? 🤷🏻‍♀️ Watch this as <a href="https://twitter.com/robosborneitv?ref_src=twsrc%5Etfw">@robosborneitv</a> explains, with the help of his mum, and <a href="https://twitter.com/ckkhaira?ref_src=twsrc%5Etfw">@ckkhaira</a> <a href="https://t.co/SNzpDRFxsz">https://t.co/SNzpDRFxsz</a> <a href="https://twitter.com/hashtag/coronavirus?src=hash&amp;ref_src=twsrc%5Etfw">#coronavirus</a> <a href="https://twitter.com/hashtag/covid19?src=hash&amp;ref_src=twsrc%5Etfw">#covid19</a> <a href="https://t.co/wC6ezmAqRC">pic.twitter.com/wC6ezmAqRC</a></p>&mdash; ITV Wales News (@ITVWales) <a href="https://twitter.com/ITVWales/status/1241068501076410376?ref_src=twsrc%5Etfw">March 20, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
	isMandatory: false,
};

const ourworldindataEmbedEmbed = {
	source: undefined,
	sourceDomain: 'ourworldindata.com',
	height: undefined,
	width: undefined,
	isThirdPartyTracking: true,
	safe: true,
	alt: 'Our World in Data',
	_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	html: '<iframe src="https://ourworldindata.org/grapher/daily-covid-deaths-3-day-average" style="width: 100%; height: 600px; border: 0px none;"></iframe>',
	isMandatory: false,
};

const bbcEmbedEmbed: EmbedBlockElement = {
	elementId: 'mockId',
	source: 'BBC',
	sourceDomain: 'bbc.co.uk',
	height: 500,
	width: undefined,
	isThirdPartyTracking: true,
	safe: true,
	alt: 'Watch a trailer for Enslaved',
	_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	html: '<iframe width="fullwidth" height="500" frameborder="0" src="https://www.bbc.co.uk/programmes/p08tfnfb/player"></iframe>',
	isMandatory: false,
};

const mapEmbedEmbed: MapBlockElement = {
	_type: 'model.dotcomrendering.pageElements.MapBlockElement',
	elementId: 'mockId',
	embedUrl:
		'https://www.google.com/maps/d/embed?mid=1e_aGDEcGY9Lu3UMKQKhR-itRBDg&hl=en_US',
	originalUrl:
		'https://www.google.com/maps/d/embed?mid=1e_aGDEcGY9Lu3UMKQKhR-itRBDg&hl=en_US',
	title: "Women's March on London",
	height: 345,
	width: 460,
	caption: 'Google Maps',
	source: 'Google',
	sourceDomain: 'google.com',
	isThirdPartyTracking: false,
};

const vineEmbedEmbed: VineBlockElement = {
	_type: 'model.dotcomrendering.pageElements.VineBlockElement',
	elementId: 'mockId',
	url: 'https://vine.co/v/MIH3hdTKujE/embed/simple',
	originalUrl: 'https://vine.co/v/MIH3hdTKujE',
	title: 'Joe Hart Wants The Ball',
	height: 600,
	width: 600,
	source: 'Vine',
	sourceDomain: 'vine.co',
	isThirdPartyTracking: false,
};

export const EmbedBlockComponentStory = () => {
	return (
		<Section
			showTopBorder={false}
			title="Embedded Content"
			centralBorder="full"
		>
			<div
				css={css`
					max-width: 620px;
					clear: left;
					strong {
						font-weight: bold;
					}
				`}
			>
				<p css={paragraphStyle}>
					Example of a facebook post embed, the source article is{' '}
					<a href="https://www.theguardian.com/uk-news/2019/aug/16/police-officers-death-sparks-sweeping-inquiry">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<EmbedBlockComponent
						key={1}
						html={facebookEmbed.html}
						caption={facebookEmbed.caption}
						isTracking={true}
						source={facebookEmbed.source}
						sourceDomain={facebookEmbed.sourceDomain}
						role="inline"
					/>
				</Figure>
				<p css={paragraphStyle}>
					Example of a vimeo embed from &apos;embed&apos; element
					type, the source article is{' '}
					<a href="https://www.theguardian.com/film/2020/oct/12/ultraviolence-ken-fero-documentary-injustice-deaths-police">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<EmbedBlockComponent
						key={1}
						html={vimeoEmbedEmbed.html}
						caption={vimeoEmbedEmbed.caption}
						isTracking={true}
						source={vimeoEmbedEmbed.source}
						sourceDomain={vimeoEmbedEmbed.sourceDomain}
						role="inline"
					/>
				</Figure>
				<p css={paragraphStyle}>
					Example of a youtube embed from an &apos;embed&apos; element
					type, the embed source article is{' '}
					<a href="https://www.theguardian.com/music/2020/may/17/sleaford-mods-all-that-glue-review-scattergun-fury">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<EmbedBlockComponent
						key={1}
						html={youtubeEmbedEmbed.html}
						caption={youtubeEmbedEmbed.caption}
						isTracking={true}
						source={youtubeEmbedEmbed.source}
						sourceDomain={youtubeEmbedEmbed.sourceDomain}
						role="inline"
					/>
				</Figure>
				<p css={paragraphStyle}>
					Example of a spotify embed from an &apos;embed&apos; element
					type, the embed source article is{' '}
					<a href="https://www.theguardian.com/film/2020/oct/29/david-bowie-biopic-trailer-stardust">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<EmbedBlockComponent
						key={1}
						html={spotifyEmbedEmbed.html}
						caption={spotifyEmbedEmbed.caption}
						isTracking={true}
						source={spotifyEmbedEmbed.source}
						sourceDomain={spotifyEmbedEmbed.sourceDomain}
						role="inline"
					/>
				</Figure>
				<p css={paragraphStyle}>
					Example of a bandcamp embed from an &apos;embed&apos;
					element type, the embed source article is{' '}
					<a href="https://www.theguardian.com/culture/2020/oct/29/alice-fraser-the-10-funniest-things-i-have-ever-seen-on-the-internet">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<EmbedBlockComponent
						key={1}
						html={bandcampEmbedEmbed.html}
						caption={bandcampEmbedEmbed.caption}
						isTracking={true}
						source={bandcampEmbedEmbed.source}
						sourceDomain={bandcampEmbedEmbed.sourceDomain}
						role="inline"
					/>
				</Figure>
				<p css={paragraphStyle}>
					Example of a Our World In Data embed from an
					&apos;embed&apos; element type, the embed source article is{' '}
					<a href="https://www.theguardian.com/world/2020/apr/12/coronavirus-statistics-what-can-we-trust-and-what-should-we-ignore">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<EmbedBlockComponent
						key={1}
						html={ourworldindataEmbedEmbed.html}
						caption={ourworldindataEmbedEmbed.alt}
						isTracking={true}
						source={ourworldindataEmbedEmbed.source}
						sourceDomain={ourworldindataEmbedEmbed.sourceDomain}
						role="inline"
					/>
				</Figure>
				<p css={paragraphStyle}>
					Example of a BBC embed from an &apos;embed&apos; element
					type, the embed source article is{' '}
					<a href="https://www.theguardian.com/tv-and-radio/2020/oct/20/samuel-l-jackson-interview-enslavement-africa-roots-race-latanya-richardson">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<EmbedBlockComponent
						key={1}
						html={bbcEmbedEmbed.html}
						caption={bbcEmbedEmbed.caption}
						isTracking={true}
						source={bbcEmbedEmbed.source}
						sourceDomain={bbcEmbedEmbed.sourceDomain}
						role="inline"
					/>
				</Figure>
				<p css={paragraphStyle}>The end.</p>,
			</div>
		</Section>
	);
};
EmbedBlockComponentStory.storyName =
	'Click to view wrapping EmbedBlockComponent';

export const UnsafeEmbedBlockComponentStory = () => {
	return (
		<Section
			showTopBorder={false}
			title="Embedded Content"
			centralBorder="full"
		>
			<div
				css={css`
					max-width: 620px;
					clear: left;
					strong {
						font-weight: bold;
					}
				`}
			>
				<p css={paragraphStyle}>
					Example of an instagram embed, the source article is{' '}
					<a href="https://www.theguardian.com/culture/2019/apr/27/idris-elba-marries-sabrina-dhowre-in-morocco">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<UnsafeEmbedBlockComponent
						key="1"
						html={instagramEmbedEmbed.html}
						alt={instagramEmbedEmbed.alt ?? ''}
						index={1}
						isTracking={true}
						source={instagramEmbedEmbed.source}
						sourceDomain={instagramEmbedEmbed.sourceDomain}
						role="inline"
					/>
				</Figure>
				<p css={paragraphStyle}>
					Example of a formstack embed, the source article is{' '}
					<a href="https://www.theguardian.com/books/2019/nov/23/utopian-novels-for-dystopian-times">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<UnsafeEmbedBlockComponent
						key="2"
						html={formStackEmbed.html}
						alt={formStackEmbed.alt ?? ''}
						index={2}
						isTracking={true}
						source={formStackEmbed.source}
						sourceDomain={formStackEmbed.sourceDomain}
						role="inline"
					/>
				</Figure>
				<p css={paragraphStyle}>
					Example of a scribd embed from a &apos;embed&apos; element
					type, the embed source article is{' '}
					<a href="https://www.theguardian.com/politics/2020/jul/21/what-does-the-russia-report-mean-for-british-people-and-politics">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<UnsafeEmbedBlockComponent
						key="3"
						html={scribdEmbedEmbed.html}
						alt={scribdEmbedEmbed.alt ?? ''}
						index={3}
						isTracking={true}
						source={scribdEmbedEmbed.source}
						sourceDomain={scribdEmbedEmbed.sourceDomain}
						role="inline"
					/>
				</Figure>
				<p css={paragraphStyle}>
					Example of a tiktok embed from a &apos;embed&apos; element
					type, the embed source article is{' '}
					<a href="https://www.theguardian.com/tv-and-radio/2020/oct/28/junior-masterchef-weekly-recap-children-routinely-combust-with-joy-and-everything-is-cake">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<UnsafeEmbedBlockComponent
						key="4"
						html={tiktokEmbedEmbed.html}
						alt={tiktokEmbedEmbed.alt ?? ''}
						index={4}
						isTracking={true}
						source={scribdEmbedEmbed.source}
						sourceDomain={scribdEmbedEmbed.sourceDomain}
						role="inline"
					/>
				</Figure>
				<p css={paragraphStyle}>
					Example of a twitter embed from an &apos;embed&apos; element
					type, the embed source article is{' '}
					<a href="https://www.theguardian.com/world/2020/mar/21/biggest-story-how-journalists-coping-covid-19">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<UnsafeEmbedBlockComponent
						key="5"
						html={twitterEmbedEmbed.html}
						alt={twitterEmbedEmbed.alt ?? ''}
						index={5}
						isTracking={true}
						source={scribdEmbedEmbed.source}
						sourceDomain={scribdEmbedEmbed.sourceDomain}
						role="inline"
					/>
				</Figure>
				<p css={paragraphStyle}>The end.</p>,
			</div>
		</Section>
	);
};
UnsafeEmbedBlockComponentStory.storyName =
	'Click to view wrapping UnsafeEmbedBlockComponent';

export const VimeoBlockComponentStory = () => {
	return (
		<Section
			showTopBorder={false}
			title="Embedded Content"
			centralBorder="full"
		>
			<div
				css={css`
					max-width: 620px;
					clear: left;
					strong {
						font-weight: bold;
					}
				`}
			>
				<p css="para">
					Example of a vimeo embed from &apos;video&apos; element
					type, the embed source article is{' '}
					<a href="https://www.theguardian.com/culture/2020/oct/29/alice-fraser-the-10-funniest-things-i-have-ever-seen-on-the-internet">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<ClickToView
						isTracking={true}
						source={vimeoVideoEmbed.source}
						sourceDomain={vimeoVideoEmbed.sourceDomain}
						role="inline"
					>
						<VimeoBlockComponent
							format={{
								theme: Pillar.News,
								display: ArticleDisplay.Standard,
								design: ArticleDesign.Standard,
							}}
							embedUrl={vimeoVideoEmbed.embedUrl}
							height={vimeoVideoEmbed.height}
							width={vimeoVideoEmbed.width}
							caption={vimeoVideoEmbed.caption}
							credit={vimeoVideoEmbed.credit}
							title={vimeoVideoEmbed.title}
							isMainMedia={false}
						/>
					</ClickToView>
				</Figure>
				<p css={paragraphStyle}>The end.</p>,
			</div>
		</Section>
	);
};
VimeoBlockComponentStory.storyName =
	'Click to view wrapping VimeoBlockComponent';

export const DocumentBlockComponentStory = () => {
	return (
		<Section
			showTopBorder={false}
			title="Embedded Content"
			centralBorder="full"
		>
			<div
				css={css`
					max-width: 620px;
					clear: left;
					strong {
						font-weight: bold;
					}
				`}
			>
				<p css={paragraphStyle}>
					Example of a scribd embed from a &apos;document&apos;
					element type, the embed source article is{' '}
					<a href="https://www.theguardian.com/politics/2020/jul/21/what-does-the-russia-report-mean-for-british-people-and-politics">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<ClickToView
						isTracking={true}
						source={scribdDocumentEmbed.source}
						sourceDomain={scribdDocumentEmbed.sourceDomain}
						role="inline"
					>
						<DocumentBlockComponent
							embedUrl={scribdDocumentEmbed.embedUrl}
							height={scribdDocumentEmbed.height}
							width={scribdDocumentEmbed.width}
							title={scribdDocumentEmbed.title}
							isTracking={false}
							isMainMedia={false}
						/>
					</ClickToView>
				</Figure>
				<p css={paragraphStyle}>The end.</p>
			</div>
		</Section>
	);
};
DocumentBlockComponentStory.storyName =
	'Click to view wrapping DocumentBlockComponentStory';

export const SoundCloudBlockComponentStory = () => {
	return (
		<Section
			showTopBorder={false}
			title="Embedded Content"
			centralBorder="full"
		>
			<div
				css={css`
					max-width: 620px;
					clear: left;
					strong {
						font-weight: bold;
					}
				`}
			>
				<p css={paragraphStyle}>
					Example of a soundcloud embed from an &apos;audio&apos;
					element type, the embed source article is{' '}
					<a href="https://www.theguardian.com/culture/2020/aug/31/house-music-flora-willson-watching-and-listening-highlights">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<ClickToView
						isTracking={true}
						source={soundcloudAudioEmbed.source}
						sourceDomain={soundcloudAudioEmbed.sourceDomain}
						role="inline"
					>
						<SoundcloudBlockComponent
							element={soundcloudAudioEmbed}
						/>
					</ClickToView>
				</Figure>
				<p css={paragraphStyle}>
					Example of a soundcloud embed from an &apos;embed&apos;
					element type, the embed source article is{' '}
					<a href="https://www.theguardian.com/music/2020/sep/11/deep-sea-diver-best-track-of-week">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<ClickToView
						isTracking={true}
						source={soundcloudEmbedEmbed.source}
						sourceDomain={soundcloudEmbedEmbed.sourceDomain}
						role="inline"
					>
						<SoundcloudBlockComponent
							element={soundcloudEmbedEmbed}
						/>
					</ClickToView>
				</Figure>
				<p css={paragraphStyle}>The end.</p>,
			</div>
		</Section>
	);
};
SoundCloudBlockComponentStory.storyName =
	'Click to view wrapping SoundCloudBlockComponent';

export const SpotifyBlockComponentStory = () => {
	return (
		<Section
			showTopBorder={false}
			title="Embedded Content"
			centralBorder="full"
		>
			<div
				css={css`
					max-width: 620px;
					clear: left;
					strong {
						font-weight: bold;
					}
				`}
			>
				<p css={paragraphStyle}>
					Example of a spotify embed from an &apos;audio&apos; element
					type, the embed source article is{' '}
					<a href="https://www.theguardian.com/film/2020/oct/29/david-bowie-biopic-trailer-stardust">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<ClickToView
						isTracking={true}
						source={spotifyAudioEmbed.source}
						sourceDomain={spotifyAudioEmbed.sourceDomain}
						role="inline"
					>
						<SpotifyBlockComponent
							embedUrl={spotifyAudioEmbed.embedUrl}
							height={spotifyAudioEmbed.height}
							width={spotifyAudioEmbed.width}
							title={spotifyAudioEmbed.title}
							caption={spotifyAudioEmbed.caption}
							format={{
								theme: Pillar.News,
								display: ArticleDisplay.Standard,
								design: ArticleDesign.Standard,
							}}
							credit="Spotify"
							role="inline"
							isTracking={false}
							isMainMedia={false}
						/>
					</ClickToView>
				</Figure>
				<p css={paragraphStyle}>The end.</p>,
			</div>
		</Section>
	);
};

SpotifyBlockComponentStory.storyName =
	'Click to view wrapping SpotifyBlockComponent';

export const TweetBlockComponentStory = () => {
	return (
		<Section
			showTopBorder={false}
			title="Embedded Content"
			centralBorder="full"
		>
			<div
				css={css`
					max-width: 620px;
					clear: left;
					strong {
						font-weight: bold;
					}
				`}
			>
				<p css={paragraphStyle}>
					Example of a twitter embed from an &apos;tweet&apos; element
					type, the embed source article is{' '}
					<a href="https://www.theguardian.com/world/2020/mar/21/biggest-story-how-journalists-coping-covid-19">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<ClickToView
						isTracking={true}
						source={twitterTweetEmbed.source}
						sourceDomain={twitterTweetEmbed.sourceDomain}
						role="inline"
					>
						<TweetBlockComponent element={twitterTweetEmbed} />
					</ClickToView>
				</Figure>
				<p css={paragraphStyle}>The end.</p>,
			</div>
		</Section>
	);
};
TweetBlockComponentStory.storyName =
	'Click to view wrapping TweetBlockComponent';
export const InstagramBlockComponentStory = () => {
	return (
		<Section
			showTopBorder={false}
			title="Embedded Content"
			centralBorder="full"
		>
			<div
				css={css`
					max-width: 620px;
					clear: left;
					strong {
						font-weight: bold;
					}
				`}
			>
				<p css={paragraphStyle}>
					Example of a instagram embed from an &apos;instagram&apos;
					element type, the embed source article is{' '}
					<a href="https://www.theguardian.com/music/2017/aug/23/taylor-swift-reputation-new-album">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<InstagramBlockComponent
						key={1}
						element={instagramInstramEmbed}
						index={1}
						isMainMedia={false}
					/>
				</Figure>
				<p css={paragraphStyle}>The end.</p>,
			</div>
		</Section>
	);
};
InstagramBlockComponentStory.storyName =
	'Click to view wrapping InstagramBlockComponent';
export const MapBlockComponentStory = () => {
	return (
		<Section
			showTopBorder={false}
			title="Embedded Content"
			centralBorder="full"
		>
			<div
				css={css`
					max-width: 620px;
					clear: left;
					strong {
						font-weight: bold;
					}
				`}
			>
				<p css={paragraphStyle}>
					Example of a map embed, the embed source article is{' '}
					<a href="https://www.theguardian.com/world/2017/jan/19/womens-marches-across-the-uk-what-you-need-to-know">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<ClickToView
						isTracking={true}
						source={mapEmbedEmbed.source}
						sourceDomain={mapEmbedEmbed.sourceDomain}
						role="inline"
					>
						<MapEmbedBlockComponent
							embedUrl={mapEmbedEmbed.embedUrl}
							height={mapEmbedEmbed.height}
							width={mapEmbedEmbed.width}
							title={mapEmbedEmbed.title}
							caption={mapEmbedEmbed.caption}
							format={{
								theme: Pillar.News,
								display: ArticleDisplay.Standard,
								design: ArticleDesign.Standard,
							}}
							credit="Google Maps"
							role="inline"
							isTracking={false}
							isMainMedia={false}
						/>
					</ClickToView>
				</Figure>
				<p css={paragraphStyle}>The end.</p>
			</div>
		</Section>
	);
};
MapBlockComponentStory.storyName =
	'Click to view wrapping MapEmbedBlockComponent';
export const VineBlockComponentStory = () => {
	return (
		<Section
			title="Embedded Content"
			centralBorder="full"
			showTopBorder={false}
		>
			<div
				css={css`
					max-width: 620px;
					clear: left;
					strong {
						font-weight: bold;
					}
				`}
			>
				<p css={paragraphStyle}>
					Example of a vine embed, the embed source article is{' '}
					<a href="https://www.theguardian.com/football/2020/feb/13/ballboys-and-ballgirls-football-good-bad-bizarre-memorable-moments">
						here
					</a>
				</p>
				<Figure
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isMainMedia={false}
					role="inline"
				>
					<ClickToView
						isTracking={true}
						source={vineEmbedEmbed.source}
						sourceDomain={vineEmbedEmbed.sourceDomain}
						role="inline"
					>
						<VineBlockComponent
							element={vineEmbedEmbed}
							role="inline"
							isTracking={false}
						/>
					</ClickToView>
				</Figure>
				<p css={paragraphStyle}>The end.</p>
			</div>
		</Section>
	);
};
VineBlockComponentStory.storyName = 'Click to view wrapping VineBlockComponent';
