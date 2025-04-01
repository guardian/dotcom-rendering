import { maybeSIndicatorCapiKey } from './userFeatures/cookies/sIndicatorCapiKey';

type Content = { id: string; rights: { syndicatable: string } };

const DOTCOM = 'https://www.theguardian.com/';

/**
 * This is a port/rewrite of the sIndicator browser extension (https://github.com/guardian/sIndicator)
 * which aims to display the syndication status of content.
 *
 * If the 'GU_SINDICATOR_CAPI_KEY' cookie is defined, via syndication subdomain (see https://github.com/guardian/reuse-content)
 * then this script is loaded and uses the key defined in that cookie to visually augment pages with syndication status
 * of the piece and any onward journeys (including fronts etc.).
 */

const overallRoundelElementId = 'gu-sindicator-roundel';

const displaySIndicatorRoundel = (
	status: 'hide' | 'loading' | 'syndicatable' | 'not-syndicatable' | 'error',
): void => {
	const roundelElement =
		document.getElementById(overallRoundelElementId) ??
		(() => {
			const newElem = document.createElement('a');
			newElem.id = overallRoundelElementId;
			document.body.appendChild(newElem);
			return newElem;
		})();

	if (status === 'hide') {
		roundelElement.remove();
		return;
	}

	roundelElement.style.position = 'fixed';
	roundelElement.style.bottom = '20px';
	roundelElement.style.left = '20px';
	roundelElement.style.zIndex = '79999';
	roundelElement.style.overflow = 'hidden';
	roundelElement.style.padding = '10px';
	roundelElement.style.fontSize = '18px';
	roundelElement.style.lineHeight = '23px';
	roundelElement.style.textAlign = 'center';
	roundelElement.style.borderRadius = '7px';
	roundelElement.style.width = '40px';
	roundelElement.style.height = '40px';

	roundelElement.style.cursor = 'pointer';
	roundelElement.setAttribute(
		'href',
		window.location.hostname === 'localhost'
			? 'http://localhost:4200/sIndicator'
			: `https://syndication.${window.location.hostname.replace(
					/^(m\.|www\.)/i,
					'',
			  )}/sIndicator`,
	);

	switch (status) {
		case 'loading':
			roundelElement.title = 'Checking syndication status...';
			roundelElement.style.backgroundColor = 'lightblue';
			roundelElement.textContent = '⏳';
			break;
		case 'syndicatable':
			roundelElement.title = 'This content is syndicatable';
			roundelElement.style.backgroundColor = 'green';
			roundelElement.textContent = '✅';
			break;
		case 'not-syndicatable':
			roundelElement.title = 'This content is NOT syndicatable';
			roundelElement.style.backgroundColor = 'red';
			roundelElement.textContent = '⛔';
			break;
		case 'error':
			roundelElement.title =
				'There was an error checking syndication status. Click to check your CAPI key...';
			roundelElement.style.backgroundColor = 'yellow';
			roundelElement.textContent = '⚠️';
			break;
	}
};

const augmentOnwardAnchor =
	(syndicatable: boolean) => (element: HTMLElement) => {
		const shadowColour = syndicatable ? 'green' : 'red';
		const shadowPosition =
			element.parentElement &&
			getComputedStyle(element.parentElement).getPropertyValue(
				'overflow',
			) === 'hidden'
				? 'inset'
				: '';
		element.style.boxShadow = `${shadowPosition} 0 0 4px 3px ${shadowColour}`;
		if (
			getComputedStyle(element).getPropertyValue('display') === 'inline'
		) {
			element.style.display = 'inline-block';
		}
	};

export const sIndicator = async (): Promise<void> => {
	console.log('sIndicator running!');

	if (!maybeSIndicatorCapiKey) {
		console.error(
			"sIndicator: no CAPI key found - sIndicator shouldn't be running",
		);
		return;
	}

	displaySIndicatorRoundel('loading');

	const capiKey = maybeSIndicatorCapiKey;

	const pathname = window.location.pathname;

	const capiIdFromPath = pathname.includes(DOTCOM) // when running locally (i.e. proxying)
		? pathname.substring(pathname.indexOf(DOTCOM) + DOTCOM.length)
		: pathname;

	const capiUrl = `https://content.guardianapis.com/${capiIdFromPath}?show-rights=all&api-key=${capiKey}`;

	const capiOverallResponse = await fetch(capiUrl).catch(console.error);

	if (capiOverallResponse?.status === 403) {
		console.log(
			'sIndicator: item is not available at this tier (403 response)',
		);
		displaySIndicatorRoundel('not-syndicatable');
		return;
	}

	if (!capiOverallResponse || !capiOverallResponse.ok) {
		console.error(
			`sIndicator: error accessing CAPI ${capiOverallResponse?.status}`,
		);
		displaySIndicatorRoundel('error');
		return;
	}

	const capiOverallJson: { response?: { content?: Content } } =
		await capiOverallResponse.json();

	const capiContent: Content | undefined = capiOverallJson.response?.content;

	if (capiContent) {
		// results for fronts etc. won't have content - so no need to display overall roundel
		const isSyndicatableOverall =
			capiContent.rights.syndicatable === 'true'
				? 'syndicatable'
				: 'not-syndicatable';
		displaySIndicatorRoundel(isSyndicatableOverall);
	}

	const idToSyndicatableLookup: Record<string, boolean> = {}; // built with mutation, in response to DOM changes

	async function findAndProcessOnwardLinks() {
		// all anchors with hrefs starting with a forward slash
		const allOnwardAnchorElements = Array.from(
			document.querySelectorAll<HTMLElement>(
				`a[href^='/'],a[href^='${DOTCOM}']`,
			),
		);

		const onwardIdToElementsLookup = allOnwardAnchorElements.reduce<
			Record<string, HTMLElement[]>
		>((acc, anchorElem) => {
			const href = anchorElem.getAttribute('href');

			if (
				!href?.match(/\/.+\/\d+\/\w+\/\d+\/.+/gi) ||
				href.endsWith('#comments')
			) {
				// links to a piece rather than other front etc.
				return acc;
			}

			// CAPI ID doesn't have preceding forward slash
			const capiId = href.startsWith(DOTCOM)
				? href.substring(DOTCOM.length)
				: href.substring(1);

			return {
				...acc,
				[capiId]: [...(acc[capiId] ?? []), anchorElem],
			};
		}, {});

		const idsAlreadyLookedUp = Object.keys(idToSyndicatableLookup);
		const idsToRequest = Object.keys(onwardIdToElementsLookup).filter(
			(id) => !idsAlreadyLookedUp.includes(id),
		);

		const batchSize = 10;

		for (let i = 0; i < idsToRequest.length; i += batchSize) {
			const ids = idsToRequest.slice(i, i + batchSize);

			const idsParam = encodeURIComponent(ids.join(','));

			const capiOnwardsResponse = await fetch(
				`https://content.guardianapis.com/search?show-rights=all&api-key=${capiKey}&ids=${idsParam}`,
			).catch(console.error);

			if (!capiOnwardsResponse?.ok) {
				console.error(
					'sIndicator: problem looking up onward links in capi',
					capiOnwardsResponse,
				);
				return;
			}

			const capiOnwardsJson: { response: { results: Content[] } } =
				await capiOnwardsResponse.json();

			for (const lookupId of ids) {
				idToSyndicatableLookup[lookupId] =
					capiOnwardsJson.response.results.find(
						({ id }) => lookupId === id,
					)?.rights.syndicatable === 'true';
			}

			for (const [id, isSyndicatable] of Object.entries(
				idToSyndicatableLookup,
			)) {
				const elements = onwardIdToElementsLookup[id];
				if (!elements) {
					console.warn('No elements found for id', id);
				}
				for (const element of elements ?? []) {
					augmentOnwardAnchor(isSyndicatable)(element);
				}
			}
		}
	}

	await findAndProcessOnwardLinks();

	if (!capiContent) {
		displaySIndicatorRoundel('hide');
	}

	// begin watching for any DOM changes (since some onward links are added asynchronously, e.g. Most viewed)
	new MutationObserver(findAndProcessOnwardLinks).observe(document.body, {
		characterData: false,
		childList: true,
		subtree: true,
		characterDataOldValue: false,
		attributes: true,
		attributeOldValue: false,
		attributeFilter: ['href'],
	});
};
