// This file exists just for Jest.
// Our main babel configuration can be found in the webpack config.

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            { 'targets': { 'node': '12' }, 'modules': 'cjs' }
        ]
    ]
}
