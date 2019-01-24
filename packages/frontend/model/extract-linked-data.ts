import { getObject } from '@frontend/model/validators';

export const extract = (data: {}): object => {
    return getObject(data, 'config.page.linkedData', {});
};
