import document from './document';
import validator from 'amphtml-validator';
import React from 'react';
// import { Article } from './pages/Article';

test('rejects invalid AMP doc (to test validator)', async () => {
    const v = await validator.getInstance();
    const result = v.validateString(
        document({ scripts: [''], body: <img alt="foo" /> }),
    );
    expect(result.errors.length > 0).toBe(true);
});

// test('produces valid AMP doc', async () => {
//     const v = await validator.getInstance();
//     const result = v.validateString(document({ body: <Article  /> }));
//     expect(result.errors.length).toBe(0);
// });
