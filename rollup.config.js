const watch = {
  include: './src/**'
};

export default [
  {
    watch,
    input: './src/main.js',
    output: {
      file: './dist/build.es.js',
      format: 'es',
    },
  },
  {
    watch,
    input: './src/main.js',
    output: {
      file: './dist/bundle.iife.js',
      format: 'iife',
      name: 'Test',
    }
  }
];
