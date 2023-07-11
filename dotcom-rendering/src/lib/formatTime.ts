const enforceTwoDigitString = (number: number) =>
	number >= 10 ? number : `0${number}`;

export const formatTime = (videoDurationInSeconds: number): string => {
	const hours = Math.floor(videoDurationInSeconds / 3600);
	const minutes = Math.floor((videoDurationInSeconds % 3600) / 60);
	const seconds = videoDurationInSeconds % 60;

	// We assume that videos are shorter than 1 hour, but handle incase one does arise
	const hoursString = hours > 0 ? `${enforceTwoDigitString(hours)}:` : '';
	const minutesString = minutes > 0 ? enforceTwoDigitString(minutes) : '00';
	const secondsString = seconds > 0 ? enforceTwoDigitString(seconds) : '00';
	return `${hoursString}${minutesString}:${secondsString}`;
};
