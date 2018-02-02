// @flow
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/app/index.server.js',
    output: {
        file: 'dist/app.server.js',
        format: 'cjs',
    },
    external: [
        'react',
        'react-dom/server',
        'react-hot-loader',
        'styletron-react',
        'styletron-server',
    ],
    plugins: [
        babel({
            externalHelpers: true,
        }),
        commonjs({
            module: true,
            jsnext: true,
            main: true,
            browser: false,
        }),
        resolve(),
    ],
};
