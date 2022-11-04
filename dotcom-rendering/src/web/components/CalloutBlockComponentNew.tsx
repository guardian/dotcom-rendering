import { css } from '@emotion/react';
import { body, headline, neutral, news } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import MinusIcon from '../../static/icons/minus.svg';
import PlusIcon from '../../static/icons/plus.svg';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';
import { Form } from './CalloutNew/Form';
import { ShareCalloutComponent } from './ShareCalloutComponent';
import { AgeWarning } from './AgeWarning';

const wrapperStyles = css`
	margin-bottom: 26px;
	margin-top: 16px;
	padding-left: 10px;
	padding-right: 10px;
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

const summaryStyles = css`
	padding-left: 10px;
	padding-right: 10px;
	/* Removing default styles from summery tag */
	ft ::-webkit-details-marker {
		display: none;
	}
	outline: none;

	/* We don't want the summary to open when we click anything but the button, so we pointer-event: none the summary */
	/* 176da211-05aa-4280-859b-1e3157b3f19e */
	pointer-events: none;

	/*
        why hide visibility?
        because we want to prevent the user for tabbing to the summery HTML element
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
`;

const headingTextStyles = (palette: Palette) => css`
	a {
		color: ${palette.text.calloutHeading};
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
`;

const titleStyles = css`
	${headline.xxsmall({ fontWeight: 'bold' })}
	color: ${news[300]}
`;

const subtitleTextHeaderStyles = css`
	${headline.xxsmall()}
	padding-bottom: 8px;
`;

const descriptionStyles = css`
	${body.medium()}
`;

const overlayStyles = css`
	background-image: linear-gradient(
		0deg,
		${neutral[97]},
		${neutral[97]} 40%,
		rgba(255, 255, 255, 0)
	);
	height: 80px;
	position: absolute;
	bottom: 0;
	width: 100%;
	display: block;
`;

const ageWarningStyles = css`
	position: absolute;
	bottom: 8px;
	right: 8px;
	display: block;
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

export const CalloutBlockComponent = ({
	callout,
	format,
}: {
	callout: CalloutBlockElement;
	format: ArticleFormat;
}) => {
	const palette = decidePalette(format);
	const { title, description, formFields } = callout;
	const [isBodyExpanded, setIsBodyExpanded] = useState(false);

	const hideOverlay = () => {
		setIsBodyExpanded(true);
	};
	const showOverlay = () => {
		setIsBodyExpanded(false);
	};

	let expandFormButtonRef: HTMLButtonElement | null = null;
	let firstFieldElementRef: HTMLElement | null = null;
	let lastElementRef: HTMLButtonElement | null = null;

	const [isExpanded, setIsExpanded] = useState(false);

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
					// eslint-disable-next-line @typescript-eslint/no-unused-expressions
					firstFieldElementRef && firstFieldElementRef.focus();
					e.preventDefault();
				}

				if (
					e.shiftKey &&
					document.activeElement === firstFieldElementRef
				) {
					// eslint-disable-next-line @typescript-eslint/no-unused-expressions
					lastElementRef && lastElementRef.focus(); // The shift key is down so loop focus back to the last item
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
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			firstFieldElementRef && firstFieldElementRef.focus();
		}
	}, [isExpanded, firstFieldElementRef]);

	// on close form, focus on expandFormButtonRef
	useEffect(() => {
		if (!isExpanded && expandFormButtonRef && !hasFormBeenOpened) {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			expandFormButtonRef && expandFormButtonRef.focus();
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

	return (
		<>
			<figure data-print-layout="hide" css={wrapperStyles}>
				<details
					css={[calloutDetailsStyles, backgroundColorStyle]}
					aria-hidden={true}
					open={isExpanded}
				>
					<summary css={summaryStyles}>
						<div css={summaryContentWrapper}>
							<div css={headingTextStyles(palette)}>
								<div css={titleStyles}>
									Share your experience
								</div>
								<h4 css={subtitleTextHeaderStyles}>{title}</h4>
								<div css={descriptionStyles}>{description}</div>
							</div>
							<div
								css={overlayStyles}
								style={
									isBodyExpanded
										? { display: 'none' }
										: { display: '' }
								}
							/>
							<div css={ageWarningStyles}>
								<AgeWarning age={'2 weeks'} />
							</div>
							{!isExpanded && (
								<span
									onClick={hideOverlay}
									css={buttonWrapperStyles}
									aria-hidden="true"
								>
									<Button
										css={css`
											/* TODO: need to find an nicer way of dynamically setting svg dimensions */
											background-color: ${neutral[7]};
											svg {
												/* stylelint-disable-next-line declaration-no-important */
												width: 15px !important;
												/* stylelint-disable-next-line declaration-no-important */
												height: 15px !important;
											}
										`}
										iconSide="left"
										size="small"
										icon={<PlusIcon />}
										onClick={() => setIsExpanded(true)}
										custom-guardian="callout-form-open-button"
										tabIndex={0}
									>
										Show more
									</Button>
								</span>
							)}
						</div>
					</summary>
					<ShareCalloutComponent />

					<Form formFields={formFields} onSubmit={() => {}} />
					<span
						css={buttonWrapperStyles}
						aria-hidden="true"
						onClick={showOverlay}
					>
						{isExpanded && (
							<Button
								iconSide="left"
								size="small"
								icon={<MinusIcon />}
								onClick={() => setIsExpanded(false)}
								custom-guardian="callout-form-close-button"
								css={css`
									background-color: ${neutral[100]};
									color: ${neutral[7]};
									border: ${neutral[7]} solid 1px;
								`}
							>
								Show less
							</Button>
						)}
					</span>
				</details>
			</figure>
		</>
	);
};
