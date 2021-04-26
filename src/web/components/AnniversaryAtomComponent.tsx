import React from 'react';
import { css } from 'emotion';
import { InteractiveAtom } from '@guardian/atoms-rendering';

export const AnniversaryAtomComponent = ({
	anniversaryInteractiveAtom,
}: {
	anniversaryInteractiveAtom: InteractiveAtomBlockElement | undefined;
}) => {
	return (
		<div
			className={css`
				/* Temporarily support anniversary atom at top of articles */
				/* stylelint-disable color-no-hex */
				background-color: #ffe500;
				display: ${anniversaryInteractiveAtom ? 'block' : 'none'};
			`}
		>
			{anniversaryInteractiveAtom && (
				<InteractiveAtom
					html={anniversaryInteractiveAtom.html}
					js={anniversaryInteractiveAtom.js}
					css={anniversaryInteractiveAtom.css}
					id={anniversaryInteractiveAtom.id}
				/>
			)}
		</div>
	);
};
