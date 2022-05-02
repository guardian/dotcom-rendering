/**
 * When a container is given a special `containerPalette` then this function decides the override colours to be used
 * for it and its cards
 *
 * @see {@link https://github.com/guardian/interactive-atom-container-colours/blob/master/shared/css/_variables.scss Frontend code}
 * @param {DCRContainerPalette} containerPalette
 * @returns {FrontPalette} an object with the overrides set as properties
 */
export const decideFrontPalette = (
	containerPalette: DCRContainerPalette,
): FrontPalette => {
	switch (containerPalette) {
		case 'LongRunningPalette':
			return {
				containerBorder: 'rgba(0,0,0, 0.2)',
				cardHeadline: '#ffffff',
				containerBackground: '#e4e5e8',
				containerText: '#052962',
				dynamoHeadline: '#052962',
				dynamoKicker: '#c70000',
				dynamoSublinkKicker: '#ff9081',
				dynamoMeta: '#052962',
				cardBackground: '#052962',
				cardKicker: '#ff9081',
				toggle: '#333333',
				commentCount: '#DCDCDC',
			};
		case 'LongRunningAltPalette':
			return {
				containerBorder: 'rgba(0,0,0, 0.2)',
				cardHeadline: '#121212',
				containerBackground: '#f2f2f2',
				containerText: '#121212',
				dynamoHeadline: '#121212',
				dynamoKicker: '#8b0000',
				dynamoSublinkKicker: '#8b0000',
				dynamoMeta: '#dcdcdc',
				cardBackground: '#dcdcdc',
				cardKicker: '#8b0000',
				toggle: '#333333',
				commentCount: '#707070',
			};
		case 'SombrePalette':
			return {
				containerBorder: 'rgba(255,255,255, 0.2)',
				cardHeadline: '#ffffff',
				containerBackground: '#595c5f',
				containerText: '#ffffff',
				dynamoHeadline: '#ffffff',
				dynamoKicker: '#c1d8fc',
				dynamoSublinkKicker: '#c1d8fc',
				dynamoMeta: '#3f464a',
				cardBackground: '#3f464a',
				cardKicker: '#c1d8fc',
				toggle: '#dcdcdc',
				commentCount: '#dcdcdc',
			};
		case 'SombreAltPalette':
			return {
				containerBorder: 'rgba(255,255,255, 0.2)',
				cardHeadline: '#ffffff',
				containerBackground: '#3f464a',
				containerText: '#ffffff',
				dynamoHeadline: '#ffffff',
				dynamoKicker: '#ff5943',
				dynamoSublinkKicker: '#ff5943',
				dynamoMeta: '#222527',
				cardBackground: '#222527',
				cardKicker: '#ff5943',
				toggle: '#dcdcdc',
				commentCount: '#999999',
			};
		case 'InvestigationPalette':
			return {
				containerBorder: 'rgba(255,255,255, 0.2)',
				cardHeadline: '#ffffff',
				containerBackground: '#595c5f',
				containerText: '#ffffff',
				dynamoHeadline: '#ffffff',
				dynamoKicker: '#ffe500',
				dynamoSublinkKicker: '#ffe500',
				dynamoMeta: '#3f464a',
				cardBackground: '#3f464a',
				cardKicker: '#ffe500',
				toggle: '#f6f6f6',
				commentCount: '#dcdcdc',
			};
		case 'BreakingPalette':
			return {
				containerBorder: 'rgba(0,0,0, 0.2)',
				cardHeadline: '#ffffff',
				containerBackground: '#ffffff',
				containerText: '#121212',
				dynamoHeadline: '#121212',
				dynamoKicker: '#8b0000',
				dynamoSublinkKicker: '#8b0000',
				dynamoMeta: '#8b0000',
				cardBackground: '#8b0000',
				cardKicker: '#ffbac8',
				toggle: '#707070',
				commentCount: '#dcdcdc',
			};
		case 'EventPalette':
			return {
				containerBorder: 'rgba(0,0,0, 0.2)',
				cardHeadline: '#041F4A',
				containerBackground: '#f1f8fc',
				containerText: '#041F4A',
				dynamoHeadline: '#041F4A',
				dynamoKicker: '#c70000',
				dynamoSublinkKicker: '#c70000',
				dynamoMeta: '#ededed',
				cardBackground: '#ededed',
				cardKicker: '#c70000',
				toggle: '#707070',
				commentCount: '#707070',
			};
		case 'EventAltPalette':
		default:
			return {
				containerBorder: 'rgba(0,0,0, 0.2)',
				cardHeadline: '#041F4A',
				containerBackground: '#fbf6ef',
				containerText: '#041f4a',
				dynamoHeadline: '#041F4A',
				dynamoKicker: '#c70000',
				dynamoSublinkKicker: '#c70000',
				dynamoMeta: '#ededed',
				cardBackground: '#efe8dd',
				cardKicker: '#e2352d',
				toggle: '#707070',
				commentCount: '#333333',
			};
	}
};
