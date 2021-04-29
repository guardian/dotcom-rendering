import React from 'react';
import { css } from 'emotion';
import { InteractiveAtom } from '@guardian/atoms-rendering';
import { from } from '@guardian/src-foundations/mq';

const atomStyles = (
	anniversaryInteractiveAtom: InteractiveAtomBlockElement | undefined,
) => css`
	/* Temporarily support anniversary atom at top of articles */
	/* stylelint-disable color-no-hex */
	background-color: #ffe500;
	display: ${anniversaryInteractiveAtom ? 'block' : 'none'};

	${from.tablet} {
		margin-bottom: 25px;
		position: relative;

		&:after {
			content: '';
			height: 25px;
			background-color: transparent;
			border-bottom: 1px solid #dcdcdc;
			width: 100%;
			display: block;
			position: absolute;
			bottom: -25px;
		}
	}
`;
export const AnniversaryAtomComponent = ({
	anniversaryInteractiveAtom,
}: {
	anniversaryInteractiveAtom: InteractiveAtomBlockElement | undefined;
}) => {
	return (
		<div className={atomStyles(anniversaryInteractiveAtom)}>
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
