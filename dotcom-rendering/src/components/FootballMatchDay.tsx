import { SvgChevronRightSingleSmall } from '@guardian/source/react-components';

export const FootballMatchDay = () => (
	<section>
		<ul>
			<Match />
		</ul>
		<a href="https://www.theguardian.com/football/world-cup-2026/overview">
			See all fixtures <SvgChevronRightSingleSmall />
		</a>
	</section>
);

const Match = () => (
	<li>
		<a>
			<span>FT</span>
			<span>
				Canada
				<picture>
					<img
						srcSet="https://i.guim.co.uk/img/sport/football/crests/31901.png?width=20&amp;dpr=1&amp;s=none&amp;crop=none, https://i.guim.co.uk/img/sport/football/crests/31901.png?width=20&amp;dpr=2&amp;s=none&amp;crop=none 2x"
						src="https://i.guim.co.uk/img/sport/football/crests/31901.png?width=20&amp;dpr=1&amp;s=none&amp;crop=none"
						alt=""
					/>
				</picture>
			</span>
			<span>2 - 0</span>
			<span>
				<picture>
					<img
						srcSet="https://i.guim.co.uk/img/sport/football/crests/7531.png?width=20&amp;dpr=1&amp;s=none&amp;crop=none, https://i.guim.co.uk/img/sport/football/crests/7531.png?width=20&amp;dpr=2&amp;s=none&amp;crop=none 2x"
						src="https://i.guim.co.uk/img/sport/football/crests/7531.png?width=20&amp;dpr=1&amp;s=none&amp;crop=none"
						alt=""
					/>
				</picture>
				Bosnia-Herzegovina
			</span>
			<SvgChevronRightSingleSmall />
		</a>
	</li>
);
