const devMode = (process.env.NODE_ENV === 'development');
const sourcemap = devMode ? 'inline' : false;
const watch = {
  include: './src/**'
};

export default [
  {
    sourcemap,
    watch,
    input: './src/main.js',
    output: {
      file: './dist/build.es.js',
      format: 'es',
    },
  },
  {
    sourcemap,
    watch,
    input: './src/main.js',
    output: {
      file: './dist/bundle.iife.js',
      format: 'iife',
      name: 'Test',
    }
  }
];
