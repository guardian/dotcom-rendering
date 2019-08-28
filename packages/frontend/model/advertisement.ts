// We are using this function to control the activation of the commercial features
// Currently it reports that the user has opted in to a 0% AB test.
export const shouldDisplayAdvertisements = (config: ConfigType) => {
    return config.abTests.dotcomRenderingAdvertisementsVariant === 'variant';
};
