module.exports = {
  extends: ['@react-native-community', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        quoteProps: 'consistent',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-inline-styles': 'off',
  },
};
