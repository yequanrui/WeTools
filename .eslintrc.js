module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: "babel-eslint",
  globals: {
    __DEV__: true,
    If: true,
    For: true,
    POBrowser: true,
  },
};
