import { requiresAffiliateDisclaimer } from './requiresAffiliateDisclaimer';

describe('requiresAffiliateDisclaimer', () => {
	describe('when given a boolean', () => {
		it('returns true when true', () => {
			expect(requiresAffiliateDisclaimer(true)).toBe(true);
		});

		it('returns false when false', () => {
			expect(requiresAffiliateDisclaimer(false)).toBe(false);
		});
	});

	describe('when given a string', () => {
		it("returns true for the exact string 'true'", () => {
			expect(requiresAffiliateDisclaimer('true')).toBe(true);
		});

		it("returns false for the string 'false'", () => {
			expect(requiresAffiliateDisclaimer('false')).toBe(false);
		});

		it('returns false for a differently-cased string (no normalisation)', () => {
			expect(requiresAffiliateDisclaimer('True')).toBe(false);
			expect(requiresAffiliateDisclaimer('TRUE')).toBe(false);
		});

		it('returns false for surrounding whitespace (no trimming)', () => {
			expect(requiresAffiliateDisclaimer(' true ')).toBe(false);
		});

		it('returns false for an unrelated truthy-looking string', () => {
			expect(requiresAffiliateDisclaimer('1')).toBe(false);
		});

		it('returns false for an empty string', () => {
			expect(requiresAffiliateDisclaimer('')).toBe(false);
		});
	});

	describe('when given undefined', () => {
		it('returns false', () => {
			expect(requiresAffiliateDisclaimer(undefined)).toBe(false);
		});
	});
});
