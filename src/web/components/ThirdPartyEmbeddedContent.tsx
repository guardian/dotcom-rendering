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
	onAccept?: Function;
};

export const ThirdPartyEmbeddedContent = ({
	children,
	width,
	height,
	isTracking,
	source,
	sourceDomain,
	onAccept,
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
		const noOp = () => {};

		return (
			<ClickToView
				width={width}
				height={height}
				overlayHeadline={headline}
				overlayBody={body}
				overlayButtonText={buttonText}
				onAccept={onAccept || noOp}
			>
				{children}
			</ClickToView>
		);
	}

	return <div>{children}</div>;
};
