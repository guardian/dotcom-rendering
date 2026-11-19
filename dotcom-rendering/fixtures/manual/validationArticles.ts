import { Comment } from '../generated/fe-articles/Comment';
import { Feature } from '../generated/fe-articles/Feature';
import { Live } from '../generated/fe-articles/Live';
import { MatchReport } from '../generated/fe-articles/MatchReport';
import { Review } from '../generated/fe-articles/Review';
import { Standard } from '../generated/fe-articles/Standard';

export const articles = [
	{ name: 'Standard', data: Standard },
	{ name: 'Feature', data: Feature },
	{ name: 'Comment', data: Comment },
	{ name: 'Match Report', data: MatchReport },
	{ name: 'Review', data: Review },
	{ name: 'Liveblog', data: Live },
] as const;
