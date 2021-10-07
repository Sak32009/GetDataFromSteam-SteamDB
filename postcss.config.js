const prefixSelector = require('postcss-prefix-selector');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    prefixSelector({
      prefix: '.sak32009',
      transform(prefix, selector, prefixedSelector) {
        if (selector === 'body') {
          return prefix;
        }

        if (selector === ':root') {
          return selector;
        }

        if (selector.startsWith('::')) {
          return prefix + ' *' + selector;
        }

        return prefixedSelector;
      },
    }),
    autoprefixer(),
  ],
};
