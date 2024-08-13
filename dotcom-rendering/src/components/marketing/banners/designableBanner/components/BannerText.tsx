import React from 'react';
import { css, SerializedStyles } from '@emotion/react';

type BannerTextStyleableAreas =
	| 'container'
	| 'heading'
	| 'subheading'
	| 'body'
	| 'copy'
	| 'highlightedText';

export type BannerTextStyles = {
	[key in BannerTextStyleableAreas]?: SerializedStyles | SerializedStyles[];
};

const styles = {
	paragraphs: css`
		> :first-child {
			margin-top: 0;
		}
		> :last-child {
			margin-bottom: 0;
		}
	`,
};

export const createBannerBodyCopy = (
	paragraphs: (Array<JSX.Element> | JSX.Element)[],
	highlightedText: Array<JSX.Element> | JSX.Element | null | undefined,
	renderStyles: BannerTextStyles,
): JSX.Element[] | JSX.Element => {
	const paragraphsToProcess = Array.isArray(paragraphs)
		? paragraphs
		: [paragraphs];
	const numberOfNonFinalParagraphs = paragraphsToProcess.length - 1;

	// To cover situations where there are no paragraphs to process
	if (numberOfNonFinalParagraphs < 0) {
		return (
			<div css={styles.paragraphs}>
				{highlightedText && (
					<p>
						<span css={renderStyles.highlightedText}>
							{highlightedText}
						</span>
					</p>
				)}
			</div>
		);
	}

	return (
		<div css={styles.paragraphs}>
			{paragraphsToProcess.map((p, index) => {
				if (index < numberOfNonFinalParagraphs) {
					return <p key={index}>{p}</p>;
				}
				return (
					<p key={index}>
						{p}{' '}
						{highlightedText && (
							<span css={renderStyles.highlightedText}>
								{highlightedText}
							</span>
						)}
					</p>
				);
			})}
		</div>
	);
};
