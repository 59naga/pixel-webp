module.exports = {
  mode: 'production',
  node: {
    fs: 'empty'
  },
  output: {
    library: 'pixelWebp',
    libraryTarget: 'umd',
    // https://github.com/webpack/webpack/issues/6784#issuecomment-375941431
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  }
};
