/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\.tsx?$': [
            'ts-jest',
            {
                useESM: false,
                tsconfig: 'tsconfig.test.json',
            },
        ],
    },
    moduleNameMapper: {
        '^(\.{1,2}/.*)\.js$': '$1',
    },
    testPathIgnorePatterns: ['/dist/'],
};


