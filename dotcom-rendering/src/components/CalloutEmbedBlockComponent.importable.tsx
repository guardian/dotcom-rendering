import { css } from '@emotion/react';
import { brand, neutral, textSans } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import { decidePalette } from '../lib/decidePalette';
import { reportErrorToSentry } from '../lib/reportErrorToSentry';
import MinusIcon from '../static/icons/minus.svg';
import PlusIcon from '../static/icons/plus.svg';
import type {
	CalloutBlockElement,
	CalloutBlockElementV2,
} from '../types/content';
import type { Palette } from '../types/palette';
import { Form } from './CalloutEmbed/Form';

const wrapperStyles = css`
	margin-bottom: 26px;
	margin-top: 16px;
`;

const calloutDetailsStyles = css`
	border-top: 1px ${neutral[86]} solid;
	border-bottom: 1px ${neutral[86]} solid;
	position: relative;
	padding-bottom: 10px;

	/* IE does not support summary HTML elements, so we need to hide children ourself */
	:not([open]) > *:not(summary) {
		display: none;
	}
`;

const backgroundColorStyle = css`
	background-color: ${neutral[97]};
`;

const speechBubbleWrapperStyles = css`
	margin-right: 10px;
`;

const successTextStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
`;

const summaryStyles = css`
	/* Removing default styles from summary tag */
	::-webkit-details-marker {
		display: none;
	}
	outline: none;

	/* We don't want the summary to open when we click anything but the button, so we pointer-event: none the summary */
	/* 176da211-05aa-4280-859b-1e3157b3f19e */
	pointer-events: none;

	/*
        why hide visibility?
        because we want to prevent the user for tabbing to the summary HTML element
        without using tabIndex={-1} which would disable focus on all child DOM elements

        NOTE: requires "visibility: visible;" on child elements to display and enable focus
    */
	visibility: hidden;

	a {
		/* but we do want to allow click on links */
		pointer-events: all;
	}
`;

const summaryContentWrapper = css`
	visibility: visible;
	min-height: 70px;
	display: flex;
	flex-direction: row;
`;

const speechBubbleStyles = (palette: Palette) => css`
	${textSans.medium({ fontWeight: 'bold' })}
	color: ${neutral[100]};
	background-color: ${palette.background.speechBubble};
	min-width: 88px;
	padding-bottom: 6px;
	padding-left: 10px;
	padding-right: 10px;
	::after {
		content: '';
		width: 20px;
		height: 22px;
		border-bottom-right-radius: 18px;
		position: absolute;
		background-color: ${palette.background.speechBubble};
	}
`;

const headingTextHeaderStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
`;

const descriptionStyles = css`
	${textSans.xxsmall({ fontWeight: 'bold' })}
`;

const headingTextStyles = css`
	a {
		color: ${brand[500]};
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
`;

const buttonWrapperStyles = css`
	position: absolute;
	cursor: pointer;
	margin-top: -5px;

	visibility: visible;

	/* We need to ensure our pointer-events are turned back on on the button */
	/* 176da211-05aa-4280-859b-1e3157b3f19e */
	pointer-events: all;
`;

// Normally forms are in Modals, but here they are embedded into the page
// we therefore need to only focus on expandFormButtonRef if the form has been closed
// after it was opened
let hasFormBeenOpened = true;

type FormDataType = { [key in string]: unknown };

/**
 * A callout to readers to share their stories.
 *
 * ## Why does this need to be an Island?
 *
 * We are responding to user interactions on the page,
 * and submitting a form via AJAX.
 *
 * ---
 * [`CalloutEmbedBlockComponent` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-calloutembedblockcomponent)
 */
export const CalloutEmbedBlockComponent = ({
	callout,
	format,
}: {
	callout: CalloutBlockElement | CalloutBlockElementV2;
	format: ArticleFormat;
}) => {
	let expandFormButtonRef: HTMLButtonElement | null = null;
	let firstFieldElementRef: HTMLElement | null = null;
	let lastElementRef: HTMLButtonElement | null = null;

	const [isExpanded, setIsExpanded] = useState(false);
	const [error, setError] = useState('');
	const [submissionSuccess, setSubmissionSuccess] = useState(false);

	const palette = decidePalette(format);

	const { title, description, formFields } = callout;

	const onSubmit = async (formData: FormDataType) => {
		// Reset error for new submission attempt
		setError('');

		if (formData.twitterHandle) {
			setError('Sorry we think you are a robot.');
			return;
		}
		// need to add prefix `field_` to all keys in form
		const formDataWithFieldPrefix = Object.keys(formData).reduce(
			(acc, cur) => ({
				...acc,
				[`field_${cur}`]: formData[cur],
			}),
			{},
		);

		return fetch(callout.calloutsUrl, {
			method: 'POST',
			body: JSON.stringify({
				formId: callout.formId,
				// TODO: check if we need to send this
				'twitter-handle': '',
				...formDataWithFieldPrefix,
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then((resp) => {
				if (resp.status === 201) {
					setSubmissionSuccess(true);
					setIsExpanded(false);
				} else {
					setError(
						'Sorry, there was a problem submitting your form. Please try again later.',
					);
				}
			})
			.catch((respError) => {
				reportErrorToSentry(respError, 'callout-embed-submission');
				setError(
					'Sorry, there was a problem submitting your form. Please try again later.',
				);
			});
	};

	// ***************************
	// *     Accessibility       *
	// ***************************
	useEffect(() => {
		// we have to use document.querySelector to find DOM elements
		// as Source library does not yet support react ref
		// TODO: use `useRef` once supported in Source

		// eslint-disable-next-line react-hooks/exhaustive-deps
		expandFormButtonRef = document.querySelector(
			'button[custom-guardian="callout-form-open-button"]',
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
		firstFieldElementRef = document.querySelector(`
            *[custom-guardian="callout-form-field"]:first-of-type input,
            *[custom-guardian="callout-form-field"]:first-of-type select
        `);
		// eslint-disable-next-line react-hooks/exhaustive-deps
		lastElementRef = document.querySelector(
			'button[custom-guardian="callout-form-close-button"]',
		);

		// lock shift to the form
		const keyListener = (e: KeyboardEvent) => {
			// keyCode 9 is tab key
			if (e.keyCode === 9) {
				// If firstElement or lastElement are not defined, do not continue
				if (!firstFieldElementRef || !lastElementRef) return;

				// we use `e.shiftKey` internally to determin the direction of the highlighting
				// using document.activeElement and e.shiftKey we can check what should be the next element to be highlighted
				if (!e.shiftKey && document.activeElement === lastElementRef) {
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- it may be missing
					firstFieldElementRef?.focus();
					e.preventDefault();
				}

				if (
					e.shiftKey &&
					document.activeElement === firstFieldElementRef
				) {
					lastElementRef.focus(); // The shift key is down so loop focus back to the last item
					e.preventDefault();
				}
			}
		};
		document.addEventListener('keydown', keyListener);
		return () => document.removeEventListener('keydown', keyListener);
	}, [isExpanded]);

	// on open form, focus on firstFieldElementRef
	useEffect(() => {
		if (isExpanded && firstFieldElementRef) {
			firstFieldElementRef.focus();
		}
	}, [isExpanded, firstFieldElementRef]);

	// on close form, focus on expandFormButtonRef
	useEffect(() => {
		if (!isExpanded && expandFormButtonRef && !hasFormBeenOpened) {
			expandFormButtonRef.focus();
		}
	}, [isExpanded, expandFormButtonRef]);

	// Normally forms are in Modals, but here they are embedded into the page
	// we therefore need to only focus on expandFormButtonRef if the form has been closed
	// after it was opened
	useEffect(() => {
		if (isExpanded) {
			hasFormBeenOpened = false;
		}
	}, [isExpanded]);

	// be able to close the form using the escape key for accessibility
	useEffect(() => {
		const keyListener = (e: KeyboardEvent) => {
			// keyCode 27 is the escape key, we want to be able to close the form using it
			if (e.keyCode === 27) {
				setIsExpanded(false);
			}
		};
		if (isExpanded) {
			document.addEventListener('keydown', keyListener);
		}
		return () => document.removeEventListener('keydown', keyListener);
	}, [isExpanded, setIsExpanded]);

	if (submissionSuccess) {
		return (
			<figure data-print-layout="hide" css={wrapperStyles}>
				<details
					css={[calloutDetailsStyles, backgroundColorStyle]}
					aria-hidden={true}
					open={isExpanded}
				>
					<summary css={summaryStyles}>
						<div css={summaryContentWrapper}>
							<div css={speechBubbleWrapperStyles}>
								<div css={speechBubbleStyles(palette)}>
									<h4>Share your story</h4>
								</div>
							</div>
							<div css={headingTextStyles}>
								<p css={successTextStyles}>
									Thank you for your contribution
								</p>
							</div>
						</div>
					</summary>
				</details>
			</figure>
		);
	}

	return (
		<figure data-print-layout="hide" css={wrapperStyles}>
			<details
				css={[calloutDetailsStyles, isExpanded && backgroundColorStyle]}
				aria-hidden={true}
				open={isExpanded}
			>
				<summary css={summaryStyles}>
					<div css={summaryContentWrapper}>
						<div css={speechBubbleWrapperStyles}>
							<div css={speechBubbleStyles(palette)}>
								<h4>Share your story</h4>
							</div>
						</div>
						<div css={headingTextStyles}>
							<h4 css={headingTextHeaderStyles}>{title}</h4>
							{!!description && (
								<div
									css={descriptionStyles}
									dangerouslySetInnerHTML={{
										__html: description,
									}}
								/>
							)}
						</div>
					</div>
					{!isExpanded && (
						<span css={buttonWrapperStyles} aria-hidden="true">
							<Button
								css={css`
									/* TODO: need to find an nicer way of dynamically setting svg dimensions */
									svg {
										/* stylelint-disable-next-line declaration-no-important */
										width: 15px !important;
										/* stylelint-disable-next-line declaration-no-important */
										height: 15px !important;
									}
								`}
								iconSide="left"
								size="xsmall"
								icon={<PlusIcon />}
								onClick={() => setIsExpanded(true)}
								custom-guardian="callout-form-open-button"
								tabIndex={0}
							>
								Tell us
							</Button>
						</span>
					)}
				</summary>

				<Form
					formFields={formFields}
					onSubmit={onSubmit}
					error={error}
				/>

				<span css={buttonWrapperStyles} aria-hidden="true">
					{isExpanded && (
						<Button
							iconSide="left"
							size="xsmall"
							icon={<MinusIcon />}
							onClick={() => setIsExpanded(false)}
							custom-guardian="callout-form-close-button"
						>
							Hide
						</Button>
					)}
				</span>
			</details>
		</figure>
	);
};
