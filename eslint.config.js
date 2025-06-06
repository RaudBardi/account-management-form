import js from '@eslint/js';
import vuePlugin from 'eslint-plugin-vue';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
    // 1. Базовые правила ESLint
    js.configs.recommended,

    // 2. Общие настройки для всех файлов
    {
        files: ['**/*.{js,ts,tsx,vue}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021
            },
            ecmaVersion: 'latest'
        }
    },

    // 3. Настройки TypeScript
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
        plugins: {
            '@typescript-eslint': tsPlugin
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: 'module'
            }
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            '@typescript-eslint/no-explicit-any': 'off'
        }
    },

    // 4. Настройки Vue (должны идти после TypeScript)
    {
        files: ['**/*.vue'],
        plugins: {
            vue: vuePlugin
        },
        languageOptions: {
            parser: vuePlugin.parser,
            parserOptions: {
                parser: tsParser,
                extraFileExtensions: ['.vue']
            }
        },
        rules: {
            ...vuePlugin.configs['flat/recommended'].rules,
            'vue/multi-word-component-names': 'off',
            'vue/html-self-closing': ['error', {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }],
            'vue/component-tags-order': ['error', {
                order: ['script', 'template', 'style']
            }],
            'vue/define-macros-order': ['error', {
                order: ['defineOptions', 'defineProps', 'defineEmits']
            }]
        }
    },

    // 5. Игнорируемые файлы
    {
        ignores: [
            '**/node_modules/',
            '**/dist/',
            '**/*.d.ts',
            '**/.output/',
            '**/.vitepress/cache/'
        ]
    }
];
