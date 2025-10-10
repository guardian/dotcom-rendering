import { headlineBold17Object, palette } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import type { AppsNav, Section } from './appsNav';

type Props = {
	ukNav: AppsNav;
	guardianBaseUrl: string;
};

export const AppsNavTool = (props: Props) => (
	<Sections
		sections={props.ukNav.pillars}
		guardianBaseUrl={props.guardianBaseUrl}
	/>
);

const Sections = (props: { sections: Section[]; guardianBaseUrl: string }) => (
	<ul css={{ paddingLeft: 20 }}>
		{props.sections.map((section) => (
			<Section
				key={`${section.title}-${section.path}`}
				section={section}
				guardianBaseUrl={props.guardianBaseUrl}
			/>
		))}
	</ul>
);

const Section = (props: { section: Section; guardianBaseUrl: string }) => (
	<li>
		<Title>{props.section.title}</Title>{' '}
		<Path
			path={props.section.path}
			guardianBaseUrl={props.guardianBaseUrl}
		/>
		{props.section.sections !== undefined ? (
			<Sections
				sections={props.section.sections}
				guardianBaseUrl={props.guardianBaseUrl}
			/>
		) : null}
	</li>
);

const Title = (props: { children: ReactNode }) => (
	<span css={headlineBold17Object}>{props.children}</span>
);

const Path = (props: { path: string; guardianBaseUrl: string }) => (
	<span
		css={{
			fontSize: 17,
			fontFamily: 'monospace',
		}}
	>
		(
		<a
			href={new URL(props.path, props.guardianBaseUrl).href}
			css={{ color: palette.brand[500] }}
		>
			{props.path}
		</a>
		)
	</span>
);
