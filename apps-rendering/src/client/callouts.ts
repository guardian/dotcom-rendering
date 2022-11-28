type FormData = Record<string, string | string[]>;

function readFile(file: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		setTimeout(reject, 30000);

		reader.addEventListener('load', () => {
			if (reader.result) {
				const fileAsBase64 = reader.result
					.toString()
					.split(';base64,')[1];
				resolve(fileAsBase64);
			}
		});

		reader.addEventListener('error', () => {
			reject();
		});

		reader.readAsDataURL(file);
	});
}

type FormElementType =
	| HTMLInputElement
	| HTMLTextAreaElement
	| HTMLSelectElement;
const getValueFromElement = async (
	element: FormElementType,
	acc: FormData,
): Promise<FormData> => {
	const { type, name, value } = element;
	if (type === 'radio') {
		const radioElement = element as HTMLInputElement;
		if (radioElement.checked) {
			acc[name] = value;
		}
		// TODO: How do we handle checkboxes in formstack?
		// } else if (type === 'checkbox') {
		// 	if (checked) {
		// 		acc[name] ? acc[name].push(value) : (acc[name] = [value]);
		// 	}
	} else if (type === 'file') {
		const fileElement = element as HTMLInputElement;
		if (fileElement.files?.length) {
			acc[name] = await readFile(fileElement.files[0]);
		}
	} else if (value) {
		acc[name] = value;
	}
	return Promise.resolve(acc);
};

function submitCallout(body: FormData, form: Element): void {
	// TODO: Check this is still the correct endpoint
	fetch(
		'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
		{
			method: 'POST',
			body: JSON.stringify(body),
		},
	)
		.then(() => {
			form.classList.add('js-callout-success');
		})
		.catch(() => {
			form.classList.add('js-callout--failure');
		});
}

export async function handleSubmission(): Promise<void> {
	const form = document.querySelector('form');
	if (!form) return;
	try {
		const inputElements = form.getElementsByTagName('input');
		const textAreaElements = form.getElementsByTagName('textarea');
		const selectElements = form.getElementsByTagName('select');
		const elements = [
			...inputElements,
			...textAreaElements,
			...selectElements,
		];

		const data = Array.from(elements).reduce(
			async (o: Promise<FormData>, elem) => {
				const acc = await o;
				await getValueFromElement(elem, acc);
				return Promise.resolve(acc);
			},
			Promise.resolve({}),
		);

		submitCallout(await data, form);
	} catch (e) {
		form.classList.add('js-callout--failure');
	}
}

function setup(form: Element): void {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		handleSubmission().catch((err: unknown) => {
			console.error(err);
		});
	});
}

function callouts(): void {
	const calloutForms = Array.from(document.querySelectorAll('.js-callout'));
	if (!calloutForms.length) {
		return;
	}
	calloutForms.forEach(setup);
}

export { callouts };
