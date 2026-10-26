import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { palette } from '../../palette';

type Props = {
	link: URL;
	text: string;
	description: string;
};

/**
 * An instance of a Source `LinkButton` for linking to a full results page from
 * an election tracker.
 */
export const OnwardLink = (props: Props) => (
	<LinkButton
		icon={<SvgArrowRightStraight />}
		iconSide="right"
		theme={{
			backgroundPrimary: palette('--election-tracker-button-background'),
			textPrimary: palette('--election-tracker-button-text'),
		}}
		cssOverrides={css({
			marginTop: space[4],
			'::before': {
				position: 'absolute',
				content: '""',
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
			},
		})}
		href={props.link.href}
		title={props.description}
	>
		{props.text}
	</LinkButton>
);
