import { Available } from './available';

const NetworkFronts = () => (
	<>
		<h3>Network Fronts</h3>
		<p>
			Each edition (UK, US, AU, Europe, International) has its own
			"network" front, also known as a "homepage". Note that just visiting
			one of these fronts does not mean you are on that edition of the
			site. Edition is a separate concept from which several aspects of
			the user experience, such as timezone, are derived.
		</p>
		<ul>
			<li>
				<a href="https://www.theguardian.com/uk">UK</a>
			</li>
			<li>
				<a href="https://www.theguardian.com/us">US</a>
			</li>
			<li>
				<a href="https://www.theguardian.com/au">AU</a>
			</li>
			<li>
				<a href="https://www.theguardian.com/europe">Europe</a>
			</li>
			<li>
				<a href="https://www.theguardian.com/international">
					International
				</a>
			</li>
		</ul>
	</>
);

const OtherFronts = () => (
	<>
		<h3>Other Fronts</h3>
		<ul>
			<li>
				<a href="https://www.theguardian.com/uk/culture">UK Culture</a>
			</li>
			<li>
				<a href="https://www.theguardian.com/world">World</a>
			</li>
			<li>
				<a href="https://www.theguardian.com/tone/recipes">Recipes</a>
			</li>
		</ul>
	</>
);

const Examples = () => (
	<>
		<h2>Examples</h2>
		<NetworkFronts />
		<OtherFronts />
	</>
);

export const Front = () => (
	<>
		<Available targets={['dotcom']} />
		<p>
			Fronts are curated collections of content; largely, but not
			exclusively, comprised of articles. They are managed in the Fronts
			Tool, and can either be standalone pages or "upgraded" versions of
			tag pages (see <a href="../tag-page">tag page</a> for more
			information on this).
		</p>
		<Examples />
		<h2>See also</h2>
		<ul>
			<li>
				<a href="../tag-page">Tag Page</a>
			</li>
		</ul>
	</>
);
