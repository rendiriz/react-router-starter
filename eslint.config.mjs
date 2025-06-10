import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import onlyWarn from 'eslint-plugin-only-warn';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  // the built-in “recommended” JS config
  js.configs.recommended,

  // the flat version of eslint-config-prettier
  prettier,

  // typescript-eslint’s flat “recommended”
  ...tseslint.configs.recommended,

  // turn everything into warnings
  {
    plugins: { onlyWarn },
  },

  // react
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...pluginReact.configs.flat.recommended.languageOptions.globals,
        ...globals.serviceworker,
      },
    },
  },

  // react-hooks
  {
    plugins: { 'react-hooks': pluginReactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // new JSX transform
    },
  },

  // jsx-a11y (flat config support added in v7+)
  {
    plugins: { 'jsx-a11y': pluginJsxA11y },
    rules: pluginJsxA11y.configs.recommended.rules,
  },

  // ignores
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
  },
];
