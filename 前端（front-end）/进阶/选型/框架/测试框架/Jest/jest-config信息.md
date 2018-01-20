## automock [boolean] #
默认值︰false

这个选项是默认不开启的。 如果你正在引入 Jest 到一个已有很多代码但只有少量测试用例的大型项目中，开启这个选项能够方便你逐步地引入更多单元测试。 通过使用 jest.mock(moduleName) 可以把项目中的模块显式地指定为自动模拟（auto-mocked） 模块。
注意： fs 这种核心模块，默认是不模拟的。它们可以通过 jest.mock('fs') 来被显式地指定模拟。
注意：自动模拟会有一些性能的消耗，在大型工程中会很明显。请参考 这里 获取详细的应对方法。

## browser [boolean] #
默认值︰false

当解析模块时，package.json 中的 Browserify 的 "browser" 字段会发挥作用。 在 Node 和在浏览器中进行操作时某些模块会导出不同版本功能，与平台相关。

## bail [boolean] #
默认值︰false

Jest默认会运行所有的测试用例然后导出所有的错误到控制台中直至结束。添加bail 配置选项后， Jest 遇到第一个失败就会停止继续运行测试用例。

## cacheDirectory [string] #
默认值︰ "/tmp/<path>"

Jest用来储存依赖信息缓存的目录。
Jest 前期(up-front) 会尝试去扫描一次项目的依赖树并将依赖树缓存起来，目的是省却掉某些在运行测试时需要进行的文件系统排序。 这一配置选项让你可以自定义Jest将缓存数据储存在磁盘的那个位置。

## collectCoverage [boolean] #
默认值︰false

此项配置指示是否收集测试时的覆盖率信息。 由于要带上覆盖率搜集语句重新访问所有执行过的文件，测试执行速度可能会明显减慢。

## collectCoverageFrom [array] #
默认值：undefined

可以用一个 通配模式 的数组来指出仅哪些文件需要收集覆盖率信息。 如果一个文件复合glob文件语法匹配规则，即使没有关于它的测试用例存在，或也没有任何测试用例依赖它，它的覆盖率信息也将被收集。
示例：
{
  "collectCoverageFrom": [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
}
这个配置将收集项目 根目录 下的，除了 **/node_modules/** 或 **/vendor/** 匹配的所有文件的覆盖率信息。
注意：该选项要求 collectCoverage 被设成true，或者通过 --coverage 参数来调用 Jest。

## coverageDirectory [string] #
默认值：undefined

Jest输出覆盖信息文件的目录。

## coveragePathIgnorePatterns [array<string>] #
默认值︰["node_modules"]

An array of regexp pattern strings that are matched against all file paths before executing the test. If the file path matches any of the patterns, coverage information will be skipped.
These pattern strings match against the full path. Use the <rootDir> string token to include the path to your project's root directory to prevent it from accidentally ignoring all of your files in different environments that may have different root directories. Example: ["<rootDir>/build/", "<rootDir>/node_modules/"].

## coverageReporters [array<string>] #
默认值：["json"、"lcov"、"text"]

A list of reporter names that Jest uses when writing coverage reports. Any istanbul reporter can be used.
Note: Setting this option overwrites the default values. Add "text" or "text-summary" to see a coverage summary in the console output.

## coverageThreshold [object] #
默认值：undefined

This will be used to configure minimum threshold enforcement for coverage results. Thresholds can be specified as global, as a glob, and as a directory or file path. If thresholds aren't met, jest will fail. Thresholds specified as a positive number are taken to be the minimum percentage required. Thresholds specified as a negative number represent the maximum number of uncovered entities allowed.
For example, with the following configuration jest will fail if there is less than 80% branch, line, and function coverage, or if there are more than 10 uncovered statements:
```
{
  ...
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": -10
      }
    }
  }
}
```
If globs or paths are specified alongside global, coverage data for matching paths will be subtracted from overall coverage and thresholds will be applied independently. Thresholds for globs are applied to all files matching the glob. If the file specified by path is not found, error is returned.
For example, with the following configuration:
```
{
  ...
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 50,
        "functions": 50,
        "lines": 50,
        "statements": 50
      },
      "./src/components/": {
        "branches": 40,
        "statements": 40
      },
      "./src/reducers/**/*.js": {
        "statements": 90,
      },
      "./src/api/very-important-module.js": {
        "branches": 100,
        "functions": 100,
        "lines": 100,
        "statements": 100
      }
    }
  }
}
```
Jest will fail if:
The ./src/components directory has less than 40% branch or statement coverage.
One of the files matching the ./src/reducers/**/*.js glob has less than 90% statement coverage.
The ./src/api/very-important-module.js file has less than 100% coverage.
Every remaining file combined has less than 50% coverage (global).

## forceCoverageMatch [array<string>] #
默认值：['']

Test files are normally ignored from collecting code coverage. With this option, you can overwrite this behavior and include otherwise ignored files in code coverage.
For example, if you have tests in source files named with .t.js extension as following:
``` js
// sum.t.js

export function sum(a, b) {
  return a + b;
}

if (process.env.NODE_ENV === 'test') {
  test('sum', () => {
    expect(sum(1, 2)).toBe(3);
  });
}
```

You can collect coverage from those files with setting forceCoverageMatch.
```
{
  ...
  "jest": {
    "forceCoverageMatch": ["**/*.t.js"]
  }
}
```

## globals [object] #
默认值：{}

一组全局变量，在所有测试环境下都可以访问。

For example, the following would create a global __DEV__ variable set to true in all test environments:
```
{
  ...
  "jest": {
    "globals": {
      "__DEV__": true
    }
  }
}
```
Note that, if you specify a global reference value (like an object or array) here, and some code mutates that value in the midst of running a test, that mutation will not be persisted across test runs for other test files.

## globalSetup [string] #
默认值：undefined

This option allows the use of a custom global setup module which exports an async function that is triggered once before all test suites.

## globalTeardown [string] #
默认值：undefined

This option allows the use of a custom global teardown module which exports an async function that is triggered once after all test suites.

## mapCoverage [boolean] #
默认值︰false

仅用于jest 20.0.0+ #

If you have transformers configured that emit source maps, Jest will use them to try and map code coverage against the original source code when writing reports and checking thresholds. This is done on a best-effort basis as some compile-to-JavaScript languages may provide more accurate source maps than others. This can also be resource-intensive. If Jest is taking a long time to calculate coverage at the end of a test run, try setting this option to false.
Both inline source maps and source maps returned directly from a transformer are supported. Source map URLs are not supported because Jest may not be able to locate them. To return source maps from a transformer, the process function can return an object like the following. The map property may either be the source map object, or the source map object as a JSON string.
```
return {
  code: 'the code',
  map: 'the source map',
};
```

## moduleFileExtensions [array<string>] #
默认值：["js"、"json"、"jsx"、"node"]

An array of file extensions your modules use. If you require modules without specifying a file extension, these are the extensions Jest will look for.
If you are using TypeScript this should be ["js", "jsx", "json", "ts", "tsx"], check ts-jest's documentation.

## moduleDirectories [array<string>] #
默认值︰["node_modules"]

An array of directory names to be searched recursively up from the requiring module's location. Setting this option will override the default, if you wish to still search node_modules for packages include it along with any other options: ["node_modules", "bower_components"]

## moduleNameMapper [object<string, string>] #
默认值︰null

A map from regular expressions to module names that allow to stub out resources, like images or styles with a single module.
Modules that are mapped to an alias are unmocked by default, regardless of whether automocking is enabled or not.
Use <rootDir> string token to refer to rootDir value if you want to use file paths.
Additionally, you can substitute captured regex groups using numbered backreferences.
```
示例：
{
  "moduleNameMapper": {
    "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
    "^[./a-zA-Z0-9$_-]+\\.png$": "<rootDir>/RelativeImageStub.js",
    "module_name_(.*)": "<rootDir>/substituted_module_$1.js"
  }
}
```
Note: If you provide module name without boundaries ^$ it may cause hard to spot errors. E.g. relay will replace all modules which contain relay as a substring in its name: relay, react-relay and graphql-relay will all be pointed to your stub.

## modulePathIgnorePatterns [array<string>] #
默认值：[]

An array of regexp pattern strings that are matched against all module paths before those paths are to be considered 'visible' to the module loader. If a given module's path matches any of the patterns, it will not be require()-able in the test environment.
These pattern strings match against the full path. Use the <rootDir> string token to include the path to your project's root directory to prevent it from accidentally ignoring all of your files in different environments that may have different root directories. Example: ["<rootDir>/build/"].

## modulePaths [array<string>] #
默认值：[]

An alternative API to setting the NODE_PATH env variable, modulePaths is an array of absolute paths to additional locations to search when resolving modules. Use the <rootDir> string token to include the path to your project's root directory. Example: ["<rootDir>/app/"].

## notify [boolean] #
默认值︰false

Activates notifications for test results.

## preset [string] #
默认值：undefined

A preset that is used as a base for Jest's configuration. A preset should point to an npm module that exports a jest-preset.json module on its top level.

## projects [array<string>] #
默认值：undefined

When the projects configuration is provided with an array of paths or glob patterns, Jest will run tests in all of the specified projects at the same time. This is great for monorepos or when working on multiple projects at the same time.
```
{
  "projects": ["<rootDir>", "<rootDir>/examples/*"]
}
```
This example configuration will run Jest in the root directory as well as in every folder in the examples directory. You can have an unlimited amount of projects running in the same Jest instance.

## clearMocks [boolean] #
默认值︰false

Automatically clear mock calls and instances between every test. Equivalent to calling jest.clearAllMocks() between each test. This does not remove any mock implementation that may have been provided.

## reporters [array<modulename | [modulename, options]>] #
默认值：undefined

仅用于jest 20.0.0+ #

Use this configuration option to add custom reporters to Jest. A custom reporter is a class that implements onRunStart, onTestStart, onTestResult, onRunComplete methods that will be called when any of those events occurs.
If custom reporters are specified, the default Jest reporters will be overridden. To keep default reporters, default can be passed as a module name.
This will override default reporters:
```
{
  "reporters": ["<rootDir>/my-custom-reporter.js"]
}
This will use custom reporter in addition to default reporters that Jest provides:
{
  "reporters": ["default", "<rootDir>/my-custom-reporter.js"]
}
Additionally, custom reporters can be configured by passing an options object as a second argument:
{
  "reporters": [
    "default",
    ["<rootDir>/my-custom-reporter.js", {"banana": "yes", "pineapple": "no"}]
  ]
}
```
Custom reporter modules must define a class that takes a GlobalConfig and reporter options as constructor arguments:

Example reporter:
```js
// my-custom-reporter.js
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    console.log('Custom reporter output:');
    console.log('GlobalConfig: ', this._globalConfig);
    console.log('Options: ', this._options);
  }
}

module.exports = MyCustomReporter;
Custom reporters can also force Jest to exit with non-0 code by returning an Error from getLastError() methods
class MyCustomReporter {
  // ...
  getLastError() {
    if (this._shouldFail) {
      return new Error('my-custom-reporter.js reported an error');
    }
  }
}
```
For the full list of methods and argument types see Reporter type in types/TestRunner.js

## resetMocks [boolean] #
默认值︰false

Automatically reset mock state between every test. Equivalent to calling jest.resetAllMocks() between each test. This will lead to any mocks having their fake implementations removed but does not restore their initial implementation.

## resetModules [boolean] #
默认值︰false

If enabled, the module registry for every test file will be reset before running each individual test. This is useful to isolate modules for every test so that local module state doesn't conflict between tests. This can be done programmatically using jest.resetModules().

## resolver [string] #
默认值：undefined

仅用于jest 20.0.0+ #

This option allows the use of a custom resolver. This resolver must be a node module that exports a function expecting a string as the first argument for the path to resolve and an object with the following structure as the second argument:
```
{
  "basedir": string,
  "browser": bool,
  "extensions": [string],
  "moduleDirectory": [string],
  "paths": [string],
  "rootDir": [string]
}
```
The function should either return a path to the module that should be resolved or throw an error if the module can't be found.

## rootDir [string] #
默认值︰The root of the directory containing your jest's config file or the package.json or the pwd if no package.json is found

The root directory that Jest should scan for tests and modules within. If you put your Jest config inside your package.json and want the root directory to be the root of your repo, the value for this config param will default to the directory of the package.json.
Oftentimes, you'll want to set this to 'src' or 'lib', corresponding to where in your repository the code is stored.
Note that using '<rootDir>' as a string token in any other path-based config settings will refer back to this value. So, for example, if you want your setupFiles config entry to point at the env-setup.js file at the root of your project, you could set its value to ["<rootDir>/env-setup.js"].

## roots [array<string>] #
默认值︰["<rootDir>"]

A list of paths to directories that Jest should use to search for files in.
There are times where you only want Jest to search in a single sub-directory (such as cases where you have a src/ directory in your repo), but prevent it from accessing the rest of the repo.

Note: While rootDir is mostly used as a token to be re-used in other configuration options, roots is used by the internals of Jest to locate test files and source files. This applies also when searching for manual mocks for modules from node_modules (__mocks__ will need to live in one of the roots).
Note: By default, roots has a single entry <rootDir> but there are cases where you may want to have multiple roots within one project, for example roots: ["<rootDir>/src/", "<rootDir>/tests/"].

## setupFiles [array] #
默认值：[]

The paths to modules that run some code to configure or set up the testing environment before each test. Since every test runs in its own environment, these scripts will be executed in the testing environment immediately before executing the test code itself.
It's worth noting that this code will execute before setupTestFrameworkScriptFile.

## setupTestFrameworkScriptFile [string] #
默认值：undefined

The path to a module that runs some code to configure or set up the testing framework before each test. Since setupFiles executes before the test framework is installed in the environment, this script file presents you the opportunity of running some code immediately after the test framework has been installed in the environment.
For example, Jest ships with several plug-ins to jasmine that work by monkey-patching the jasmine API. If you wanted to add even more jasmine plugins to the mix (or if you wanted some custom, project-wide matchers for example), you could do so in this module.

## snapshotSerializers [array<string>] #
默认值：[]

A list of paths to snapshot serializer modules Jest should use for snapshot testing.
Jest has default serializers for built-in JavaScript types, HTML elements (Jest 20.0.0+), ImmutableJS (Jest 20.0.0+) and for React elements. See snapshot test tutorial for more information.
Example serializer module:
```js
// my-serializer-module
module.exports = {
  print(val, serialize, indent) {
    return 'Pretty foo: ' + serialize(val.foo);
  },

  test(val) {
    return val && val.hasOwnProperty('foo');
  },
};
serialize is a function that serializes a value using existing plugins.
To use my-serializer-module as a serializer, configuration would be as follows:
{
  ...
  "jest": {
    "snapshotSerializers": ["my-serializer-module"]
  }
}
Finally tests would look as follows:
test(() => {
  const bar = {
    foo: {
      x: 1,
      y: 2,
    },
  };

  expect(bar).toMatchSnapshot();
});
Rendered snapshot:
Pretty foo: Object {
  "x": 1,
  "y": 2,
}
```

To make a dependency explicit instead of implicit, you can call expect.addSnapshotSerializer to add a module for an individual test file instead of adding its path to snapshotSerializers in Jest configuration.

## testEnvironment [string] #
默认值︰"jsdom"

The test environment that will be used for testing. The default environment in Jest is a browser-like environment through jsdom. If you are building a node service, you can use the node option to use a node-like environment instead.

If some tests require another environment, you can add a @jest-environment docblock.

仅用于jest 20.0.0+ #
```js
/**
 * @jest-environment jsdom
 */
test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});
```

You can create your own module that will be used for setting up the test environment. The module must export a class with setup, teardown and runScript methods.
仅用于jest 22.0.0+ #
Note: TestEnvironment is sandboxed. Each test suite will trigger setup/teardown in their own TestEnvironment.

示例：
``` js
const NodeEnvironment = require('jest-environment-node');
class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    await someSetupTasks();
  }

  async teardown() {
    await someTeardownTasks();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}
```

## testEnvironmentOptions [Object] #
仅用于jest 22.0.0+ #
默认值：{}

Test environment options that will be passed to the testEnvironment. The relevant options depend on the environment. For example you can override options given to jsdom such as {userAgent: "Agent/007"}.

## testMatch [array<string>] #
仅用于jest 19.0.0+ #
(默认值：[ '**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)' ])

The glob patterns Jest uses to detect test files. By default it looks for .js and .jsx files inside of __tests__ folders, as well as any files with a suffix of .test or .spec (e.g. Component.test.js or Component.spec.js). It will also find files called test.js or spec.js.
See the micromatch package for details of the patterns you can specify.
See also testRegex [string], but note that you cannot specify both options.

## testPathIgnorePatterns [array<string>] #
默认值︰["node_modules"]

An array of regexp pattern strings that are matched against all test paths before executing the test. If the test path matches any of the patterns, it will be skipped.
These pattern strings match against the full path. Use the <rootDir> string token to include the path to your project's root directory to prevent it from accidentally ignoring all of your files in different environments that may have different root directories. Example: ["<rootDir>/build/", "<rootDir>/node_modules/"].

## testRegex [string] #
默认值：(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$

The pattern Jest uses to detect test files. By default it looks for .js and .jsx files inside of __tests__ folders, as well as any files with a suffix of .test or .spec (e.g. Component.test.js or Component.spec.js). It will also find files called test.js or spec.js. See also testMatch [array<string>], but note that you cannot specify both options.
The following is a visualization of the default regex:
├── __tests__
│   └── component.spec.js # test
│   └── anything # test
├── package.json # not test
├── foo.test.js # test
├── bar.spec.jsx # test
└── component.js # not test

## testResultsProcessor [string] #
默认值：undefined

This option allows the use of a custom results processor. This processor must be a node module that exports a function expecting an object with the following structure as the first argument and return it:
{
  "success": bool,
  "startTime": epoch,
  "numTotalTestSuites": number,
  "numPassedTestSuites": number,
  "numFailedTestSuites": number,
  "numRuntimeErrorTestSuites": number,
  "numTotalTests": number,
  "numPassedTests": number,
  "numFailedTests": number,
  "numPendingTests": number,
  "testResults": [{
    "numFailingTests": number,
    "numPassingTests": number,
    "numPendingTests": number,
    "testResults": [{
      "title": string (message in it block),
      "status": "failed" | "pending" | "passed",
      "ancestorTitles": [string (message in describe blocks)],
      "failureMessages": [string],
      "numPassingAsserts": number,
      "location": {
        "column": number,
        "line": number
      }
    },
    ...
    ],
    "perfStats": {
      "start": epoch,
      "end": epoch
    },
    "testFilePath": absolute path to test file,
    "coverage": {}
  },
  ...
  ]
}

## testRunner [string] #
默认值︰jasmine2

This option allows use of a custom test runner. The default is jasmine2. A custom test runner can be provided by specifying a path to a test runner implementation.
The test runner module must export a function with the following signature:
function testRunner(
  config: Config,
  environment: Environment,
  runtime: Runtime,
  testPath: string,
): Promise<TestResult>
An example of such function can be found in our default jasmine2 test runner package.

## testURL [string] #
默认值：about:blank

This option sets the URL for the jsdom environment. It is reflected in properties such as location.href.

## timers [string] #
默认值︰real

Setting this value to fake allows the use of fake timers for functions such as setTimeout. Fake timers are useful when a piece of code sets a long timeout that we don't want to wait for in a test.

## transform [object<string, string>] #
默认值：undefined

A map from regular expressions to paths to transformers. A transformer is a module that provides a synchronous function for transforming source files. For example, if you wanted to be able to use a new language feature in your modules or tests that isn't yet supported by node, you might plug in one of many compilers that compile a future version of JavaScript to a current one. Example: see the examples/typescript example or the webpack tutorial.
Examples of such compilers include Babel, TypeScript and async-to-gen.
Note: a transformer is only ran once per file unless the file has changed. During development of a transformer it can be useful to run Jest with --no-cache or to frequently delete Jest's cache.
Note: if you are using the babel-jest transformer and want to use an additional code preprocessor, keep in mind that when "transform" is overwritten in any way the babel-jest is not loaded automatically anymore. If you want to use it to compile JavaScript code it has to be explicitly defined. See babel-jest plugin

## transformIgnorePatterns [array<string>] #
默认值︰["node_modules"]

An array of regexp pattern strings that are matched against all source file paths before transformation. If the test path matches any of the patterns, it will not be transformed.
These pattern strings match against the full path. Use the <rootDir> string token to include the path to your project's root directory to prevent it from accidentally ignoring all of your files in different environments that may have different root directories.
Example: ["<rootDir>/bower_components/", "<rootDir>/node_modules/"].
Sometimes it happens (especially in React Native or TypeScript projects) that 3rd party modules are published as untranspiled. Since all files inside node_modules are not transformed by default, Jest will not understand the code in these modules, resulting in syntax errors. To overcome this, you may use transformIgnorePatterns to whitelist such modules. You'll find a good example of this use case in React Native Guide.

## unmockedModulePathPatterns [array<string>] #
默认值：[]

An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them. If a module's path matches any of the patterns in this list, it will not be automatically mocked by the module loader.
This is useful for some commonly used 'utility' modules that are almost always used as implementation details almost all the time (like underscore/lo-dash, etc). It's generally a best practice to keep this list as small as possible and always use explicit jest.mock()/jest.unmock() calls in individual tests. Explicit per-test setup is far easier for other readers of the test to reason about the environment the test will run in.
It is possible to override this setting in individual tests by explicitly calling jest.mock() at the top of the test file.

## verbose [boolean] #
默认值︰false
Indicates whether each individual test should be reported during the run. All errors will also still be shown on the bottom after execution.

## watchPathIgnorePatterns [array<string>] #
默认值：[]

仅用于jest 21.0.0+ #

An array of RegExp patterns that are matched against all source file paths before re-running tests in watch mode. If the file path matches any of the patterns, when it is updated, it will not trigger a re-run of tests.
These patterns match against the full path. Use the <rootDir> string token to include the path to your project's root directory to prevent it from accidentally ignoring all of your files in different environments that may have different root directories. Example: ["<rootDir>/node_modules/"].