## --bail
或： -b. 只要一有测试不通过，立马退出测试套件。
## --cache 
是否使用缓存。 默认值为 true。

（注意：
1、可用--no-cache，实现零缓存功能，不过如果没有缓存，那么测试的速度会慢很多；

2、可用--showConfig，查看缓存目录的内容，如果需要清缓存，可以使用--clearCache指令
）

## --ci #
When this option is provided, Jest will assume it is running in a CI environment. 当遇到新的快照时，这会改变原来的行为。 Instead of the regular behavior of storing a new snapshot automatically, it will fail the test and require Jest to be run with --updateSnapshot.

## --clearCache #
仅用于jest 22.0.0+ #
Deletes the Jest cache directory and then exits without running tests. Will delete cacheDirectory if the option is passed, or Jest's default cache directory. The default cache directory can be found by calling jest --showConfig. Note: clearing the cache will reduce performance.
--collectCoverageFrom=<glob> #
Relative to the root directory, glob pattern matching the files that coverage info needs to be collected from.

## --colors #
即便stdout不是TTY模式， 也要强制高亮显示测试结果。

## --config=<path> #
或: -c. The path to a Jest config file specifying how to find and execute tests. If no rootDir is set in the config, the current directory is assumed to be the rootDir for the project. This can also be a JSON-encoded value which Jest will use as configuration.

## --coverage #
Indicates that test coverage information should be collected and reported in the output.

## --debug #
Print debugging info about your Jest config.

## --env=<environment> #
The test environment used for all tests. This can point to any file or node module. Examples: jsdom, node or path/to/my-environment.js.

## --expand #
别名︰ -e。使用该参数来对比完整的差异和错误，而非修复。

## --findRelatedTests <spaceSeparatedListOfSourceFiles> #
Find and run the tests that cover a space separated list of source files that were passed in as arguments. Useful for pre-commit hook integration to run the minimal amount of tests necessary.

## --forceExit #
强制Jest在所有测试运行完后退出。 This is useful when resources set up by test code cannot be adequately cleaned up. Note: This feature is an escape-hatch. If Jest doesn't exit at the end of a test run, it means external resources are still being held on to or timers are still pending in your code. It is advised to tear down external resources after each test to make sure Jest can shut down cleanly.

## --help #
显示帮助信息，类似于本页文档。

## --json #
Prints the test results in JSON. This mode will send all other test output and user messages to stderr.

## --outputFile=<filename> #
通过 — — json 参数可以将测试结果写入到指定文件。

## --lastCommit #
将运行在上次提交文件更改后的所有测试。

## --listTests #
Lists all tests as JSON that Jest will run given the arguments, and exits. This can be used together with --findRelatedTests to know which tests Jest will run.

## --logHeapUsage #
Logs the heap usage after every test. Useful to debug memory leaks. Use together with --runInBand and --expose-gc in node.

## --maxWorkers=<num> #
别名︰ -w。 Specifies the maximum number of workers the worker-pool will spawn for running tests. This defaults to the number of the cores available on your machine. It may be useful to adjust this in resource limited environments like CIs but the default should be adequate for most use-cases.

## --noStackTrace #
禁止栈跟踪信息在测试结果输出中。

## --notify #
Activates notifications for test results. Good for when you don't want your consciousness to be able to focus on anything except JavaScript testing.

## --onlyChanged #
或: -o. Attempts to identify which tests to run based on which files have changed in the current repository. Only works if you're running tests in a git/hg repository at the moment and requires a static dependency graph (ie. no dynamic requires).

## --projects <project1> ... <projectN> #
从一个或多个项目中运行测试。

## --runInBand #
Alias: -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.

## --setupTestFrameworkScriptFile=<file> #
The path to a module that runs some code to configure or set up the testing framework before each test. Beware that files imported by the setup script will not be mocked during testing.

## --showConfig #
输出Jest配置，然后退出。

## --silent #
阻止所有测试通过控制台输出信息。

## --testNamePattern=<regex> #
Alias: -t. Run only tests and test suites with a name that matches the regex. For example, suppose you want to run only tests related to authorization which will have names like "GET /api/posts with auth", then you can use jest -t=auth.

## --testLocationInResults #
Adds a location field to test results. Useful if you want to report the location of a test in a reporter.
Note that column is 0-indexed while line is not.
{
  "column": 4,
  "line": 5
}

## --testPathPattern=<regex> #
A regexp pattern string that is matched against all tests paths before executing the test.

## --testRunner=<path> #
允许你指定自定义测试运行程序。

## --updateSnapshot #
或: -u. Use this flag to re-record every snapshot that fails during this test run. Can be used together with a test suite pattern or with --testNamePattern to re-record snapshots.

## --useStderr #
转移所有输出到stderr(标准错误输出).

## --verbose #
层次显示测试套件中每个测试的结果。

## --version #
或: -v. 打印版本并退出。

## --watch #
Watch files for changes and rerun tests related to changed files. If you want to re-run all tests when a file has changed, use the 

## --watchAll option instead.

## --watchAll #
Watch files for changes and rerun all tests when something changes. If you want to re-run only the tests that depend on the changed files, use the --watch option.

## --watchman #
Whether to use watchman for file crawling. Defaults to true. Disable using --no-watchman.