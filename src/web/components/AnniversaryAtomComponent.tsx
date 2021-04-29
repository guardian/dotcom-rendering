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

	height: 202px;
	--space-below: 16px;

	${from.phablet} {
		height: 155px;
	}
	${from.tablet} {
		height: 160px;
		--space-below: 24px;
	}
	${from.desktop} {
		height: 180px;
	}

	/* IE11 will not have the space below */
	@supports (--css: variables) {
		margin-bottom: var(--space-below);
		position: relative;

		&:after {
			content: '';
			height: var(--space-below);
			background-color: transparent;
			border-bottom: 1px solid #dcdcdc;
			width: 100%;
			display: block;
			position: absolute;
			bottom: calc(var(--space-below) * -1); /* negate the css var */
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
