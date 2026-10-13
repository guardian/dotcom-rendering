import { css } from 'storybook/theming';
import type { LayoutType } from '../layouts/lib/articleArrangements';
import type { ArticleFormat } from '../lib/articleFormat';
import type { RoleType } from '../types/content';
import { defaultRoleStyles } from './Figure';

export type InteractiveLayoutAtomType = {
	id: string;
	elementHtml?: string;
	elementJs?: string;
	elementCss?: string;
	customData?: string;
	role: RoleType | 'fullWidth';
	format: ArticleFormat;
	articleArrangement?: LayoutType;
};

export const InteractiveLayoutAtom = ({
	id,
	elementHtml,
	elementJs,
	elementCss,
	customData,
	role,
	format,
	articleArrangement,
}: InteractiveLayoutAtomType) => (
	<div
		className="interactive interactive-atom"
		css={
			// Interactive atoms in the grid based layout (i.e. with an article arrangement)
			// have default role styles applied as they no longer have a figure wrapper
			articleArrangement
				? defaultRoleStyles(role, format)
				: css`
						margin: 0;
						padding: 0;
					`
		}
		data-atom-id={id}
		data-atom-type="interactive-layout"
		{...(customData ? { 'data-atom-custom-data': customData } : {})}
	>
		{!!elementCss && (
			<style
				data-testid="style"
				dangerouslySetInnerHTML={{ __html: elementCss }}
			/>
		)}
		{!!elementHtml && (
			<div
				className="interactive-wrapper"
				dangerouslySetInnerHTML={{ __html: elementHtml }}
			/>
		)}
		{!!elementJs && (
			<script
				data-testid="script"
				dangerouslySetInnerHTML={{ __html: elementJs }}
			/>
		)}
	</div>
);
