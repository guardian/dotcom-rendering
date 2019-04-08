import { getArray } from '@frontend/model/validators';

export const extract = (data: {}): EpicContent => {
    return getArray(data, 'epic', []);
};
