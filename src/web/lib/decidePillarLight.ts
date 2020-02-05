import { palette } from '@guardian/src-foundations';

export const decidePillarLight = (pillar: Pillar) => {
    // TODO: This function is a tempoary workaround while we wait for source foundation to be updated with
    // these colours
    switch (pillar) {
        case 'news':
            return '#ffbac8';
        case 'sport':
            return '#90dcff';
        case 'culture':
            return palette[pillar].main;
        case 'lifestyle':
            return palette[pillar].main;
        case 'opinion':
            return palette[pillar].main;
        default:
            return palette[pillar].main;
    }
};
