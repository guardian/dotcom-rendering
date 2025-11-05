import {
	headlineBold17Object,
	palette,
	space,
} from '@guardian/source/foundations';
import { type Section as SectionModel } from './appsNav';
import { SectionButtons } from './SectionButtons';
import { SvgChevronDownSingle } from '@guardian/source/react-components';
import type { ReactNode } from 'react';

type Props = {
	sections: SectionModel[];
	guardianBaseUrl: string;
	location: number[];
};

export const Sections = (props: Props) => (
	<ul css={{ paddingLeft: space[5] }}>
		{props.sections.map((section, index, sections) => (
			<Section
				key={`${section.title}-${section.path}`}
				section={section}
				guardianBaseUrl={props.guardianBaseUrl}
				location={[...props.location, index]}
				index={index}
				numberOfSections={sections.length}
			/>
		))}
	</ul>
);

const Section = (props: {
	section: SectionModel;
	guardianBaseUrl: string;
	location: number[];
	index: number;
	numberOfSections: number;
}) => (
	<Li>
		<WithSubSections
			subSections={props.section.sections}
			guardianBaseUrl={props.guardianBaseUrl}
			location={props.location}
		>
			<SectionButtons
				location={props.location}
				title={props.section.title}
				path={props.section.path}
				mobileOverride={props.section.mobileOverride}
				index={props.index}
				numberOfSections={props.numberOfSections}
			/>
			<Chevron subSections={props.section.sections} />
			<Title location={props.location}>{props.section.title}</Title>{' '}
			<Path
				path={props.section.path}
				guardianBaseUrl={props.guardianBaseUrl}
			/>
		</WithSubSections>
	</Li>
);

const Li = (props: { children: ReactNode }) => (
	<li
		css={{
			borderTop: '1px solid lightgrey',
			display: 'flex',
			alignItems: 'center',
		}}
	>
		{props.children}
	</li>
);

const WithSubSections = (props: {
	subSections: SectionModel[] | undefined;
	guardianBaseUrl: Props['guardianBaseUrl'];
	location: Props['location'];
	children: ReactNode;
}) => {
	if (props.subSections === undefined || props.subSections.length === 0) {
		return <>{props.children}</>;
	}

	return (
		<details css={{ flexGrow: 1 }}>
			<Summary>{props.children}</Summary>
			<Sections
				sections={props.subSections}
				guardianBaseUrl={props.guardianBaseUrl}
				location={props.location}
			/>
		</details>
	);
};

const Summary = (props: { children: ReactNode }) => (
	<summary
		css={{
			display: 'flex',
			alignItems: 'center',
			cursor: 'pointer',
		}}
	>
		{props.children}
	</summary>
);

const Chevron = (props: { subSections: SectionModel[] | undefined }) => {
	const hasSubSections =
		props.subSections !== undefined && props.subSections.length > 0;

	return (
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
			{hasSubSections ? <SvgChevronDownSingle /> : null}
		</span>
	);
};

const Title = (props: { children: ReactNode; location: number[] }) => (
	<span
		css={{
			...headlineBold17Object,
			paddingLeft: space[2],
			paddingTop: space[2],
			paddingBottom: space[2],
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
