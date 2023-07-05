import { RecommendationCount } from './RecommendationCount';

export default { title: 'RecommendationCount' };

export const NeverRecomended = () => (
	<RecommendationCount
		commentId={123}
		initialCount={383}
		alreadyRecommended={false}
		isSignedIn={true}
		userMadeComment={false}
	/>
);

export const AlreadyRecomended = () => (
	<RecommendationCount
		commentId={123}
		initialCount={83}
		alreadyRecommended={true}
		isSignedIn={true}
		userMadeComment={false}
	/>
);

export const NotSignedIn = () => (
	<RecommendationCount
		commentId={123}
		initialCount={83}
		alreadyRecommended={false}
		isSignedIn={false}
		userMadeComment={false}
	/>
);

export const OwnPost = () => (
	<RecommendationCount
		commentId={123}
		initialCount={83}
		alreadyRecommended={false}
		isSignedIn={false}
		userMadeComment={true}
	/>
);
