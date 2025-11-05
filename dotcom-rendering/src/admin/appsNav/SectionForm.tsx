import {
	headlineBold24Object,
	palette,
	space,
} from '@guardian/source/foundations';
import { TextInput, Button, Select } from '@guardian/source/react-components';
import {
	useState,
	useRef,
	type FormEventHandler,
	useEffect,
	type ReactNode,
	useCallback,
	type ChangeEventHandler,
} from 'react';
import { css } from '@emotion/react';
import { mobileOverrideOptions, type MobileOverride } from './appsNav';

type Props = {
	heading: string;
	open: boolean;
	initialTitle: string;
	initialPath: string;
	initialMobileOverride: MobileOverride | undefined;
	submit: (
		title: string,
		url: URL,
		mobileOverride: MobileOverride | undefined,
	) => void;
	cancel: () => void;
};

export const SectionForm = (props: Props) => {
	const [title, setTitle] = useState(props.initialTitle);
	const [url, setUrl] = useState(props.initialPath);
	const [mobileOverride, setMobileOverride] = useState<
		MobileOverride | undefined
	>(props.initialMobileOverride);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		props.submit(title, new URL(url), mobileOverride);
	};

	return (
		<Dialog open={props.open}>
			<Heading>{props.heading}</Heading>
			<form action="" onSubmit={submit}>
				<TitleInput title={title} setTitle={setTitle} />
				<UrlInput url={url} setUrl={setUrl} />
				<MobileOverrideSelect
					mobileOverride={mobileOverride}
					setMobileOverride={setMobileOverride}
				/>
				<Buttons cancel={props.cancel} />
			</form>
		</Dialog>
	);
};

const Dialog = (props: { children: ReactNode; open: boolean }) => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	// Required for the `::backdrop` pseudo-element, otherwise we could use the
	// `open` attribute.
	useEffect(() => {
		if (props.open) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [props.open]);

	return (
		<dialog
			css={{
				width: 'min(500px, 95vw)',
				'::backdrop': {
					backgroundColor: palette.neutral[10],
					opacity: 0.7,
				},
			}}
			ref={dialogRef}
		>
			{props.children}
		</dialog>
	);
};

const Heading = (props: { children: ReactNode }) => (
	<h2
		css={{
			...headlineBold24Object,
			paddingBottom: space[5],
		}}
	>
		{props.children}
	</h2>
);

const TitleInput = (props: {
	title: string;
	setTitle: (a: string) => void;
}) => (
	<TextInput
		label="Title"
		value={props.title}
		onChange={(e) => props.setTitle(e.target.value)}
		cssOverrides={css({
			marginBottom: space[5],
		})}
	/>
);

const UrlInput = (props: { url: string; setUrl: (a: string) => void }) => (
	<TextInput
		label="Dotcom Link"
		type="url"
		pattern="https://www.theguardian\.com/.*"
		placeholder="https://www.theguardian.com/uk/sport"
		value={props.url}
		onChange={(e) => props.setUrl(e.target.value)}
		cssOverrides={css({
			marginBottom: space[5],
		})}
	/>
);

const MobileOverrideSelect = (props: {
	mobileOverride: MobileOverride | undefined;
	setMobileOverride: (a: MobileOverride | undefined) => void;
}) => {
	const onChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
		(e) => {
			if (isMobileOverride(e.target.value)) {
				props.setMobileOverride(e.target.value);
			} else {
				props.setMobileOverride(undefined);
			}
		},
		[props.setMobileOverride],
	);

	return (
		<Select
			label="Mobile override"
			value={props.mobileOverride}
			onChange={onChange}
			cssOverrides={css({
				marginBottom: space[8],
			})}
		>
			<option value={undefined}>None</option>
			{mobileOverrideOptions.map((value) => (
				<option key={value} value={value}>
					{value}
				</option>
			))}
		</Select>
	);
};

/**
 * `Array.includes` requires the value passed to it to be the same type as the
 * elements in the array. However, we have the following:
 *
 * - Elements in the array are a union of string literals, i.e. a fixed list of
 * specific strings.
 * - The value we need to pass to `includes` (`event.target.value`) is of type
 * `string`.
 *
 * `string` is a wider type than our union of string literals, and you can't
 * pass a wider type to a narrower one. Therefore, we have to write this type
 * guard with some type casting if we want to use `includes`. The reason we want
 * to use `includes` is because it will automatically include any changes to the
 * `mobileOverrideOptions` array. Otherwise we could use `switch` or `if` to
 * narrow a predefined list of values.
 */
const isMobileOverride = (s: string): s is MobileOverride =>
	(mobileOverrideOptions as unknown as string[]).includes(s);

const Buttons = (props: { cancel: Props['cancel'] }) => (
	<>
		<Button type="submit">Submit</Button>
		<Button
			cssOverrides={css({ marginLeft: space[2] })}
			onClick={props.cancel}
			priority="tertiary"
		>
			Cancel
		</Button>
	</>
);
