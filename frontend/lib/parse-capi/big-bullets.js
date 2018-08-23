// @flow
export default (s: string): string =>
    s.replace(/•/g, '<span class="bullet">&bull;</span>');
