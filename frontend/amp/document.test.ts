import document from './document';
import validator from 'amphtml-validator';
import React from 'react';
import Article from './components/Article';

test('rejects invalid AMP doc (to test validator)', async () => {
    const v = await validator.getInstance();
    const result = v.validateString(
        document({ body: React.createElement('img') }),
    );
    expect(result.errors.length > 0).toBe(true);
});

test('produces valid AMP doc', async () => {
    const v = await validator.getInstance();
    const result = v.validateString(
        document({ body: React.createElement(Article) }),
    );
    expect(result.errors.length).toBe(0);
});
