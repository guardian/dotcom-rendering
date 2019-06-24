export const extract = (data: any): object[] => {
    return data && data.page.meta.linkedData;
};
