import { css } from '@emotion/react';
import { from, palette, remSpace, until } from '@guardian/source-foundations';
import { ToggleSwitch } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';

const cssOverrides = css`
	display: inline-flex;
	color: inherit;
	padding-bottom: ${remSpace[3]};

	${from.desktop} {
		padding: ${remSpace[3]} 0;
	}

	/* This hides the Source spacedFocusHalo so we only see the DCR halo.
	*  Without the !important we see both styles simultaneously.
	*/
	*:focus {
		/* stylelint-disable-next-line declaration-no-important */
		outline: none !important;
	}
`;

const toggleWrapperStyles = css`
	display: flex;
	${until.desktop} {
		padding-top: ${remSpace[3]};
	}
	${from.desktop} {
		border-top: 1px solid ${palette.neutral[86]};
	}
`;

interface Props {
	filterKeyEvents: boolean;
	id: 'filter-toggle-mobile' | 'filter-toggle-desktop';
}

export const FilterKeyEventsToggle = ({ filterKeyEvents, id }: Props) => {
	const [checked, setChecked] = useState(filterKeyEvents);

	const handleClick = () => {
		setChecked(!checked);

		const urlParams = new URLSearchParams(window.location.search);
		urlParams.delete('page'); // direct to the first page
		urlParams.set('filterKeyEvents', checked ? 'false' : 'true');

		window.location.hash = id;
		window.location.search = urlParams.toString();
	};

	return (
		<>
			<span id={id} />
			<div css={toggleWrapperStyles}>
				<ToggleSwitch
					label="Show key events only"
					checked={checked}
					onClick={() => handleClick()}
					cssOverrides={cssOverrides}
					data-component="filter-key-events"
					data-link-name={`filter-key-events-${
						filterKeyEvents ? 'off' : 'on'
					}`}
				/>
			</div>
		</>
	);
};
