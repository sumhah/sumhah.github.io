import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import pkgInfo from './package.json';

const env = process.env.NODE_ENV;
const isProd = ['prod'].includes(env);
const version = isProd ? pkgInfo.version : '0.0.1';

export default {
    input: {
        [`battle-city`]: `./src/app.ts`
    },
    output: {
        dir: 'dist',
        name: '[name].js',
        format: 'iife'
    },
    plugins: [
        replace({
            __BuildVersion__: version
        }),
        typescript(),
        resolve(),
        commonjs(),
        progress(),
        isProd && babel(),
        isProd && terser({ output: { comments: false } }),
        isProd && filesize()
    ]
};
