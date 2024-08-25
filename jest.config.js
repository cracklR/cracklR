/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          allowImportingTsExtensions: true,
          noEmit: true,
          esModuleInterop: true,
        },
      },
    ],
  },
};
