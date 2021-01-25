/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';

import { Display, Design } from '@guardian/types';
import { ContainerLayout } from '../ContainerLayout';
import { EmbedBlockComponent } from './EmbedBlockComponent';
import { Figure } from '../Figure';

export default {
	title: 'Components/EmbedBlockComponent',
};

const EmbeddedElements = {
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
	youtubeEmbedEmbed: {
		isThirdPartyTracking: false,
		safe: true,
		alt: 'Watch the video for Sleaford Mods’ Second',
		_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
		html:
			'<iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/IT09DGuXwYQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
		isMandatory: false,
	},
	spotifyEmbedEmbed: {
		isThirdPartyTracking: true,
		safe: true,
		alt: 'Joy Division Ranked Spotify Playlist',
		_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
		html:
			'<iframe src="https://embed.spotify.com/?uri=spotify%3Auser%3Aguardianmusic%3Aplaylist%3A1XUwszj7DC0uRY5L7Anj6I" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>',
		isMandatory: true,
	},
	bandcampEmbedEmbed: {
		isThirdPartyTracking: true,
		safe: true,
		alt: 'Isaac by Jonny and the Baptists',
		_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
		html:
			'<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=1077257657/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=2222104579/transparent=true/" seamless><a href="https://jonnyandthebaptists.bandcamp.com/album/love-you-hate-bastards">Love You &amp; Hate Bastards by Jonny &amp; The Baptists</a></iframe>',
		isMandatory: true,
	},
	ourworldindataEmbedEmbed: {
		isThirdPartyTracking: true,
		safe: true,
		alt: 'Our World in Data',
		_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
		html:
			'<iframe src="https://ourworldindata.org/grapher/daily-covid-deaths-3-day-average" style="width: 100%; height: 600px; border: 0px none;"></iframe>',
		isMandatory: false,
	},
	bbcEmbedEmbed: {
		isThirdPartyTracking: true,
		safe: true,
		alt: 'Watch a trailer for Enslaved',
		_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
		html:
			'<iframe width="fullwidth" height="500" frameborder="0" src="https://www.bbc.co.uk/programmes/p08tfnfb/player"></iframe>',
		isMandatory: false,
	},
};

function body(pillar: CAPIPillar, design: Design, display: Display) {
	return [
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
			Example of a vimeo embed from &apos;embed&apos; element type, the
			source article is{' '}
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
			Example of a youtube embed from an &apos;embed&apos; element type,
			the embed source article is{' '}
			<a href="https://www.theguardian.com/music/2020/may/17/sleaford-mods-all-that-glue-review-scattergun-fury">
				here
			</a>
		</p>,
		<Figure role="inline">
			<EmbedBlockComponent
				key={1}
				html={EmbeddedElements.youtubeEmbedEmbed.html}
				alt={EmbeddedElements.youtubeEmbedEmbed.alt}
			/>
		</Figure>,
		<p>
			Example of a spotify embed from an &apos;embed&apos; element type,
			the embed source article is{' '}
			<a href="https://www.theguardian.com/film/2020/oct/29/david-bowie-biopic-trailer-stardust">
				here
			</a>
		</p>,
		<Figure role="inline">
			<EmbedBlockComponent
				key={1}
				html={EmbeddedElements.spotifyEmbedEmbed.html}
				alt={EmbeddedElements.spotifyEmbedEmbed.alt}
			/>
		</Figure>,
		<p>
			Example of a bandcamp embed from an &apos;embed&apos; element type,
			the embed source article is{' '}
			<a href="https://www.theguardian.com/culture/2020/oct/29/alice-fraser-the-10-funniest-things-i-have-ever-seen-on-the-internet">
				here
			</a>
		</p>,
		<Figure role="inline">
			<EmbedBlockComponent
				key={1}
				html={EmbeddedElements.bandcampEmbedEmbed.html}
				alt={EmbeddedElements.bandcampEmbedEmbed.alt}
			/>
		</Figure>,
		<p>
			Example of a Our World In Data embed from an &apos;embed&apos;
			element type, the embed source article is{' '}
			<a href="https://www.theguardian.com/world/2020/apr/12/coronavirus-statistics-what-can-we-trust-and-what-should-we-ignore">
				here
			</a>
		</p>,
		<Figure role="inline">
			<EmbedBlockComponent
				key={1}
				html={EmbeddedElements.ourworldindataEmbedEmbed.html}
				alt={EmbeddedElements.ourworldindataEmbedEmbed.alt}
			/>
		</Figure>,
		<p>
			Example of a BBC embed from an &apos;embed&apos; element type, the
			embed source article is{' '}
			<a href="https://www.theguardian.com/tv-and-radio/2020/oct/20/samuel-l-jackson-interview-enslavement-africa-roots-race-latanya-richardson">
				here
			</a>
		</p>,
		<Figure role="inline">
			<EmbedBlockComponent
				key={1}
				html={EmbeddedElements.bbcEmbedEmbed.html}
				alt={EmbeddedElements.bbcEmbedEmbed.alt}
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
			</div>
		</ContainerLayout>
	);
};
DefaultStory.story = { name: 'default' };
