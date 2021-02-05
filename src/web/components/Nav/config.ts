export const navInputCheckboxId = 'top-nav-input-checkbox';
export const showMoreButtonId = 'show-more-button';
export const veggieBurgerId = 'veggie-burger';

export const buildID = (ID: string, prefix: string): string =>
	`${prefix}${ID ? `-${ID}` : ''}`;
