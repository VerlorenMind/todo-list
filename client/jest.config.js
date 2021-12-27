module.exports = {
    testPathIgnorePatterns: ["<rootDir>/cypress/"],
    automock: false,
    setupFiles: [
        "./src/setupTests.js"
    ]
}