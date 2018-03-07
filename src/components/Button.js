// @flow

const pillarColours = {
    news: 'pink',
    alex: 'hotpink',
};

export default styled('button')(({ pillar = 'alex' }) => ({
    border: 'none',
    backgroundColor: pillar ? pillarColours[pillar] : null,
}));
