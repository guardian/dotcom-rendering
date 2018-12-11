import { getNonEmptyString } from './validators';

export const extract = (data: {}): ConfigType => ({
    ajaxUrl: getNonEmptyString(data, 'config.page.ajaxUrl'),
});
