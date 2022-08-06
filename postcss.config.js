export default {
  plugins: {
    'postcss-prefix-selector': {
      prefix: '.sak32009',
      transform(prefix, selector, prefixedSelector) {
        // selector to selector
        if (
          selector.startsWith('.modal-backdrop') ||
          selector.startsWith('.fade') ||
          selector.startsWith('.sak32009') ||
          selector === ':root'
        ) {
          return selector
        }

        // body to .sak32009
        if (selector === 'body') {
          return prefix
        }

        // ::a-b-c to .sak32009 *::a-b-c
        if (selector.startsWith('::')) {
          return `${prefix} *${selector}`
        }

        // [selector] to .sak32009 [selector]
        return prefixedSelector
      }
    },
    autoprefixer: {}
  }
}
