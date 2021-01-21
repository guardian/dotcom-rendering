/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';

import { ContainerLayout } from '../components/ContainerLayout';
//import { InstagramBlockComponent } from '../components/elements/InstagramBlockComponent';
import { EmbedBlockComponent } from '../components/elements/EmbedBlockComponent';
import { UnsafeEmbedBlockComponent } from '../components/elements/UnsafeEmbedBlockComponent';
import { SpotifyBlockComponent } from '../components/elements/SpotifyBlockComponent';
import { VimeoBlockComponent } from '../components/elements/VimeoBlockComponent';
import { DocumentBlockComponent } from '../components/elements/DocumentBlockComponent';
import { Figure } from '../components/Figure';
import { Display, Design } from '@guardian/types';

export default {
	title: 'Examples/EmbeddedContent',
};

function body(pillar: CAPIPillar, design: Design, display: Display) {
	return [
		<p>
			Example of an instagram embed, the source article is{' '}
			<a href="https://www.theguardian.com/culture/2019/apr/27/idris-elba-marries-sabrina-dhowre-in-morocco">
				here
			</a>
		</p>,
		<Figure role="inline">
			<UnsafeEmbedBlockComponent
				key="1"
				html={EmbeddedElements.instagramEmbed.html}
				alt={EmbeddedElements.instagramEmbed.alt}
				index={1}
			/>
		</Figure>,
		<p>
			Example of a formstack embed, the source article is{' '}
			<a href="https://www.theguardian.com/books/2019/nov/23/utopian-novels-for-dystopian-times">
				here
			</a>
		</p>,
		<Figure role="inline">
			<UnsafeEmbedBlockComponent
				key="1"
				html={EmbeddedElements.formStackEmbed.html}
				alt={EmbeddedElements.formStackEmbed.alt}
				index={1}
			/>
		</Figure>,
		<p>
			Example of a spotify embed, the source article is{' '}
			<a href="https://www.theguardian.com/music/2020/may/07/beethoven-brahms-mozart-review">
				here
			</a>
		</p>,
		<Figure role="inline">
			<SpotifyBlockComponent
				embedUrl={EmbeddedElements.spotifyEmbed.embedUrl}
				height={EmbeddedElements.spotifyEmbed.height}
				width={EmbeddedElements.spotifyEmbed.width}
				title={EmbeddedElements.spotifyEmbed.title}
				pillar={pillar}
				caption={EmbeddedElements.spotifyEmbed.caption}
				design={design}
				display={display}
				credit="Spotify"
			/>
		</Figure>,
		<p>
			Example of a facebook post embed, the source article is{' '}
			<a href="https://www.theguardian.com/uk-news/2019/aug/16/police-officers-death-sparks-sweeping-inquiry">
				here
			</a>
		</p>,
		<Figure role="inline">
			<EmbedBlockComponent
				key={1}
				html={EmbeddedElements.facebookEmbed.html}
				alt={EmbeddedElements.facebookEmbed.alt}
			/>
		</Figure>,
		<p>
			Example of a vimeo embed from 'embed' element type, the source
			article is{' '}
			<a href="https://www.theguardian.com/film/2020/oct/12/ultraviolence-ken-fero-documentary-injustice-deaths-police">
				here
			</a>
		</p>,
		<Figure role="inline">
			<EmbedBlockComponent
				key={1}
				html={EmbeddedElements.vimeoEmbedEmbed.html}
				alt={EmbeddedElements.vimeoEmbedEmbed.alt}
			/>
		</Figure>,
		<p>
			Example of a vimeo embed from 'video' element type, the embed source
			article is{' '}
			<a href="https://www.theguardian.com/culture/2020/oct/29/alice-fraser-the-10-funniest-things-i-have-ever-seen-on-the-internet">
				here
			</a>
		</p>,
		<Figure role="inline">
			<VimeoBlockComponent
				pillar={pillar}
				embedUrl={EmbeddedElements.vimeoVideoEmbed.embedUrl}
				height={EmbeddedElements.vimeoVideoEmbed.height}
				width={EmbeddedElements.vimeoVideoEmbed.width}
				caption={EmbeddedElements.vimeoVideoEmbed.caption}
				credit={EmbeddedElements.vimeoVideoEmbed.credit}
				title={EmbeddedElements.vimeoVideoEmbed.title}
				display={display}
				design={design}
			/>
		</Figure>,
		<p>
			Example of a scribd embed from a 'document' element type, the embed
			source article is{' '}
			<a href="https://www.theguardian.com/politics/2020/jul/21/what-does-the-russia-report-mean-for-british-people-and-politics">
				here
			</a>
		</p>,
		<Figure role="inline">
			<DocumentBlockComponent
				embedUrl={EmbeddedElements.scribdDocumentEmbed.embedUrl}
				height={EmbeddedElements.scribdDocumentEmbed.height}
				width={EmbeddedElements.scribdDocumentEmbed.width}
				title={EmbeddedElements.scribdDocumentEmbed.title}
			/>
		</Figure>,
	];
}

export const DefaultStory = () => {
	return (
		<ContainerLayout
			sideBorders={true}
			title="Embedded Content"
			centralBorder="full"
		>
			<div
				className={css`
					max-width: 620px;
					clear: left;

					p {
						${textSans.medium()};
						font-weight: 300;
						margin-top: 0;
						margin-bottom: 8px;
					}
				`}
			>
				{body('news', Design.Article, Display.Standard)}
				{/*
                        TODO
                        tiktok.com
                        guardiannewsampampmedia.formstack.com
                        w.soundcloud.com
                        youtube.com
                        embed.spotify.com
                        bandcamp.com
                        counter.theconversation.com
                        platform.twitter.com
                        ourworldindata.org
                        bbc.co.uk
                    */}
			</div>
		</ContainerLayout>
	);
};
DefaultStory.story = { name: 'default' };

const EmbeddedElements = {
	instagramEmbed: {
		isThirdPartyTracking: true,
		safe: false,
		alt: 'Idris Elba wedding',
		_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
		html:
			'<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/BwwONCplEyj/" data-instgrm-version="12" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/BwwONCplEyj/" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div></a> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/BwwONCplEyj/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">Congratulations to newlyweds #IdrisElba and #SabrinaDhowre who exchanged vows in Morocco on April 26 2019. Celebrations were spread over three days in Marrakech. See more in the world exclusive in the July 2019 issue of #BritishVogue. Photographed by @SeanThomas_Photo.</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by <a href="https://www.instagram.com/britishvogue/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank"> British Vogue</a> (@britishvogue) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2019-04-27T09:10:49+00:00">Apr 27, 2019 at 2:10am PDT</time></p></div></blockquote> <script async src="//www.instagram.com/embed.js"></script>',
		isMandatory: false,
	},
	formStackEmbed: {
		isThirdPartyTracking: true,
		safe: false,
		alt: 'Book clinic form',
		_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
		html:
			'<script type="text/javascript" src="https://guardiannewsandmedia.formstack.com/forms/js.php/observer_book_clinic"></script>',
		isMandatory: true,
	},
	spotifyEmbed: {
		embedUrl: 'https://open.spotify.com/embed/album/15R3tsjWY6sxnEMZO1Oy0J',
		isThirdPartyTracking: true,
		width: 300,
		_type: 'model.dotcomrendering.pageElements.SpotifyBlockElement',
		title:
			'Brahms: 6 Piano Pieces, Op. 118: II. Intermezzo. Andante teneramente (Live at Church of San Bernardo, Rabbi / 2019)',
		height: 380,
		caption: undefined,
	},
	facebookEmbed: {
		isThirdPartyTracking: true,
		safe: true,
		alt: 'Facebook post',
		_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
		html:
			'<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fmaureen.shrimpton%2Fposts%2F2165642433537707&width=500" width="500" height="211" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>',
		isMandatory: false,
	},
	vimeoEmbedEmbed: {
		isThirdPartyTracking: false,
		safe: true,
		alt: 'the documentary Injustice',
		_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
		html:
			'<iframe src="https://player.vimeo.com/video/34633260?dnt=true" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>',
		isMandatory: false,
	},
	vimeoVideoEmbed: {
		embedUrl:
			'https://player.vimeo.com/video/21693673?app_id=122963&dnt=true',
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
	},
	scribdDocumentEmbed: {
		embedUrl: 'https://www.scribd.com/embeds/469886680/content',
		isThirdPartyTracking: true,
		width: 613,
		_type: 'model.dotcomrendering.pageElements.DocumentBlockElement',
		title: 'Russia Report',
		isMandatory: false,
		height: 460,
	},
};
