// @flow
const HTMLtoJSX = require('htmltojsx');
const SVGO = require('svgo');

const converter = new HTMLtoJSX({
    createClass: false,
});

const svgo = new SVGO({
    plugins: [
        {
            removeXMLNS: true,
        },
    ],
});

module.exports = function loadSVG(source: string): void {
    const callback = this.async();

    svgo.optimize(source, result => {
        callback(
            null,
            `export default props => {
                const svg = ${converter.convert(result.data)};

                Object.assign(svg.attributes, props);

                return svg;
            }
        `
        );
    });
};
