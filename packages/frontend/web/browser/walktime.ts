type Renderer<E, D> = (element: E, data: D) => void;
type Extractor<D> = (response: Response) => D;

export class Walktime<E extends Element, D> {
    private target: E;
    private url: string;
    private renderer: Renderer<E, D>;
    private extract: Extractor<D>;
    private data?: D;

    constructor(
        target: string,
        url: string,
        extractor: Extractor<D>,
        renderer: Renderer<E, D>,
    ) {
        const node = document.querySelector(target);
        if (node == null) {
            throw new Error('nothing to see here, please move along');
        }
        console.log(url);
        this.target = node as E;
        this.url = url;
        this.renderer = renderer;
        this.extract = extractor;
    }

    public async collate() {
        // const r = await fetch(this.url);
        this.data = this.extract(new Response());
    }

    public render() {
        if (this.data) {
            this.renderer(this.target, this.data);
        }
    }
}
