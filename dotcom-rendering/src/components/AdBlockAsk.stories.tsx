import { AdBlockAskLeaderboard, AdBlockAskMPU } from './AdBlockAsk';

export default {
	title: 'Components/AdBlockAsk',
};

export const Leaderboard = () => {
	return <AdBlockAskLeaderboard supportButtonHref="#" />;
};

export const MPU = () => {
	return <AdBlockAskMPU supportButtonHref="#" />;
};
