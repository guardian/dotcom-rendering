import { FootballCrest } from './FootballCrest';

type Props = {
	teamId: string;
};

/**
 * A specific, small version of the crest, used for football tables and lists
 * of fixtures and results.
 */
export const FootballTableCrest = (props: Props) => (
	<picture
		css={{
			width: '1.25rem',
			height: '1.25rem',
			flexShrink: 0,
			display: 'flex',
			justifyContent: 'center',
		}}
	>
		<FootballCrest
			teamId={props.teamId}
			altText=""
			width={20}
			css={{
				maxWidth: '100%',
				maxHeight: '100%',
				objectFit: 'contain',
			}}
		/>
	</picture>
);
