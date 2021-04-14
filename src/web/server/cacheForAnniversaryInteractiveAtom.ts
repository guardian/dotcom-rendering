import fetch from 'node-fetch';
import {
	getGuardianConfiguration,
	GuardianConfiguration,
} from '@frontend/app/aws/aws-parameters';

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

let InteractiveAtomUrl: string | undefined;
let AnniversaryAtomCache: InteractiveAtomBlockElement | undefined;

export const getAnniversaryAtomCache = ():
	| InteractiveAtomBlockElement
	| undefined => AnniversaryAtomCache;

const fetchAnniversaryAtom = (): Promise<void> => {
	if (InteractiveAtomUrl === undefined) {
		return Promise.reject(new Error('Interactive Atom URL not set'));
	}

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
				AnniversaryAtomCache = {
					_type:
						'model.dotcomrendering.pageElements.InteractiveAtomBlockElement',
					url: InteractiveAtomUrl || '',
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
};

const oneMinute = 60_00;
const refreshAnniversaryAtom = () => {
	setTimeout(() => {
		fetchAnniversaryAtom()
			.then(refreshAnniversaryAtom)
			.catch((e) => console.log(`fetchAnniversaryAtom - error: ${e}`));
	}, oneMinute * 2);
};

getGuardianConfiguration('prod')
	.then((config: GuardianConfiguration) => {
		const key = config.getParameter('anniversaryAtomCAPIKey');
		if (key) {
			InteractiveAtomUrl = `https://content.guardianapis.com/atom/interactive/interactives/thrashers/2021/04/g200-article-banner/default?api-key=${key}`;
		}
	})
	.then(fetchAnniversaryAtom)
	.then(refreshAnniversaryAtom)
	.catch((e) => console.log(`fetchIAnniversaryAtom - error: ${e}`));
