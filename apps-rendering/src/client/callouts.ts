type FormData = Record<string, string | string[]>;

type FormElementType =
	| HTMLInputElement
	| HTMLTextAreaElement
	| HTMLSelectElement;

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
function submitCallout(body: FormData, form: Element): void {
	fetch(
		'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
		{
			method: 'POST',
			body: JSON.stringify(body),
		},
		).then((res) => {
			if (res.ok) {
				form.classList.add('js-callout--success');
			} else {
				form.classList.add('js-callout--failure');
			}
		})
		.catch(() => {
			form.classList.add('js-callout--failure');
		});
}

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
	} else if (type === 'checkbox') {
		const checkboxElement = element as HTMLInputElement;
		if (checkboxElement.checked) {
			acc[name]
				? (acc[name] = [...acc[name], value])
				: (acc[name] = [value]);
		}
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

const validate = (elements: FormElementType[]): boolean => {
	let hasError = false;
	elements.forEach(element => {
		if (element.type === 'checkbox') {
			const mandatoryCheckboxGroup = document.getElementById(`checkbox-group-${element.name}--mandatory`);
			const checkedCheckboxes = mandatoryCheckboxGroup?.querySelectorAll(':checked');
			if (mandatoryCheckboxGroup && !checkedCheckboxes?.length) {
				document.getElementById(element.name)?.classList.add('callout-field--failure')
				hasError = true;
			} else { document.getElementById(element.name)?.classList.remove('callout-field--failure')};
		}
		else if (element.required && !element.value) {
			document.getElementById(element.name)?.classList.add('callout-field--failure');
			hasError = true;
		} else { document.getElementById(element.name)?.classList.remove('callout-field--failure'); }
	});
	return hasError;
}


export async function handleSubmission(): Promise<void> {
	const form = document.querySelector('form');
	if (!form) return;
	try {
		const elements = [
			...form.getElementsByTagName('input'),
			...form.getElementsByTagName('textarea'),
			...form.getElementsByTagName('select'),
		];

		// Validate the form
		const hasError = validate(elements);
		if(hasError) return;

		// Get Values
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
