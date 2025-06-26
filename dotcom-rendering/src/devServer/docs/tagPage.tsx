import { Available } from './available';

const Examples = () => (
	<>
		<h2>Examples</h2>
		<dl>
			<dt>
				<a href="https://www.theguardian.com/tone/minutebyminute">
					Minute-by-minute tone
				</a>
			</dt>
			<dd>
				The tag page for the minute-by-minute tone tag, which is applied
				to all liveblogs and deadblogs.
			</dd>
			<dt>
				<a href="https://www.theguardian.com/profile/katharineviner">
					Katharine Viner's profile
				</a>
			</dt>
			<dd>
				The tag page for Katharine Viner's contributor tag, also known
				as a profile page. Demonstrates that a tag page can contain a
				bio (or description) derived from the tag's metadata.
			</dd>
			<dt>
				<a href="https://www.theguardian.com/environment/series/the-age-of-extinction/all">
					The age of extinction series
				</a>
			</dt>
			<dd>
				The tag page for the age of extinction series tag, which is
				applied to all content that's part of that series. This is an
				example of a tag page that's been upgraded to a front, so the
				tag page has been retrieved by appending <code>/all</code>. This
				also demonstrates the existence of "branding" that can be added
				to a tag page in the form of a badge.
			</dd>
		</dl>
	</>
);

const IndexesOfTags = () => (
	<>
		<h2>Indexes of Tags</h2>
		<p>
			These are not tag pages themselves, but rather indexes of tags that
			link to a variety of different tag pages.
		</p>
		<ul>
			<li>
				<a href="https://www.theguardian.com/index/subjects">
					An index of subjects
				</a>
			</li>
			<li>
				<a href="https://www.theguardian.com/index/contributors">
					An index of contributors
				</a>
			</li>
		</ul>
	</>
);

const SeeAlso = () => (
	<>
		<h2>See also</h2>
		<ul>
			<li>
				<a href="../front">Front</a>
			</li>
		</ul>
	</>
);

export const TagPage = () => (
	<>
		<Available targets={['dotcom']} />
		<p>
			Tag pages are automatically generated, reverse chronological lists
			of articles published with a particular tag. They are sometimes
			"upgraded" into a front, a curated collection of content. When this
			happens on dotcom it's usually possible to view the original tag
			page by appending <code>/all</code> to the path. For example:
			<pre>
				<a href="https://www.theguardian.com/environment/climate-crisis">
					https://www.theguardian.com/environment/climate-crisis
				</a>
			</pre>
			is a front that has replaced the{' '}
			<code>environment/climate-crisis</code> tag page, and the original
			tag page can now be viewed at:
			<pre>
				<a href="https://www.theguardian.com/environment/climate-crisis/all">
					https://www.theguardian.com/environment/climate-crisis/all
				</a>
			</pre>
			It is also possible to view both the front and the tag page within
			the live apps, although neither are rendered by DCAR there.
		</p>
		<Examples />
		<IndexesOfTags />
		<SeeAlso />
	</>
);
