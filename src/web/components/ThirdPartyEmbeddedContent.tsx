/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { ClickToView } from './ClickToView';

type Props = {
	children: React.ReactNode;
	width?: number;
	height?: number;
	isTracking: boolean;
	source?: string;
	sourceDomain: string;
};

export const ThirdPartyEmbeddedContent = ({
	children,
	width,
	height,
	isTracking,
	source,
	sourceDomain,
}: Props) => {
	let headline;
	let body;
	if (isTracking) {
		if (source) {
			headline = `Allow ${source} content?`;
			body = (
				<div>
					<p>
						This article includes content provided by {source}. We
						ask for your permission berfore anyting is loaded, as
						they may be using cookies and other technologies.
					</p>
					<p>
						To view this content, click &apos;Allow and
						continue&apos;
					</p>
				</div>
			);
		} else {
			headline = 'Allow content provided by a thrid party?';
			body = (
				<div>
					<p>
						This article includes content hosted on {sourceDomain}.
						We ask for your permission berfore anyting is loaded, as
						the provider may be using cookies and other
						technologies.
					</p>
					<p>
						To view this content, click &apos;Allow and
						continue&apos;
					</p>
				</div>
			);
		}

		const buttonText = 'Allow and continue';

		return (
			<ClickToView
				width={width || 600}
				height={height || 400}
				overlayHeadline={headline}
				overlayBody={body}
				overlayButtonText={buttonText}
				onAccept={() => {}}
			>
				{children}
			</ClickToView>
		);
	}

	return <div>{children}</div>;
};
