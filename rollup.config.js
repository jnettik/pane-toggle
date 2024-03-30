import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const formats = ['es', 'iife', 'cjs'];
const devMode = (process.env.NODE_ENV === 'development');
const sourcemap = devMode ? 'inline' : false;
const watch = {
  include: './src/**'
};

export default formats.map(format => ({
  sourcemap,
  watch,
  input: './src/main',
  plugins: [
    nodeResolve(),
    commonjs(),
  ],
  output: {
    file: `./dist/build.${format}.js`,
    name: 'PaneToggle',
    format: format,
    plugins: [terser()],
  },
}));

