export const stringifyFileBase64 = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				// remove data:*/*;base64, from the start of the base64 string
				const fileAsBase64 = reader.result
					?.toString()
					.split(';base64,')[1];

				if (fileAsBase64) {
					resolve(fileAsBase64);
				} else {
					reject(
						new Error(
							'Sorry there was a problem with the file you uploaded above. Check the size and type. We only accept images, pdfs and .doc or .docx files',
						),
					);
				}
			},
			false,
		);
		reader.addEventListener('error', () => {
			reject(
				new Error(
					'Sorry there was a problem with the file you uploaded above. Check the size and type. We only accept images, pdfs and .doc or .docx files',
				),
			);
		});
		reader.readAsDataURL(file);
	});
