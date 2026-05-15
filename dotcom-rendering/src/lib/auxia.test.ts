import { ensureValidCtaUrl } from './auxia';

describe('ensureValidCtaUrl', () => {
	describe('Valid Guardian URLs', () => {
		it('should accept https://theguardian.com', () => {
			expect(ensureValidCtaUrl('https://theguardian.com')).toBe(
				'https://theguardian.com/',
			);
		});

		it('should accept https://www.theguardian.com', () => {
			expect(ensureValidCtaUrl('https://www.theguardian.com')).toBe(
				'https://www.theguardian.com/',
			);
		});

		it('should accept https://subdomain.theguardian.com', () => {
			expect(ensureValidCtaUrl('https://code.theguardian.com')).toBe(
				'https://code.theguardian.com/',
			);
		});

		it('should accept bare theguardian.com and prepend https://', () => {
			expect(ensureValidCtaUrl('theguardian.com')).toBe(
				'https://theguardian.com/',
			);
		});

		it('should accept bare www.theguardian.com and prepend https://', () => {
			expect(ensureValidCtaUrl('www.theguardian.com')).toBe(
				'https://www.theguardian.com/',
			);
		});

		it('should accept Guardian URLs with paths', () => {
			expect(
				ensureValidCtaUrl('https://theguardian.com/world/coronavirus'),
			).toBe('https://theguardian.com/world/coronavirus');
		});

		it('should accept Guardian URLs with query parameters', () => {
			expect(
				ensureValidCtaUrl('https://theguardian.com/search?q=test'),
			).toBe('https://theguardian.com/search?q=test');
		});

		it('should accept Guardian URLs with fragments', () => {
			expect(ensureValidCtaUrl('https://theguardian.com/#section')).toBe(
				'https://theguardian.com/#section',
			);
		});

		it('should accept Guardian URLs with ports (URL constructor normalizes default ports)', () => {
			expect(ensureValidCtaUrl('https://theguardian.com:443')).toBe(
				'https://theguardian.com/',
			);
		});
	});

	describe('HTTP to HTTPS conversion', () => {
		it('should convert http://theguardian.com to https://', () => {
			expect(ensureValidCtaUrl('http://theguardian.com')).toBe(
				'https://theguardian.com/',
			);
		});

		it('should convert http://www.theguardian.com to https://', () => {
			expect(ensureValidCtaUrl('http://www.theguardian.com')).toBe(
				'https://www.theguardian.com/',
			);
		});

		it('should convert http://subdomain.theguardian.com to https://', () => {
			expect(ensureValidCtaUrl('http://code.theguardian.com')).toBe(
				'https://code.theguardian.com/',
			);
		});

		it('should convert http://theguardian.com/path to https://', () => {
			expect(ensureValidCtaUrl('http://theguardian.com/world')).toBe(
				'https://theguardian.com/world',
			);
		});
	});

	describe('CRITICAL: Protocol bypass vulnerabilities', () => {
		it('should reject ftp:// URLs (SECURITY VULNERABILITY: currently fails hostname check)', () => {
			// This test exposes a critical security vulnerability
			// ftp://www.theguardian.com becomes https://ftp//www.theguardian.com
			// hostname becomes 'ftp' instead of 'www.theguardian.com'
			expect(
				ensureValidCtaUrl('ftp://www.theguardian.com'),
			).toBeUndefined();
		});

		it('should reject ftp:// URLs with subdomains (SECURITY VULNERABILITY)', () => {
			expect(
				ensureValidCtaUrl('ftp://code.theguardian.com'),
			).toBeUndefined();
		});

		it('should reject javascript:// URLs (SECURITY VULNERABILITY: currently fails hostname check)', () => {
			// javascript://www.theguardian.com becomes https://javascript//www.theguardian.com
			// hostname becomes 'javascript' instead of 'www.theguardian.com'
			expect(
				ensureValidCtaUrl('javascript://www.theguardian.com'),
			).toBeUndefined();
		});

		it('should reject data:// URLs (SECURITY VULNERABILITY: currently fails hostname check)', () => {
			// data://www.theguardian.com becomes https://data//www.theguardian.com
			// hostname becomes 'data' instead of 'www.theguardian.com'
			expect(
				ensureValidCtaUrl('data://www.theguardian.com'),
			).toBeUndefined();
		});

		it('should reject file:// URLs (SECURITY VULNERABILITY: currently fails hostname check)', () => {
			// file://www.theguardian.com becomes https://file//www.theguardian.com
			// hostname becomes 'file' instead of 'www.theguardian.com'
			expect(
				ensureValidCtaUrl('file://www.theguardian.com'),
			).toBeUndefined();
		});

		it('should reject malicious protocol injection with Guardian domain', () => {
			// Attacker tries to inject protocol but include Guardian domain
			expect(
				ensureValidCtaUrl('evil://www.theguardian.com'),
			).toBeUndefined();
		});

		it('should reject protocol injection with path traversal', () => {
			// Attacker tries to use protocol to bypass domain checks
			expect(
				ensureValidCtaUrl('ftp://theguardian.com@evil.com'),
			).toBeUndefined();
		});
	});

	describe('Invalid protocols - should return undefined', () => {
		it('should reject ftp:// URLs', () => {
			expect(ensureValidCtaUrl('ftp://theguardian.com')).toBeUndefined();
		});

		it('should reject ftp:// URLs with subdomains', () => {
			expect(
				ensureValidCtaUrl('ftp://www.theguardian.com'),
			).toBeUndefined();
		});

		it('should reject javascript: URLs', () => {
			expect(ensureValidCtaUrl('javascript:alert(1)')).toBeUndefined();
		});

		it('should reject data: URLs', () => {
			expect(
				ensureValidCtaUrl('data:text/html,<script>alert(1)</script>'),
			).toBeUndefined();
		});

		it('should reject file: URLs', () => {
			expect(ensureValidCtaUrl('file:///etc/passwd')).toBeUndefined();
		});

		it('should reject mailto: URLs', () => {
			expect(
				ensureValidCtaUrl('mailto:test@example.com'),
			).toBeUndefined();
		});

		it('should reject tel: URLs', () => {
			expect(ensureValidCtaUrl('tel:+1234567890')).toBeUndefined();
		});

		it('should reject http:// URLs (converted to https:// then protocol check)', () => {
			// This tests the edge case mentioned in the GitHub issue
			// where ftp:// becomes https://ftp// after the conversion logic
			expect(ensureValidCtaUrl('http://ftp.theguardian.com')).toBe(
				'https://ftp.theguardian.com/',
			);
		});
	});

	describe('Invalid domains - should return undefined', () => {
		it('should reject non-Guardian domains', () => {
			expect(ensureValidCtaUrl('https://evil.com')).toBeUndefined();
		});

		it('should reject non-Guardian domains with http', () => {
			expect(ensureValidCtaUrl('http://evil.com')).toBeUndefined();
		});

		it('should reject bare non-Guardian domains', () => {
			expect(ensureValidCtaUrl('evil.com')).toBeUndefined();
		});

		it('should reject domains similar to Guardian but not exact', () => {
			expect(
				ensureValidCtaUrl('https://theguardian.co.uk'),
			).toBeUndefined();
			expect(
				ensureValidCtaUrl('https://theguardian.org'),
			).toBeUndefined();
			expect(ensureValidCtaUrl('https://guardian.com')).toBeUndefined();
		});

		it('should reject subdomains of non-Guardian domains', () => {
			expect(
				ensureValidCtaUrl('https://www.theguardian.evil.com'),
			).toBeUndefined();
		});

		it('should reject Guardian domains with extra characters', () => {
			expect(
				ensureValidCtaUrl('https://theguardian.com.fake'),
			).toBeUndefined();
		});
	});

	describe('Invalid input types - should return undefined', () => {
		it('should reject empty string', () => {
			expect(ensureValidCtaUrl('')).toBeUndefined();
		});

		it('should reject null', () => {
			expect(ensureValidCtaUrl(null as any)).toBeUndefined();
		});

		it('should reject undefined', () => {
			expect(ensureValidCtaUrl(undefined as any)).toBeUndefined();
		});

		it('should reject numbers', () => {
			expect(ensureValidCtaUrl(123 as any)).toBeUndefined();
		});

		it('should reject objects', () => {
			expect(ensureValidCtaUrl({} as any)).toBeUndefined();
		});

		it('should reject arrays', () => {
			expect(ensureValidCtaUrl([] as any)).toBeUndefined();
		});

		it('should reject boolean', () => {
			expect(ensureValidCtaUrl(true as any)).toBeUndefined();
		});
	});

	describe('Edge cases and malformed URLs', () => {
		it('should reject URLs with only protocol', () => {
			expect(ensureValidCtaUrl('https://')).toBeUndefined();
		});

		it('should handle URLs with invalid characters (URL constructor encodes them)', () => {
			// The URL constructor automatically encodes special characters
			expect(ensureValidCtaUrl('https://theguardian.com/<script>')).toBe(
				'https://theguardian.com/%3Cscript%3E',
			);
		});

		it('should handle URLs with spaces (URL constructor encodes them)', () => {
			expect(
				ensureValidCtaUrl('https://theguardian.com/path with spaces'),
			).toBe('https://theguardian.com/path%20with%20spaces');
		});

		it('should handle very long URLs (URL constructor accepts them)', () => {
			const longDomain = 'a'.repeat(10000) + '.theguardian.com';
			const result = ensureValidCtaUrl(`https://${longDomain}`);
			expect(result).toBeDefined();
			expect(result?.startsWith('https://')).toBe(true);
			expect(result?.includes('.theguardian.com')).toBe(true);
		});

		it('should reject URLs with null bytes', () => {
			expect(
				ensureValidCtaUrl('https://theguardian.com\0.com'),
			).toBeUndefined();
		});

		it('should reject URLs with newlines', () => {
			expect(
				ensureValidCtaUrl('https://theguardian.com\n.evil.com'),
			).toBeUndefined();
		});

		it('should reject URLs with tab characters', () => {
			expect(
				ensureValidCtaUrl('https://theguardian.com\t.evil.com'),
			).toBeUndefined();
		});
	});

	describe('International and unicode domains', () => {
		it('should handle punycode Guardian domains', () => {
			expect(
				ensureValidCtaUrl('https://xn--theguardian-8xa.com'),
			).toBeUndefined();
		});

		it('should reject unicode domains that are not Guardian', () => {
			expect(ensureValidCtaUrl('https://测试.com')).toBeUndefined();
		});
	});

	describe('URL parsing edge cases', () => {
		it('should handle URLs with multiple slashes', () => {
			expect(ensureValidCtaUrl('https://theguardian.com//path')).toBe(
				'https://theguardian.com//path',
			);
		});

		it('should handle URLs with trailing slashes', () => {
			expect(ensureValidCtaUrl('https://theguardian.com/')).toBe(
				'https://theguardian.com/',
			);
		});

		it('should handle URLs with multiple trailing slashes', () => {
			expect(ensureValidCtaUrl('https://theguardian.com///')).toBe(
				'https://theguardian.com///',
			);
		});

		it('should handle URLs with encoded characters', () => {
			expect(
				ensureValidCtaUrl(
					'https://theguardian.com/search?q=hello%20world',
				),
			).toBe('https://theguardian.com/search?q=hello%20world');
		});
	});

	describe('Security-focused test cases', () => {
		it('should handle XSS attempts in URLs (URL constructor encodes them)', () => {
			expect(
				ensureValidCtaUrl(
					'https://theguardian.com/<script>alert("xss")</script>',
				),
			).toBe(
				'https://theguardian.com/%3Cscript%3Ealert(%22xss%22)%3C/script%3E',
			);
		});

		it('should handle protocol injection attempts (URL constructor treats as path)', () => {
			expect(
				ensureValidCtaUrl(
					'https://theguardian.com/javascript:alert(1)',
				),
			).toBe('https://theguardian.com/javascript:alert(1)');
		});

		it('should reject attempts to bypass domain check', () => {
			expect(
				ensureValidCtaUrl('https://theguardian.com.evil.com'),
			).toBeUndefined();
			expect(
				ensureValidCtaUrl('https://theguardian.com@evil.com'),
			).toBeUndefined();
		});

		it('should handle attempts with credentials (URL constructor accepts them)', () => {
			expect(ensureValidCtaUrl('https://user:pass@theguardian.com')).toBe(
				'https://user:pass@theguardian.com/',
			);
		});
	});

	describe('Real-world edge cases', () => {
		it('should handle common Guardian URL patterns', () => {
			expect(
				ensureValidCtaUrl(
					'https://www.theguardian.com/world/2023/mar/01/russia-ukraine-war-latest',
				),
			).toBe(
				'https://www.theguardian.com/world/2023/mar/01/russia-ukraine-war-latest',
			);
		});

		it('should handle Guardian section URLs', () => {
			expect(
				ensureValidCtaUrl('https://theguardian.com/uk/technology'),
			).toBe('https://theguardian.com/uk/technology');
		});

		it('should handle Guardian article URLs with special characters', () => {
			expect(
				ensureValidCtaUrl(
					'https://theguardian.com/world/2023/mar/01/covid-19-pandemic-latest-news',
				),
			).toBe(
				'https://theguardian.com/world/2023/mar/01/covid-19-pandemic-latest-news',
			);
		});
	});
});
