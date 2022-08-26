// This placeholder div is used by the SignInGate component to insert the sign in gate into the appropriate location within body of an article,
// if the SignInGateSelector determines a gate should be rendered.

import React from 'react';
import type { Switches } from '../../types/config';
import { Island } from '../components/Island';
import { SignInGateSelector } from '../components/SignInGateSelector.importable';

type Props = {
	// eslint-disable-next-line @typescript-eslint/ban-types -- we want to coerce children
	renderedElements: (JSX.Element | null | undefined)[];
	format: ArticleFormat;
	contentType: string;
	sectionName: string;
	tags: TagType[];
	isPaidContent: boolean;
	isPreview?: boolean;
	host?: string;
	pageId: string;
	idUrl: string;
	switches: Switches;
	isSensitive: boolean;
	isDev: boolean;
};

export const withSignInGateSlot = ({
	renderedElements,
	format,
	contentType,
	sectionName,
	tags,
	isPaidContent,
	isPreview,
	host,
	pageId,
	idUrl,
}: Props): React.ReactNode => {
	return renderedElements.map((element, i) => {
		return (
			<React.Fragment key={element?.key ?? i}>
				{element}
				{/* Add the placeholder div after the second article element */}
				{i === 1 && (
					<div id="sign-in-gate">
						<Island clientOnly={true}>
							<SignInGateSelector
								format={format}
								contentType={contentType}
								sectionName={sectionName}
								tags={tags}
								isPaidContent={isPaidContent}
								isPreview={!!isPreview}
								host={host}
								pageId={pageId}
								idUrl={idUrl}
							/>
						</Island>
					</div>
				)}
			</React.Fragment>
		);
	});
};
