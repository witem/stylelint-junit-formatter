var test = require('tape');
var xml2js = require('xml2js');
var checkstyleFormatter = require('./index');

var mockResults = [
  {
    source: 'path/to/fileA.css',
    errored: false,
    warnings: [
      {
        line: 3,
        column: 8,
        rule: 'block-no-empty',
        severity: 'warning',
        text: 'No empty block!',
      },
    ],
  },
  {
    source: 'path/to/fileB.css',
    errors: true,
    warnings: [
      {
        line: 1,
        column: 2,
        rule: 'foo',
        severity: 'error',
        text: 'foo text',
      },
      {
        line: 2,
        column: 5,
        rule: 'bar',
        severity: 'error',
        text: 'bar text',
      },
    ],
  },
  {
    source: 'path/to/fileC.css',
    errors: false,
    warnings: [],
  },
];

var expectedXml = '<?xml version="1.0" encoding="utf-8"?>\n' +
  '<testsuites>\n' +
  '  <testsuite package="stylelint.rules" name="path/to/fileA.css" tests="1" errors="1">\n' +
  '    <testcase name="block-no-empty">\n' +
  '        <failure message="No empty block!">line="3" column="8" severity="warning"</failure>\n' +
  '    </testcase>\n' +
  '  </testsuite>\n' +
  '  <testsuite package="stylelint.rules" name="path/to/fileB.css" tests="2" errors="2">\n' +
  '    <testcase name="foo">\n' +
  '        <failure message="foo text">line="1" column="2" severity="error"</failure>\n' +
  '    </testcase>\n' +
  '    <testcase name="bar">\n' +
  '        <failure message="bar text">line="2" column="5" severity="error"</failure>\n' +
  '    </testcase>\n' +
  '  </testsuite>\n' +
  '</testsuites>';

test('output XML string', function(t) {
  var output = checkstyleFormatter(mockResults);
  t.equal(output, expectedXml, "matches expectation");
  t.doesNotThrow(function() {
    xml2js.parseString(output, function(err) {
      if (err) throw err;
    });
  }, "is valid XML");
  t.end()
});
