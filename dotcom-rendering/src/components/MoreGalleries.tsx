import { type ArticleFormat } from '../lib/articleFormat';
import { type TrailType } from '../types/trails';
import { Card } from './Card/Card';

type Props = {
	format: ArticleFormat;
	absoluteServerTimes: boolean;
	trails: TrailType[];
	discussionApiUrl: string;
};

export const MoreGalleries = (props: Props) => {
	return (
		<section>
			{props.trails.map((trail) => (
				<Card
					key={trail.url}
					linkTo={trail.url}
					format={props.format}
					absoluteServerTimes={props.absoluteServerTimes}
					headlineText={trail.headline}
					imageLoading="lazy"
					discussionApiUrl={props.discussionApiUrl}
					isExternalLink={false}
				/>
			))}
		</section>
	);
};
