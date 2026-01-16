import type { BannerId } from '../../common/types';

export const getComponentIds = (bannerId: BannerId) => ({
	close: `${bannerId} : close`,
	cta: `${bannerId} : cta`,
	secondaryCta: `${bannerId} : secondary-cta`,
	notNow: `${bannerId} : not now`,
	signIn: `${bannerId} : sign in`,
	reminderCta: `${bannerId} : reminder-cta`,
	reminderSet: `${bannerId} : reminder-set`,
	reminderClose: `${bannerId} : reminder-close`,
	collapse: `${bannerId} : collapse`,
	expand: `${bannerId} : expand`,
});
