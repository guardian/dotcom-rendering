import { SkipTo } from '@root/src/web/components/SkipTo';
import { Hide } from '@guardian/src-layout';

export const SkipToNavigation = () => {
	return (
		<>
			<Hide above="desktop">
				<SkipTo id="#veggie-burger" label="Skip to navigation" />
			</Hide>
			<Hide below="desktop">
				<SkipTo id="#show-more-button" label="Skip to navigation" />
			</Hide>
		</>
	);
};
