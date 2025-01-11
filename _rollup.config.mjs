import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

export default {
  input: './src/plurality-modal/index.tsx',
  output: [
    {
      file: './dist/index.cjs.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: './dist/index.esm.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(), 
    resolve(), 
    commonjs(), 
    typescript(), 
    postcss({
    extract: true,
    minimize: true, 
  }),
  replace({
    preventAssignment: true, 
    values: envKeys,
  }),
],
  external: ['react', 'react-dom']
};
