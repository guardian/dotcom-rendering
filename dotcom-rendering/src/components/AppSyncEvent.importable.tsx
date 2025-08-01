import { Amplify } from 'aws-amplify';
import { events } from 'aws-amplify/data';
import { useEffect } from 'react';

Amplify.configure({
	API: {
		Events: {
			endpoint:
				'https://gth37dyhprawxpl26kqsv4yjkm.appsync-api.eu-west-1.amazonaws.com/event',
			region: 'eu-west-1',
			defaultAuthMode: 'apiKey',
			apiKey: '',
		},
	},
});

export const AppSyncEvent = () => {
	const room = 'match-update';
	useEffect(() => {
		const pr = events.connect(`/football/${room}`);
		void pr.then((channel) => {
			channel.subscribe({
				next: (data) => {
					console.log('score data received from app sync', data);
				},
				error: (value) => console.error(value),
			});
		});
	}, []);
	return <></>;
};
