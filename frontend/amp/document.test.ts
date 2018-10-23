import document from './document';
import validator from 'amphtml-validator';

test('rejects invalid AMP doc (to test validator)', async () => {
    const v = await validator.getInstance();
    const result = v.validateString(
        document({ bodyHTML: '<img src="blah" />' }),
    );
    expect(result.errors.length > 0).toBe(true);
});

test('produces valid AMP doc', async () => {
    const v = await validator.getInstance();
    const result = v.validateString(document({ bodyHTML: 'foo' }));
    expect(result.errors.length).toBe(0);
});
