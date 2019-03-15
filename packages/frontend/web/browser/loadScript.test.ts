import { loadScript } from './loadScript';

describe('loadScript', () => {
    const script = document.createElement('script');

    beforeAll(() => {
        if (document.body) {
            document.body.appendChild(script);
        }
    });

    afterAll(() => {
        script.remove();
    });

    test('does not add script if script with matching src already on page, and resolves promise', done => {
        const existingScript = document.createElement('script');

        existingScript.src = 'xxx';

        if (document.body) {
            document.body.appendChild(existingScript);
        }

        expect(document.querySelectorAll('script[src="xxx"]')).toHaveLength(1);

        loadScript('xxx')
            .then(() => {
                expect(
                    document.querySelectorAll('script[src="xxx"]'),
                ).toHaveLength(1);

                existingScript.remove();
            })
            .then(done);
    });

    test('adds script if it is not already on page, and resolves promise when script onload called', done => {
        let scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll(
            'script[src="xxx"]',
        );

        expect(scripts).toHaveLength(0);

        loadScript('xxx')
            .then(() => {
                scripts = document.querySelectorAll('script[src="xxx"]');

                expect(scripts).toHaveLength(1);

                if (scripts[0]) {
                    scripts[0].remove();
                }
            })
            .then(done);

        scripts = document.querySelectorAll('script[src="xxx"]');

        expect(scripts).toHaveLength(1);

        if (scripts[0] && scripts[0].onload) {
            scripts[0].onload(new Event('load'));
        }
    });

    test('adds script with attributes if it is not already on page, and resolves promise when script onload called', done => {
        let scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll(
            'script[src="xxx"]',
        );

        expect(scripts).toHaveLength(0);

        loadScript('xxx', { async: true })
            .then(() => {
                scripts = document.querySelectorAll('script[src="xxx"]');

                expect(scripts).toHaveLength(1);

                if (scripts[0]) {
                    expect(scripts[0].async).toBeTruthy();
                    scripts[0].remove();
                }
            })
            .then(done);

        scripts = document.querySelectorAll('script[src="xxx"]');

        expect(scripts).toHaveLength(1);

        if (scripts[0] && scripts[0].onload) {
            scripts[0].onload(new Event('load'));
        }
    });

    test('rejects promise when script onerror called', done => {
        let scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll(
            'script[src="xxx"]',
        );

        expect(scripts).toHaveLength(0);

        loadScript('xxx', {})
            .catch(err => {
                expect(err.message).toBe('Failed to load script xxx');

                if (scripts[0]) {
                    scripts[0].remove();
                }
            })
            .then(done);

        scripts = document.querySelectorAll('script[src="xxx"]');

        expect(scripts).toHaveLength(1);

        if (scripts[0] && scripts[0].onerror) {
            scripts[0].onerror(new Event('fail'));
        }
    });
});
