var _ = require('lodash');

module.exports = function(stylelintResults) {
  var xml = '<?xml version="1.0" encoding="utf-8"?>';
  xml += '\n<testsuites>';
  stylelintResults.forEach(function(stylelintResult) {
    if (!stylelintResult.warnings.length) {
      return;
    }
    xml += '\n  <testsuite package="stylelint.rules" ';
    xml += 'name="' + _.escape(stylelintResult.source) + '" ';
    xml += 'tests="' + stylelintResult.warnings.length + '" ';
    xml += 'errors="' + stylelintResult.warnings.length + '">';

    stylelintResult.warnings.forEach(function(warning) {
      xml += '\n    <testcase name="' + _.escape(warning.rule) + '">';
      xml += '\n        <failure message="' + _.escape(warning.text) + '">';
      xml += 'line="' + _.escape(warning.line) + '" ';
      xml += 'column="' + _.escape(warning.column) + '" ';
      xml += 'severity="' + _.escape(warning.severity) + '"';
      xml += '</failure>';
      xml += '\n    </testcase>';
    });
    xml += '\n  </testsuite>';
  });
  xml += '\n</testsuites>';
  return xml;
}
