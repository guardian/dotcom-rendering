export const has = (s?: string): s is string =>
	s !== undefined && s.trim() !== '';
