export const stringifyFileBase64 = (file: File) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                const fileAsBase64 =
                    reader &&
                    reader.result &&
                    reader.result.toString().split(';base64,')[1];
                // remove data:*/*;base64, from the start of the base64 string

                reject(
                    'Sorry there was a problem with the file you uploaded above. Check the size and type. We only accept images, pdfs and .doc or .docx files',
                );
                fileAsBase64
                    ? resolve(fileAsBase64)
                    : reject(
                          'Sorry there was a problem with the file you uploaded above. Check the size and type. We only accept images, pdfs and .doc or .docx files',
                      );
            },
            false,
        );
        reader.addEventListener('error', () => {
            reject(
                'Sorry there was a problem with the file you uploaded above. Check the size and type. We only accept images, pdfs and .doc or .docx files',
            );
        });
        reader.readAsDataURL(file);
    });
