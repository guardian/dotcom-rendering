import { SkipTo } from '@root/src/web/components/SkipTo';
import { Hide } from '@guardian/src-layout';

export const SkipToNavigation = () => {
	return (
		<>
			<Hide above="desktop">
				<SkipTo id="#navigation" label="Skip to navigation" />
			</Hide>
			<Hide below="desktop">
				<SkipTo id="#navigation" label="Skip to navigation" />
			</Hide>
		</>
	);
};
