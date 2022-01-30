/* eslint-disable quote-props */

module.exports = {
	extends: [
		'stylelint-config-standard',
	],
	plugins: [
		'stylelint-selector-bem-pattern',
		'stylelint-scss',
		'stylelint-order',
		'stylelint-config-rational-order/plugin',
	],
	rules: {
		// Our custom BEM linter rules
		'plugin/selector-bem-pattern': {
			componentSelectors: function bemSelector(block) {
				const WORD = '[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*';
				const element = `(?:__${WORD}){0,}?`;
				const modifier = `(?:--${WORD})?`;
				const attribute = '(?:\\[.+\\])?';
				return new RegExp(`^(\\.${block}|\\&)${element}${modifier}${attribute}$`);
			},
			implicitComponents: ['app/styles/**/*.scss'],
		},

		// rule order plugin
		'order/properties-order': [[], { severity: 'warning' }],
		'order/order': [[
			{ type: 'at-rule', name: 'include', hasBlock: false },
			'custom-properties',
			'dollar-variables',
			'declarations',
			{ type: 'at-rule', name: 'include', hasBlock: true },
			'rules',
		], { severity: 'warning' }],
		'plugin/rational-order': [true, {
			'border-in-box-model': false,
			'empty-line-between-groups': true,
			'severity': 'warning',
		}],

		// Indentation
		indentation: 'tab',

		// Color
		'color-hex-case': 'lower',
		'color-hex-length': 'short',
		'color-named': 'never',
		'color-no-invalid-hex': true,

		// Font family
		'font-family-name-quotes': 'always-where-recommended',

		// Function
		'function-calc-no-unspaced-operator': true,
		'function-comma-newline-after': 'always-multi-line',
		'function-comma-space-after': 'always-single-line',
		'function-comma-space-before': 'never',
		'function-linear-gradient-no-nonstandard-direction': true,
		'function-parentheses-space-inside': 'never-single-line',
		'function-url-quotes': 'always',
		'function-whitespace-after': 'always',

		// Number
		'number-leading-zero': 'always',
		'number-no-trailing-zeros': true,
		'length-zero-no-unit': true,

		// String
		'string-no-newline': true,
		'string-quotes': 'single',

		// Time
		'time-min-milliseconds': 100,

		// Value
		'value-no-vendor-prefix': [true, { 'severity': 'warning' }],

		// Value list
		'value-list-comma-newline-after': 'always-multi-line',
		'value-list-comma-space-after': 'always-single-line',
		'value-list-comma-space-before': 'never',

		// Property
		'property-no-vendor-prefix': [true, { 'severity': 'warning' }],

		// Declaration
		'declaration-bang-space-after': 'never',
		'declaration-bang-space-before': 'always',
		'declaration-colon-space-after': 'always-single-line',
		'declaration-colon-space-before': 'never',
		'declaration-no-important': [true, { 'severity': 'warning' }],
		'declaration-empty-line-before': null,

		// Declaration block
		'declaration-block-no-duplicate-properties': true,
		'declaration-block-no-shorthand-property-overrides': true,
		'declaration-block-semicolon-newline-after': 'always-multi-line',
		'declaration-block-semicolon-newline-before': 'never-multi-line',
		'declaration-block-semicolon-space-after': 'always-single-line',
		'declaration-block-semicolon-space-before': 'never',
		'declaration-block-single-line-max-declarations': 1,
		'declaration-block-trailing-semicolon': 'always',

		// Block
		'block-closing-brace-newline-after': [
			'always',
			{
				'ignoreAtRules': ['if', 'else'],
			},
		],
		'block-closing-brace-newline-before': 'always-multi-line',
		'block-closing-brace-space-after': 'always-single-line',
		'block-closing-brace-space-before': 'always-single-line',
		'block-no-empty': true,
		'block-opening-brace-newline-after': 'always-multi-line',
		'block-opening-brace-newline-before': 'never-single-line',
		'block-opening-brace-space-after': 'always-single-line',
		'block-opening-brace-space-before': 'always',

		// Selector
		'selector-attribute-quotes': 'always',
		'selector-attribute-operator-space-before': 'never',
		'selector-attribute-operator-space-after': 'never',
		'selector-attribute-brackets-space-inside': 'never',
		'selector-combinator-space-after': 'always',
		'selector-combinator-space-before': 'always',
		'selector-max-id': 0,
		'selector-max-universal': 1,
		'selector-max-type': null,
		'selector-no-vendor-prefix': [true, { 'severity': 'warning' }],
		'selector-pseudo-element-colon-notation': 'double',
		'selector-pseudo-class-parentheses-space-inside': 'never',
		'selector-type-case': 'lower',

		// Selector list
		'selector-list-comma-newline-after': 'always',
		'selector-list-comma-newline-before': 'never-multi-line',
		'selector-list-comma-space-after': 'always-single-line',
		'selector-list-comma-space-before': 'never',

		// Media feature
		'media-feature-colon-space-after': 'always',
		'media-feature-colon-space-before': 'never',
		'media-feature-name-no-vendor-prefix': [true, { 'severity': 'warning' }],
		'media-feature-range-operator-space-after': 'always',
		'media-feature-range-operator-space-before': 'always',
		'media-feature-parentheses-space-inside': 'never',

		// Comment
		'comment-whitespace-inside': 'always',

		// General / Sheet
		'max-empty-lines': 3,
		'max-nesting-depth': [4, { 'severity': 'warning' }],
		'no-descending-specificity': null,
		'no-eol-whitespace': true,
		'no-invalid-double-slash-comments': true,
		'no-missing-end-of-source-newline': true,
		'no-duplicate-selectors': true,
		'no-unknown-animations': true,
		'rule-empty-line-before': ['always', { 'except': ['after-single-line-comment', 'first-nested'] }],

		// @ rule
		'at-rule-empty-line-before': [
			'always',
			{
				'ignoreAtRules': ['else'],
				'ignore': ['after-comment'],
				'except': ['first-nested', 'blockless-after-same-name-blockless'],
			},
		],
		'at-rule-no-vendor-prefix': [true, { 'severity': 'warning' }],
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': true,

		// @if-@else
		'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
		'scss/at-if-closing-brace-space-after': 'always-intermediate',
		'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
		'scss/at-else-closing-brace-space-after': 'always-intermediate',
		'scss/at-else-empty-line-before': 'never',
		'scss/at-else-if-parentheses-space-before': 'always',

		// @each
		'scss/at-each-key-value-single-line': true,

		// @extend
		'scss/at-extend-no-missing-placeholder': true,

		// @import
		'scss/at-import-no-partial-leading-underscore': true,
		'scss/at-import-partial-extension': 'never',

		// @mixin
		'scss/at-mixin-argumentless-call-parentheses': 'always',
		'scss/at-mixin-named-arguments': ['always', { 'ignore': ['single-argument'] }],
		'scss/at-mixin-parentheses-space-before': 'never',

		// $variable
		'scss/dollar-variable-colon-newline-after': 'always-multi-line',
		'scss/dollar-variable-colon-space-after': 'always',
		'scss/dollar-variable-colon-space-before': 'never',
		'scss/dollar-variable-no-missing-interpolation': true,
	},
};
