// This placeholder div is used by the SignInGate component to insert the sign in gate into the appropriate location within body of an article,
// if the SignInGateSelector determines a gate should be rendered.

import React from 'react';
import { Island } from '../components/Island';
import { SignInGateSelector } from '../components/SignInGateSelector.importable';
import type { Switches } from '../types/config';
import type { TagType } from '../types/tag';

type Props = {
	renderedElements: (JSX.Element | null | undefined)[];
	contentType: string;
	sectionId: string;
	tags: TagType[];
	isPaidContent: boolean;
	isPreview?: boolean;
	host?: string;
	pageId: string;
	idUrl: string;
	switches: Switches;
	isSensitive?: boolean;
	isDev?: boolean;
};

export const withSignInGateSlot = ({
	renderedElements,
	contentType,
	sectionId,
	tags,
	isPaidContent,
	isPreview,
	host,
	pageId,
	idUrl,
	switches,
}: Props): React.ReactNode => {
	return renderedElements.map((element, i) => {
		return (
			<React.Fragment key={element?.key ?? i}>
				{element}
				{/* Add the placeholder div after the second article element */}
				{i === 1 && (
					<div id="sign-in-gate">
						<Island
							priority="feature"
							defer={{ until: 'visible' }}
							clientOnly={true}
						>
							<SignInGateSelector
								contentType={contentType}
								sectionId={sectionId}
								tags={tags}
								isPaidContent={isPaidContent}
								isPreview={!!isPreview}
								host={host}
								pageId={pageId}
								idUrl={idUrl}
								switches={switches}
							/>
						</Island>
					</div>
				)}
			</React.Fragment>
		);
	});
};
