import { palette } from '../../palette';

export const Star = ({
	starId,
	isEmpty,
}: {
	starId: string;
	isEmpty: boolean;
}) => {
	if (isEmpty)
		return (
			<svg width="14" height="13" viewBox="0 0 14 13">
				<path
					id={`star-${starId}`}
					clipPath={`url(#clip-${starId})`}
					strokeWidth="2"
					stroke={palette('--star-rating-fill')}
					fill="transparent"
					d="M0 5.2L3.7 8l-1.4 4.6.5.4 3.7-2.8 3.7 2.8.5-.4L9.3 8 13 5.2l-.2-.6H8.2L6.8 0h-.6L4.8 4.6H.2l-.2.6z"
				/>
				<clipPath id={`clip-${starId}`}>
					<use xlinkHref={`#star-${starId}`} stroke="none" />
				</clipPath>
			</svg>
		);

	return (
		<svg width="14" height="13" viewBox="0 0 14 13">
			<path
				fill={palette('--star-rating-fill')}
				strokeWidth="0"
				d="M0 5.2L3.7 8l-1.4 4.6.5.4 3.7-2.8 3.7 2.8.5-.4L9.3 8 13 5.2l-.2-.6H8.2L6.8 0h-.6L4.8 4.6H.2l-.2.6z"
			/>
		</svg>
	);
};
