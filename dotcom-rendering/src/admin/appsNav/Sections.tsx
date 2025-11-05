import {
	headlineBold17Object,
	palette,
	space,
} from '@guardian/source/foundations';
import { type Section as SectionModel } from './appsNav';
import { SectionActions } from './SectionActions';
import { SvgChevronDownSingle } from '@guardian/source/react-components';
import type { ReactNode } from 'react';

type Props = {
	sections: SectionModel[];
	guardianBaseUrl: string;
	location: number[];
};

export const Sections = (props: Props) => (
	<ul css={{ paddingLeft: 20 }}>
		{props.sections.map((section, index) => (
			<Section
				key={`${section.title}-${section.path}`}
				section={section}
				guardianBaseUrl={props.guardianBaseUrl}
				location={[...props.location, index]}
			/>
		))}
	</ul>
);

const Section = (props: {
	section: SectionModel;
	guardianBaseUrl: string;
	location: number[];
}) => {
	const hasSubsections = (props.section.sections?.length ?? 0) > 0;

	return (
		<li css={{ borderTop: '1px solid lightgrey' }}>
			<details>
				<Summary hasSubsections={hasSubsections}>
					<SectionActions
						location={props.location}
						title={props.section.title}
						path={props.section.path}
						mobileOverride={props.section.mobileOverride}
					/>
					<Chevron hasSubsections={hasSubsections} />
					<Title location={props.location}>
						{props.section.title}
					</Title>{' '}
					<Path
						path={props.section.path}
						guardianBaseUrl={props.guardianBaseUrl}
					/>
				</Summary>
				<SubSections
					subsections={props.section.sections}
					guardianBaseUrl={props.guardianBaseUrl}
					location={props.location}
				/>
			</details>
		</li>
	);
};

const Summary = (props: { hasSubsections: boolean; children: ReactNode }) => (
	<summary
		css={{
			display: 'flex',
			paddingTop: space[1],
			paddingBottom: space[1],
			alignItems: 'center',
		}}
		style={{
			cursor: props.hasSubsections ? 'pointer' : undefined,
		}}
	>
		{props.children}
	</summary>
);

const Chevron = (props: { hasSubsections: boolean }) => (
	<span
		css={{
			width: 20,
			'[open] &': {
				transform: 'rotate(180deg)',
			},
			svg: {
				verticalAlign: 'middle',
			},
		}}
	>
		{props.hasSubsections ? <SvgChevronDownSingle /> : null}
	</span>
);

const Title = (props: { children: ReactNode; location: number[] }) => (
	<span
		css={{
			...headlineBold17Object,
			paddingLeft: space[2],
		}}
	>
		{props.children}
	</span>
);

const Path = (props: { path: string; guardianBaseUrl: string }) => (
	<span
		css={{
			fontSize: 17,
			fontFamily: 'monospace',
			marginLeft: space[2],
		}}
	>
		<a
			href={new URL(props.path, props.guardianBaseUrl).href}
			css={{ color: palette.brand[500] }}
		>
			{props.path}
		</a>
	</span>
);

const SubSections = (props: {
	subsections: SectionModel[] | undefined;
	guardianBaseUrl: Props['guardianBaseUrl'];
	location: Props['location'];
}) => {
	if (props.subsections === undefined) {
		return null;
	}

	return (
		<Sections
			sections={props.subsections}
			guardianBaseUrl={props.guardianBaseUrl}
			location={props.location}
		/>
	);
};
