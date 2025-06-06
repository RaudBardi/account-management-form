import js from '@eslint/js';
import vuePlugin from 'eslint-plugin-vue';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
    // Базовые правила ESLint
    js.configs.recommended,

    // Vue 3 правила
    {
        files: ['**/*.vue'],
        ...vuePlugin.configs['vue3-recommended'],
        languageOptions: {
            parser: vuePlugin.parser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                parser: tsParser,
            },
        },
    },

    // TypeScript правила
    {
        files: ['**/*.ts', '**/*.tsx'],
        ...tsPlugin.configs.recommended,
        languageOptions: {
            parser: tsParser,
        },
    },

    // Глобальные настройки
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'vue/jsx-uses-vars': 'error',
            'semi': ['warn', 'always']
        },
    }
];
