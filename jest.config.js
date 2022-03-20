// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   moduleDirectories: ['node_modules', 'src'],
//   collectCoverage: true,
//   verbose: false,
//   // globals: {
//   //   'ts-jest': {
//   //     babelConfig: true,
//   //   }
//   // },
//   // modulePathIgnorePatterns: ['example']
// }
module.exports = {
  verbose: false,
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/@arekrado/canvas-engine',
  ],
};
