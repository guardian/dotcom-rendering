import { literal, union } from 'valibot';

// StarRating is 0 | 1 | 2 | 3 | 4 | 5
export const StarRatingSchema = union([
	literal(0),
	literal(1),
	literal(2),
	literal(3),
	literal(4),
	literal(5),
]);
