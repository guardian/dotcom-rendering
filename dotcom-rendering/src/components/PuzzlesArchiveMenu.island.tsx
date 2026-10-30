import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans14,
	textSans15,
	until,
} from '@guardian/source/foundations';
import { useEffect, useRef } from 'react';
import type { PuzzleItem } from '../types/puzzlesPage';

type Props = {
	archives: PuzzleItem[];
	label?: string;
};

const getArchiveUrl = (item: PuzzleItem): string | undefined => {
	const slug = item.slug;
	if (
		item.variant === 'archive-page' &&
		slug !== undefined &&
		slug.length > 0
	) {
		return `/puzzles-and-games/${slug}/archive`;
	}
	const url = item.url;
	if (
		url !== undefined &&
		(url.startsWith('/puzzles-and-games') ||
			url.startsWith('/crosswords/series/') ||
			/^https?:\/\//.test(url))
	) {
		return url;
	}
	return undefined;
};

const wrapperStyles = css`
	position: relative;
	display: block;
	width: max-content;
	margin-top: 20px;
	margin-left: auto;

	${from.tablet} {
		margin-top: 28px;
		margin-left: 0;
	}

	${from.desktop} {
		margin-top: 40px;
	}
`;

const summaryStyles = css`
	position: relative;
	display: inline-flex;
	min-height: 24px;
	align-items: center;
	gap: ${space[2]}px;
	padding: 0;
	border: 0;
	background: var(--puzzles-page-background, ${palette.neutral[100]});
	color: var(--puzzles-headline-colour, ${palette.neutral[7]});
	cursor: pointer;
	list-style: none;
	${textSans14};
	/* Preserve a 44px pointer target around the 24px archive label. */
	::before {
		position: absolute;
		inset: -10px 0;
		content: '';
	}

	::-webkit-details-marker {
		display: none;
	}

	:focus-visible {
		outline: none;
		text-decoration: underline;
		text-decoration-thickness: 2px;
	}
`;

const arrowStyles = css`
	display: block;
	flex-shrink: 0;
	transform-origin: center;

	details[open] & {
		transform: rotate(180deg);
	}
`;

const menuStyles = css`
	position: absolute;
	z-index: 20;
	top: calc(100% + ${space[1]}px);
	left: 0;
	min-width: 209px;
	margin: 0;
	padding: 0;
	border: 1px solid var(--puzzles-border-colour, ${palette.neutral[86]});
	background: var(--puzzles-card-background, ${palette.neutral[100]});
	list-style: none;

	/*
	 * Below the tablet breakpoint the archive label sits against the right
	 * edge, so open the menu leftwards to keep it inside the page. The
	 * section inset is 10px below mobileMedium and 20px from it, so the menu
	 * always ends 20px from the right edge of the viewport.
	 */
	${until.tablet} {
		right: 0;
		left: auto;
	}
	${until.mobileMedium} {
		right: 10px;
	}

	/* Opens upwards when there is not enough room below (see placeMenu). */
	&[data-placement='top'] {
		top: auto;
		bottom: calc(100% + ${space[1]}px);
	}
`;

const linkStyles = css`
	display: flex;
	box-sizing: border-box;
	min-height: 45px;
	align-items: flex-start;
	padding: ${space[3]}px ${space[4]}px;
	border-bottom: 1px solid
		var(--puzzles-border-colour, ${palette.neutral[86]});
	color: var(--puzzles-headline-colour, ${palette.neutral[0]});
	text-decoration: none;
	${textSans15};
	line-height: 1.3;

	:hover,
	:focus-visible {
		background: ${palette.neutral[93]};
		text-decoration: underline;
	}

	li:last-child & {
		border-bottom: 0;
	}
`;

export const PuzzlesArchiveMenu = ({
	archives,
	label = 'Puzzle archives',
}: Props) => {
	const detailsRef = useRef<HTMLDetailsElement>(null);
	const summaryRef = useRef<HTMLElement>(null);
	const menuRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const close = (event: Event) => {
			const details = detailsRef.current;
			if (details?.open !== true) {
				return;
			}
			if (event instanceof KeyboardEvent) {
				if (event.key !== 'Escape') return;
			} else if (event.composedPath().includes(details)) {
				return;
			}
			details.open = false;
			if (event instanceof KeyboardEvent) summaryRef.current?.focus();
		};
		document.addEventListener('pointerdown', close, true);
		document.addEventListener('mousedown', close, true);
		document.addEventListener('click', close, true);
		document.addEventListener('keydown', close);
		return () => {
			document.removeEventListener('pointerdown', close, true);
			document.removeEventListener('mousedown', close, true);
			document.removeEventListener('click', close, true);
			document.removeEventListener('keydown', close);
		};
	}, []);

	const validArchives = archives.flatMap((archive) => {
		const url = getArchiveUrl(archive);
		return url !== undefined ? [{ archive, url }] : [];
	});
	if (validArchives.length === 0) {
		return null;
	}

	/**
	 * Opens the menu upwards when it does not fit below the label and there
	 * is more room above it.
	 */
	const placeMenu = () => {
		const menu = menuRef.current;
		const summary = summaryRef.current;
		if (!menu || !summary || detailsRef.current?.open !== true) return;
		const { top, bottom } = summary.getBoundingClientRect();
		const spaceBelow = window.innerHeight - bottom - space[1];
		const spaceAbove = top - space[1];
		menu.dataset.placement =
			menu.offsetHeight > spaceBelow && spaceAbove > spaceBelow
				? 'top'
				: 'bottom';
	};

	return (
		<details css={wrapperStyles} onToggle={placeMenu} ref={detailsRef}>
			<summary css={summaryStyles} ref={summaryRef}>
				{label}{' '}
				<svg
					width="9"
					height="5"
					viewBox="0 0 9 5"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					focusable="false"
					css={arrowStyles}
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M3.05176e-05 0.712324L3.82876 5H4.55936L8.38813 0.712328L7.69406 0L4.19403 3L0.694092 0L3.05176e-05 0.712324Z"
						fill="currentColor"
					/>
				</svg>
			</summary>
			<ul aria-label={label} css={menuStyles} ref={menuRef}>
				{validArchives.map(({ archive, url }) => (
					<li key={archive.id}>
						<a
							css={linkStyles}
							href={url}
							{...(/^https?:\/\//.test(url)
								? {
										rel: 'noopener noreferrer',
										target: '_blank',
									}
								: {})}
						>
							{archive.title}
						</a>
					</li>
				))}
			</ul>
		</details>
	);
};
