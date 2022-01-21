module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.ts',
        // NOTE: fix modal-backdrop(show, fade)
        './node_modules/bootstrap/js/dist/modal.js',
      ],
      fontFace: true,
      keyframes: true,
      variables: true,
      // NOTE: i don't use table
      blocklist: ['table'],
    }),
    require('postcss-prefix-selector')({
      prefix: '.sak32009',
      transform(prefix, selector, prefixedSelector) {
        // .body to .sak32009
        if (selector === 'body') {
          return prefix;
        }

        // :root to :root
        if (selector === ':root') {
          return selector;
        }

        // ::a-b-c to .sak32009 *::a-b-c
        if (selector.startsWith('::')) {
          return prefix + ' *' + selector;
        }

        // [selector] to .sak32009 [selector]
        return prefixedSelector;
      },
    }),
    require('autoprefixer'),
  ],
};
