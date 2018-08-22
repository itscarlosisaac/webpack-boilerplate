module.exports = {
  map: false,
  plugins: {
    autoprefixer: {
      browsers: ['last 3 version', 'ie >= 11'],
    },
    cssnano: {
      preset: 'default',
      mergeIdents: true,
    },
  },
  from: './src/styles/app.css',
  to: 'app.bundle.css',
};
