module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'perfectionist'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
        newlinesBetween: 'never',
        groups: [
          'type',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'object',
          'unknown',
        ],
      },
    ],
    'perfectionist/sort-array-includes': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
      }
    ],
    'perfectionist/sort-classes': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
        newlinesBetween: 'ignore',
      },
    ],
    'perfectionist/sort-decorators': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
      },
    ],
    'perfectionist/sort-exports': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
      },
    ],
    'perfectionist/sort-heritage-clauses': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
      },
    ],
    'perfectionist/sort-interfaces': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
        newlinesBetween: 'never',
        groupKind: 'mixed',
      },
    ],
    'perfectionist/sort-intersection-types': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
        newlinesBetween: 'never',
      },
    ],
    'perfectionist/sort-modules': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
        newlinesBetween: 'ignore',
        groups: [
          'declare-enum',
          'export-enum',
          'enum',
          ['declare-interface', 'declare-type'],
          ['export-interface', 'export-type'],
          ['interface', 'type'],
          'declare-class',
          'class',
          'export-class',
          'declare-function',
          'export-function',
          'function'
        ],
      },
    ],
    'perfectionist/sort-named-exports': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
        groupKind: 'mixed',
      },
    ],
    'perfectionist/sort-named-imports': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
      },
    ],
    'perfectionist/sort-object-types': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
        newlinesBetween: 'never',
      },
    ],
    'perfectionist/sort-objects': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
        newlinesBetween: 'never',
      },
    ],
    'perfectionist/sort-switch-case': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
      },
    ],
    'perfectionist/sort-union-types': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
        newlinesBetween: 'never',
      },
    ],
    'perfectionist/sort-variable-declarations': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
        disallowTypeAnnotations: false,
      },
    ],
  },
};
