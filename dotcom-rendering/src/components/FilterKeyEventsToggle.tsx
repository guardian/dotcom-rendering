import { css } from '@emotion/react';
import {
	from,
	neutral,
	palette,
	remSpace,
	until,
} from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';

const toggleWrapperStyles = css`
	display: flex;
	${until.desktop} {
		padding-top: ${remSpace[3]};
	}
	${from.desktop} {
		border-top: 1px solid ${neutral[86]};
	}
`;

interface Props {
	filterKeyEvents: boolean;
	id: 'filter-toggle-mobile' | 'filter-toggle-desktop';
}

export const FilterKeyEventsToggle = ({ filterKeyEvents, id }: Props) => {
	const urlParams = new URLSearchParams({
		filterKeyEvents: String(!filterKeyEvents),
	});

	return (
		<>
			<span id={id} />
			<div css={toggleWrapperStyles}>
				<LinkButton
					priority="secondary"
					color={palette.neutral[86]}
					href={`?${urlParams.toString()}`}
					data-component="filter-key-events"
					data-link-name={`filter-key-events-${
						filterKeyEvents ? 'off' : 'on'
					}`}
				>
					{filterKeyEvents
						? 'Show all events'
						: 'Show key events only'}
				</LinkButton>
			</div>
		</>
	);
};
