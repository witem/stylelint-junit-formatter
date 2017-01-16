const escapeString = require('lodash/escape');
const templates = require('./templates');

module.exports = function(stylelintResults) {
  const testSuites = stylelintResults.map((testSuite) => parseSuite(testSuite))
  .join('');

  return templates.xmlWrapper(testSuites);
};

function parseSuite(testSuite) {
  const suiteName = testSuite.source;
  const failuresCount = testSuite.warnings.length;
  const testCases = testSuite.errored
    ? testSuite.warnings.map((testCase) => parseFailedCase(testCase, testSuite.source))
.join('')
: templates.passedTestCase();

  return templates.testSuite(suiteName, failuresCount, testCases);
}

function parseFailedCase(testCase, source) {
  const ruleName = escapeString(testCase.rule);
  const type = escapeString(testCase.severity);
  const message = escapeString(testCase.text);
  const lineNumber = escapeString(testCase.line);
  const column = escapeString(testCase.column);
  const sourceFile = escapeString(source);

  return templates.failedTestCase(ruleName, type, message, lineNumber, column, sourceFile);
}
