import { Amplify } from 'aws-amplify';
import { events } from 'aws-amplify/data';
import { useEffect, useState } from 'react';

Amplify.configure({
	API: {
		Events: {
			endpoint: '',
			region: 'eu-west-1',
			defaultAuthMode: 'apiKey',
			apiKey: '',
		},
	},
});

export type LiveScoreEvent = {
	matchId: string;
	teams: {
		id: string;
		name: string;
		score: string;
		isHomeTeam: boolean;
	}[];
};

export const useAppSyncEvent = () => {
	const [data, setData] = useState<LiveScoreEvent | null>(null);
	const room = 'match-update';

	useEffect(() => {
		const pr = events.connect(`/football/${room}`);
		void pr.then((channel) => {
			channel.subscribe({
				next: (incoming: { id: string; event: LiveScoreEvent }) => {
					console.log('score data received from AppSync', incoming);
					setData(incoming.event);
				},
				error: (value) => console.error(value),
			});
		});
	}, [room]);

	return data;
};
