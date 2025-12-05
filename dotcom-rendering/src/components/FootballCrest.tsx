import { generateImageURL } from '../lib/image';

type Props = {
	teamId: string;
	altText: string;
	width: number;
	className?: string;
};

export const FootballCrest = (props: Props) => {
	const mainImage = crestUrl(props.teamId)?.toString();

	if (mainImage === undefined) {
		return null;
	}

	const lowRes = generateImageURL({
		mainImage,
		imageWidth: props.width,
		resolution: 'low',
	});
	const highRes = generateImageURL({
		mainImage,
		imageWidth: props.width,
		resolution: 'high',
	});

	return (
		<img
			srcSet={`${lowRes}, ${highRes} 2x`}
			src={lowRes}
			alt={props.altText}
			className={props.className}
		/>
	);
};

/**
 * @param teamId The PA ID of the team.
 */
const crestUrl = (teamId: string): URL | undefined => {
	try {
		return new URL(
			`${teamId}.png`,
			'https://sport.guim.co.uk/football/crests/',
		);
	} catch (e) {
		return undefined;
	}
};
