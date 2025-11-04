import {
	headlineBold24Object,
	palette,
	space,
} from '@guardian/source/foundations';
import { TextInput, Button } from '@guardian/source/react-components';
import {
	useState,
	useRef,
	type FormEventHandler,
	useEffect,
	type ReactNode,
} from 'react';
import { css } from '@emotion/react';

type Props = {
	heading: string;
	open: boolean;
	initialTitle: string;
	initialPath: string;
	submit: (title: string, url: URL) => void;
	cancel: () => void;
};

export const SectionForm = (props: Props) => {
	const [title, setTitle] = useState(props.initialTitle);
	const [url, setUrl] = useState(props.initialPath);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		props.submit(title, new URL(url));
	};

	return (
		<Dialog open={props.open}>
			<Heading>{props.heading}</Heading>
			<form action="" onSubmit={submit}>
				<TitleInput title={title} setTitle={setTitle} />
				<UrlInput url={url} setUrl={setUrl} />
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
			marginBottom: space[8],
		})}
	/>
);

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
