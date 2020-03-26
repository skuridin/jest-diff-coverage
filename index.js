const { setFailed, getInput } = require("@actions/core");
const { execSync } = require("child_process");

function main() {
  const testCommand = getInput("command");

  console.log(`Executing command: ${testCommand}`);
  execSync(testCommand, { stdio: "inherit" });

  console.log("Calculating coverage");
  const coveragePercentage = execSync(
    "npx coverage-percentage ./coverage/lcov.info --lcov"
  ).toString();

  if (parseFloat(coveragePercentage) < 80) {
    setFailed("Not enough coverage");
  }
}

try {
  main();
} catch (error) {
  setFailed(error.message);
}
