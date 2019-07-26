export const sendOphanPlatformRecord = () => {
    if (
        window.guardian &&
        window.guardian.ophan &&
        window.guardian.ophan.record
    ) {
        window.guardian.ophan.record({ platformVariant: 'dotcom-rendering' });
    } else {
        throw new Error("window.guardian.ophan.record doesn't exist");
    }
};
