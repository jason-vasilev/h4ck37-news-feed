/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard-scss'],
	plugins: ['stylelint-scss', 'stylelint-order'],
	rules: {
		'selector-class-pattern': [
			'^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
			{ message: 'Expected class selector to follow BEM naming convention' },
		],
		'order/order': [
			[
				{ type: 'at-rule', name: 'include', hasBlock: false },
				'custom-properties',
				'dollar-variables',
				'declarations',
				{ type: 'at-rule', name: 'include', hasBlock: true },
				'rules',
			],
			{ severity: 'warning' },
		],
	},
};
