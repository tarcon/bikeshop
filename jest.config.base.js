module.exports = {
   roots: ["<rootDir>/"],
   testMatch: ["**/*.test.ts"],
   transform: {
      "^.+\\.tsx?$": [
         "ts-jest",
         {
            tsconfig: "../../tsconfig.test.json",
         },
      ],
   },
}
