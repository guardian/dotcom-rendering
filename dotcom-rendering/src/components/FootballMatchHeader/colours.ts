import type { FootballMatch } from '../../footballMatchV2';
import type { ColourName } from '../../paletteDeclarations';

export const primaryText = (matchKind: FootballMatch['kind']): ColourName =>
	matchKind === 'Live'
		? '--football-match-header-live-primary-text'
		: '--football-match-header-fixture-result-primary-text';

/**
 * There is no secondary text colour in the live design, so we just reuse the
 * primary colour in that case to avoid an unnecessary extra colour in the
 * palette.
 */
export const secondaryText = (matchKind: FootballMatch['kind']): ColourName =>
	matchKind === 'Live'
		? '--football-match-header-live-primary-text'
		: '--football-match-header-fixture-result-secondary-text';

export const background = (matchKind: FootballMatch['kind']): ColourName =>
	matchKind === 'Live'
		? '--football-match-header-live-background'
		: '--football-match-header-fixture-result-background';

export const border = (matchKind: FootballMatch['kind']): ColourName =>
	matchKind === 'Live'
		? '--football-match-header-live-border'
		: '--football-match-header-fixture-result-border';

export const selected = (matchKind: FootballMatch['kind']): ColourName =>
	matchKind === 'Live'
		? '--football-match-header-live-selected'
		: '--football-match-header-fixture-result-selected';
