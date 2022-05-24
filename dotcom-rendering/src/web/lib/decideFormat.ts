import { decideDesign } from './decideDesign';
import { decideDisplay } from './decideDisplay';
import { decideTheme } from './decideTheme';

export const decideFormat = (
	format: CAPIFormat | undefined,
): ArticleFormat => ({
	display: decideDisplay(format?.display),
	theme: decideTheme(format?.theme),
	design: decideDesign(format?.design, format?.display),
});
