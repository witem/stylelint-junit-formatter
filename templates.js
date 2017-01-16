const xmlWrapper = (xml) => (
  `<?xml version="1.0" encoding="utf-8"?>
<testsuites package="stylelint.rules">
${xml}</testsuites>`
);

const testSuite = (name, failuresCount, cases) => {
  const head = `  <testsuite name="${name}" failures="${failuresCount}" errors="${failuresCount}" tests="${ failuresCount || '1'}"`;
  const tail = cases !== null ? `>\n${cases}  </testsuite>\n` : `/>\n`;

  return head + tail;
};

const failedTestCase = (ruleName, type, message, lineNumber, column, sourceFile) => (
  `    <testcase name="${ruleName}">
      <failure type="${type}"
               message="${message}">
       On line ${lineNumber}, column ${column} in ${sourceFile}
      </failure>
    </testcase>
`
);

const passedTestCase = () => (
  `    <testcase name="stylelint.passed"/>
`
);

module.exports.xmlWrapper = xmlWrapper;
module.exports.testSuite = testSuite;
module.exports.failedTestCase = failedTestCase;
module.exports.passedTestCase = passedTestCase;
