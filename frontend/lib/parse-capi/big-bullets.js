// @flow
export default (s: string) =>
    s.replace(/•/g, '<span class="bullet">&bull;</span>');
