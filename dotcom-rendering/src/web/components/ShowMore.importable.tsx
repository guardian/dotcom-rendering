import { Button, SvgPlus } from '@guardian/source-react-components';

/**
 * addDoc
 * @param collectionId
 * @param ajaxUrl
 */

// function getUrl(collectionId: string, ajaxUrl: string): string | undefined {
// 	try {
// 		const url = new URL(`${collectionId}`, ajaxUrl);
// 		url.searchParams.set('dcr', 'true');
//
// 		return url.href;
// 	} catch {
// 		window.guardian.modules.sentry.reportError(
// 			new Error(
// 				`An error was thrown trying to get more cards using collectionId: ${collectionId} and ajaxUrl: ${ajaxUrl}`,
// 			),
// 			'fronts-showMoreCards',
// 		);
// 		// Returning undefined here means the request is never made
// 		// See: https://swr.vercel.app/docs/conditional-fetching#conditional
// 		return undefined;
// 	}
// }

export const ShowMore: React.FC<{
	id: string;
	displayName: string;
}> = ({ displayName }) => {
	return (
		<Button
			priority="primary"
			size="small"
			icon={<SvgPlus />}
			iconSide="left"
			// onClick={TODO: handleClick}
		>
			More {displayName}
		</Button>
	);
};
