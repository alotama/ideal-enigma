'use strict';

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  rules: {
    'at-rule-no-unknown': null,
  },
  ignoreFiles: ['app.css'],
};