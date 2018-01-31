// @flow
/* eslint-disable no-console */
import path from 'path';
import { readdirSync, readFileSync } from 'fs';
import WebpackOnBuildPlugin from 'on-build-webpack';
import filesizegzip from 'filesizegzip';

module.exports = ({ dist }: { dist: string }) => ({
    browser: {
        devtool: 'source-map',
        plugins: [
            new WebpackOnBuildPlugin(() => {
                readdirSync(path.join(__dirname, 'dist')).forEach(file => {
                    console.log(
                        `${file} ${filesizegzip(
                            readFileSync(path.join(dist, file), 'utf8'),
                            true,
                        )}`,
                    );
                });
            }),
        ],
    },
});
