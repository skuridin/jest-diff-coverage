const core = require("@actions/core");
const child = require("child_process");

function main() {
  const testCommand = core.getInput("command");

  child.execSync(testCommand);
  const coveragePercentage = child
    .execSync("npx coverage-percentage ./coverage/lcov.info --lcov")
    .toString();

  if (parseFloat(coveragePercentage) < 80) {
    core.setFailed("Not enough coverage");
  }
}

try {
  main();
} catch (error) {
  core.setFailed(error.message);
}
