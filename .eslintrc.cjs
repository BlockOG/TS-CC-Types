// This is the configuration file for ESLint, the TypeScript linter:
// https://eslint.org/docs/latest/use/configure/
module.exports = {
    extends: [
        // The linter base is the shared IsaacScript config:
        // https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-config-isaacscript/base.js
        "eslint-config-isaacscript/base",
    ],

    parserOptions: {
        // ESLint needs to know about the project's TypeScript settings in order for
        // TypeScript-specific things to lint correctly. We do not point this at "./tsconfig.json"
        // because certain files (such at this file) should be linted but not included in the actual
        // project output.
        project: "./tsconfig.eslint.json",
    },

    rules: {
        // Insert changed or disabled rules here, if necessary.
        "jsdoc/check-values": "off",
        "no-underscore-dangle": "off",
        "@typescript-eslint/triple-slash-reference": "off",
        /**
         * Documentation:
         * https://github.com/gajus/eslint-plugin-jsdoc#check-tag-names
         *
         * Reports invalid block tag names. Since "@changed" is not an official tag, we have to
         * manually add it here. And also the compiler annotations.
         */
        "jsdoc/check-tag-names": [
            "warn",
            {
                definedTags: ["changed", "noSelf", "noSelfInFile"],
            },
        ],
    },
};
