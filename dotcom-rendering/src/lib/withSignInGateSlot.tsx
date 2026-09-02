// This placeholder div is used by the SignInGate component to insert the sign in gate into the appropriate location within body of an article,
// if the SignInGateSelector determines a gate should be rendered.

import React from 'react';
import type { TagType } from '../types/tag';
import type { EditionId } from './edition';

type Props = {
	renderedElements: Array<JSX.Element | null | undefined>;
	contentType: string;
	sectionId: string;
	tags: TagType[];
	isPaidContent: boolean;
	isPreview?: boolean;
	host?: string;
	pageId: string;
	idUrl: string;
	isSensitive?: boolean;
	isDev?: boolean;
	contributionsServiceUrl: string;
	editionId: EditionId;
};

export const withSignInGateSlot = ({
	renderedElements,
}: Props): React.ReactNode => {
	// The SignInGatePortal requires a #sign-in-gate element to exist before it
	// can select the gate, even when the (v2 popup) gate ultimately portals to
	// document.body. Bodies with fewer than two renderable elements (e.g. some
	// crosswords, pictures and interactives) would otherwise never provide one,
	// so fall back to appending the placeholder after the last element.
	if (renderedElements.length === 0) {
		return [<div id="sign-in-gate" key="sign-in-gate"></div>];
	}
	return renderedElements.map((element, i) => {
		const isAfterSecondElement =
			i === 1 ||
			(renderedElements.length < 2 && i === renderedElements.length - 1);
		return (
			<React.Fragment key={element?.key ?? i}>
				{element}
				{/* Add the placeholder div after the second article element */}
				{isAfterSecondElement && <div id="sign-in-gate"></div>}
			</React.Fragment>
		);
	});
};
