/* eslint-disable canonical/sort-keys */
module.exports = {
  plugins: {
    '@fullhuman/postcss-purgecss': {
      content: [
        './src/**/*.{ts,html}',
        './node_modules/bootstrap/js/dist/modal.js',
      ],
    },
    'postcss-prefix-selector': {
      prefix: '.sak32009',
      transform (prefix, selector, prefixedSelector) {
        if (selector.startsWith('.modal-backdrop')) {
          return selector;
        }

        // body to .sak32009
        if (selector === 'body') {
          return prefix;
        }

        // :root to :root
        if (selector === ':root') {
          return selector;
        }

        // ::a-b-c to .sak32009 *::a-b-c
        if (selector.startsWith('::')) {
          return `${prefix} *${selector}`;
        }

        // [selector] to .sak32009 [selector]
        return prefixedSelector;
      },
    },
    autoprefixer: {},
  },
};
