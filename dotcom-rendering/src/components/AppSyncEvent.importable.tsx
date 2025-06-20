import { Amplify } from 'aws-amplify';
import { events } from 'aws-amplify/data';
import { useEffect } from 'react';

Amplify.configure({
	API: {
		Events: {
			endpoint: '',
			region: '',
			defaultAuthMode: 'apiKey',
			apiKey: '',
		},
	},
});

export const AppSyncEvent = () => {
	const room = 'greetings';
	useEffect(() => {
		const pr = events.connect(`/default/${room}`);
		void pr.then((channel) => {
			channel.subscribe({
				next: (data) => {
					console.log(data);
					document.querySelector(
						"[data-gu-name='headline'] h1",
					).textContent = data.event;
				},
				error: (value) => console.error(value),
			});
		});
	}, []);
	return <></>;
};
