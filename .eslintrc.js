module.exports = {
  extends: ["alloy", "alloy/react", "alloy/typescript"],
  env: {
    // Your environments (which contains several predefined global variables)
    browser: true,
    node: true
    // mocha: true,
    // jest: true,
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    // myGlobal: false
  },
  plugins: [
    // ...
    "react-hooks"
  ],
  rules: {
    // Customize your rules
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
