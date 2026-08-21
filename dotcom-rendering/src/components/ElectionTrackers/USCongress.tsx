import type { ComponentProps } from 'react';
import { OnwardLink } from './OnwardLink';
import { SideBySide } from './SideBySide';
import { USHouse } from './USHouse';
import { USSenate } from './USSenate';

type Props = {
	/**
	 * Results for the US Senate. See {@linkcode USSenate} for more details.
	 */
	senate: ComponentProps<typeof USSenate>;
	/**
	 * Results for the US House of Representatives. See {@linkcode USSenate} for
	 * more details.
	 */
	house: ComponentProps<typeof USHouse>;
	/**
	 * Text to be shown on the onward link to the full results page. For
	 * example, "Full results".
	 */
	linkText: string;
	/**
	 * Onward link to the full results page.
	 */
	link: URL;
};

/**
 * Represents results from elections to the US Congress, and includes a summary
 * for both the Senate and the House of Representatives. Each can also be
 * represented individually using the {@linkcode USSenate} or
 * {@linkcode USHouse} components.
 */
export const USCongress = (props: Props) => (
	<>
		<SideBySide
			from="tablet"
			left={{
				heading: 'Senate',
				children: <USSenate {...props.senate} />,
			}}
			right={{
				heading: 'House',
				children: <USHouse {...props.house} />,
			}}
		/>
		<OnwardLink link={props.link} text={props.linkText} />
	</>
);
