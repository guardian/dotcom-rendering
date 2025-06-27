import { Available } from './available';

const OtherExamples = () => (
	<>
		<h3>Other Examples</h3>
		<dl>
			<dt>
				<a href="https://www.theguardian.com/tone/minutebyminute">
					Minute-by-minute tag page
				</a>
			</dt>
			<dd>
				Liveblogs are tagged with the minute-by-minute tone tag, so this
				tag page contains a list of all liveblogs and deadblogs
				(liveblogs that are no longer live).
			</dd>
			<dt>
				<a href="https://www.theguardian.com/tone/comment">
					Comment tag page
				</a>
			</dt>
			<dd>
				Pieces tagged with the comment tone tag. These are largely
				Comment articles, but can also contain other kinds of article
				such as Picture. Note that Comment articles do not always have
				the Opinion pillar, and this page is likely to contain examples
				that have other pillars such as Lifestyle or Culture.
			</dd>
			<dt>
				<a href="https://www.theguardian.com/tone/matchreports">
					Match report tag page
				</a>
			</dt>
			<dd>
				Pieces tagged with the match report tone tag. These are largely
				football match reports, but also include other sports like
				cricket and tennis.
			</dd>
			<dt>
				<a href="https://www.theguardian.com/interactive">
					Interactives front
				</a>
			</dt>
			<dd>A curated list of interactive articles.</dd>
			<dt>
				<a href="https://www.theguardian.com/news/series/the-long-read">
					The Long Read tag page
				</a>
			</dt>
			<dd>
				The long read series contains both text-based articles, which
				tend to be immersive, and audio articles.
			</dd>
			<dt>
				<a href="https://www.theguardian.com/inpictures">
					In Pictures front
				</a>
			</dt>
			<dd>A curated list of recent gallery articles.</dd>
			<dt>
				<a href="https://www.theguardian.com/video">Video front</a>
			</dt>
			<dd>A curated list of recent video articles.</dd>
			<dt>
				<a href="https://www.theguardian.com/audio">Audio tag page</a>
			</dt>
			<dd>A reverse chronological list of audio articles.</dd>
			<dt>
				<a href="https://www.theguardian.com/pictures">
					Pictures tag page
				</a>
			</dt>
			<dd>A reverse chronological list of picture articles.</dd>
			<dt>
				<a href="https://www.theguardian.com/guardian-labs">
					Labs front
				</a>
			</dt>
			<dd>A curated list of labs articles.</dd>
		</dl>
	</>
);

const Examples = () => (
	<>
		<h2>Examples</h2>
		<OtherExamples />
	</>
);

const Format = () => (
	<>
		<h2>Format</h2>
		<p>
			The <code>ArticleFormat</code>, sometimes known as just "Format",
			determines the kind of article being rendered. It influences what
			content and features the article will contain, and what the design
			will look like. It's broken down into three dimensions:
		</p>
		<dl>
			<dt>Design</dt>
			<dd>
				Primarily influences the content, structure and features of an
				article. It's the most important of the three, and is often used
				as a shorthand to describe the "kind" of article. Examples
				include <code>Liveblog</code>, <code>Feature</code> and{' '}
				<code>Gallery</code>.
			</dd>
			<dt>Display</dt>
			<dd>
				Primarily influences the layout of an article. Examples include{' '}
				<code>Immersive</code>, <code>Showcase</code> and{' '}
				<code>NumberedList</code>.
			</dd>
			<dt>Theme</dt>
			<dd>
				Primarily influences the fonts and colours of an article. It can
				can be thought of as a superset of "pillar", i.e. all the
				pillars are considered themes, but there are some additional
				themes that are not pillars. Examples include <code>News</code>,{' '}
				<code>Sport</code> and <code>Labs</code>.
			</dd>
		</dl>
		<p>
			In theory all possible combinations of Format can exist and be
			rendered by DCAR. In practice there are some combinations that are
			not currently allowed by the tools, such as immersive liveblogs,
			which therefore cannot be found in CAPI.
		</p>
	</>
);

export const Article = () => (
	<>
		<Available targets={['dotcom', 'live apps', 'amp']} />
		<p>
			Articles are the primary form of content on our platforms. They are
			written in Composer and stored in CAPI. There are many different
			kinds of article, and on DCAR this variety is captured by the{' '}
			<code>ArticleFormat</code> type (sometimes known as just "Format").
			In addition, aside from its ability to render article pages in full,
			DCAR can also render partial pages of{' '}
			<a href="live-updates">live updates</a> for liveblogs.
		</p>
		<Format />
		<Examples />
		<h2>See also</h2>
		<ul>
			<li>
				<a href="live-updates">Live Updates</a>
			</li>
		</ul>
	</>
);
