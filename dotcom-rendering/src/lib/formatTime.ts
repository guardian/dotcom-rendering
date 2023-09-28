const formatNum = (t: number) => t.toFixed(0).padStart(2, '0');

export const formatTime = (t: number): string => {
	const second = Math.floor(t % 60);
	const minute = Math.floor((t % 3600) / 60);
	const hour = Math.floor(t / 3600);
	return `${formatNum(hour)}:${formatNum(minute)}:${formatNum(second)}`;
};
