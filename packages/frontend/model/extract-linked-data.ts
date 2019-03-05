import { getArray } from '@frontend/model/validators';

export const extract = (data: {}): object[] => {
    return getArray(data, 'page.linkedData', []);
};
