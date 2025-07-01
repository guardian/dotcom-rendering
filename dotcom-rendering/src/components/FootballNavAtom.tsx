import { css } from '@emotion/react';
import type { FootballNavAtom as FootballNavAtomModel } from '../footballNavAtom';
import { grid } from '../grid';
import { unifyPageContent } from '../lib/unifyPageContent';

export const FootballNavAtom = ({
	navAtom,
}: {
	navAtom: FootballNavAtomModel | undefined;
}) =>
	navAtom !== undefined ? (
		<iframe
			title="Navigation for the current football competition"
			css={{
				width: '100%',
				['&']: css(grid.column.all),
				gridRow: 1,
			}}
			srcDoc={unifyPageContent({
				elementCss:
					navAtom.css +
					'body { margin: 0; } .Sports-header { margin-left: 0 !important; border: none !important; }',
				elementJs: navAtom.mainJS,
				elementHtml: navAtom.html,
				renderingTarget: 'Web',
			})}
			sandbox="allow-scripts"
		/>
	) : null;
