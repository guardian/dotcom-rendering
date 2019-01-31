import { Walktime } from './walktime';

test('walk', () => {
    const name = 'hello';
    document.body.innerHTML = `
    <div id="${name}"></div>
    `;
    const renderer = (e: Element, d: string) => {
        e.innerHTML = d
    };
    const extractor = (r: Response) => 'hello';
    const walktime = new Walktime<Element, string>(
        `#${name}`,
        '',
        extractor,
        renderer,
    );
    walktime.collate();
    walktime.render();
    expect(document.body.innerHTML.trim()).toBe(
        `<div id=\"${name}\">hello</div>`,
    );
});
