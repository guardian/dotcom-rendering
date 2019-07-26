export const sendOphanPlatformRecord = () => {
    console.log('send record');
    window.guardian.ophan.record({ platformVariant: 'dotcom-rendering' });
};
