/** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest", {}],
//   },
//   preset: "ts-jest",
// };

const testEnvironment = "node",
  transform = {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  preset = "ts-jest";

export default { testEnvironment, transform, preset };
