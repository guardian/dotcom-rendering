import fetch from 'node-fetch';

// WARNING
// This is a TEMP solution.
// It is the simplest route to showing the anniversary atom, while being able to then
// strip out the code as easily as possible, as opposed to actors in Frontend.

interface AtomResponse {
	response: {
		interactive: {
			id: string;
			data: {
				interactive: {
					css: string;
					mainJS: string;
					html: string;
					id: string;
				};
			};
		};
	};
}

export const InteractiveAtomUrl =
	'https://content.guardianapis.com/atom/interactive/interactives/thrashers/2021/04/g200-article-banner/default?api-key=HOWDOIGETTHIS';

let AnniversaryAtomCache: InteractiveAtomBlockElement | undefined;
export const getAnniversaryAtomCache = ():
	| InteractiveAtomBlockElement
	| undefined => AnniversaryAtomCache;

const fetchAnniversaryAtom = (): Promise<void> => {
	return fetch(InteractiveAtomUrl)
		.then((rawResponse) => rawResponse.json())
		.then((atom: AtomResponse) => {
			const { id } = atom?.response?.interactive;

			const {
				css,
				mainJS,
				html,
			} = atom?.response?.interactive?.data?.interactive;

			if (css && mainJS && html && id) {
				console.log('in here');
				AnniversaryAtomCache = {
					_type:
						'model.dotcomrendering.pageElements.InteractiveAtomBlockElement',
					url: InteractiveAtomUrl,
					css,
					js: mainJS,
					html,
					id,
					elementId: 'anniversary_atom_main',
				};
			} else {
				AnniversaryAtomCache = undefined;
			}
		});

	// return fetch(InteractiveAtomUrl)
	// 	.then((rawResponse) => rawResponse.json())
	// 	.then((json) => {
	// 		AnniversaryAtomCache = json;
	// 	});
};

const oneMinute = 60_00;
const refreshAnniversaryAtom = () => {
	setTimeout(() => {
		fetchAnniversaryAtom()
			.then(refreshAnniversaryAtom)
			.catch((e) => console.error(`fetchAnniversaryAtom - error: ${e}`));
	}, oneMinute * 2);
};

fetchAnniversaryAtom()
	.then(refreshAnniversaryAtom)
	.catch((e) => console.error(`fetchIAnniversaryAtom - error: ${e}`));
