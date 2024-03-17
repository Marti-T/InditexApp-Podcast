module.exports = {
    //testEnvironment: 'jest-environment-jsdom',
    //setupFiles: ['./jest.setup.js']
    preset: 'ts-jest',
    //testEnvironment: 'node',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
}