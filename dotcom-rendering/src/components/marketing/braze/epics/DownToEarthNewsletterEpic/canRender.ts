import type { BrazeMessageProps } from '.';

export const COMPONENT_NAME = 'DownToEarthNewsletterEpic';

export const canRender = (props: BrazeMessageProps): boolean => {
	const { header, frequency, paragraph1, ophanComponentId } = props;

	return Boolean(header && frequency && paragraph1 && ophanComponentId);
};
