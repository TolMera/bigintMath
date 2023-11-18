import { writeFileSync } from 'fs';
import { Config as TJestConfig} from 'jest';

const dependencies = {
};
const devDependencies = {
    "@types/jest": "^29.5.5",
    "jest": "^29.7.0",
    "prettier": "^2.7.1",
    "ts-jest": "^29.1.1",
    "ts-node": "^10.9.1",
    "tslib": "^2.4.0",
    "typescript": "^4.7.4"
}

const repository = {
    type: "git",
    url: "git+https://github.com/TolMera/bigintMath.git"
};

const run = `npm run`;
const build = `${run} compile`;

const scripts = {
    compile: "tsc",

    pretty: "node ./node_modules/prettier/bin-prettier.js --write . --use-tabs --cache --cache-strategy metadata --ignore-unknown --loglevel=warn",

    "update:package": "ts-node package.ts",
    start: "ts-node ./build/index.js",
    runTest: "find ./build/testing -name '*.ts' -not -name '*.d.ts' | while read file; do echo $file && time ts-node $file || exit 1; done;",
    runFile: "time ts-node",

    build,
    deploy: `${build} && ${run} test && npm login && npm publish`,
    deleteBuild: "rm -rf ./build && rm .tsbuildinfo",
    test: `${build} && ${run} runTest`,
    testOne: `${build} && ${run} runFile`,
    jest: `${build} && ${run} jest:test`,

    "jest:test": "jest",
    "list:depend": "jq '.dependencies' package.json",
    "list:devDepend": "jq '.devDependencies' package.json",
}

const files: string[] = [
    "build",
    "README.md",
    "LICENSE",
    "package.json"
];

const keywords:string[] = [
    "bigint",
    "javascript",
    "math",
    "number"
];

const jest: TJestConfig = {
    preset: "ts-jest",
};

const pkg = {
	author: "Bjorn Macintosh <bjorn.macintosh@gmail.com> (http://tolmera.com)",
	license: "custom",
	main: "./build/index.js",
	man: "./readme.md",
    bugs: {"url": "https://github.com/TolMera/bigintMath/issues"},
    dependencies,
    description: "A replacement for Javascripts Math module - adds support for BigInt",
    devDependencies,
    files,
    homepage: "https://github.com/TolMera/bigintMath#readme",
    jest,
    keywords,
    name: "bigintegermath",
    repository,
    scripts,
    version: "0.0.0",
}

const write = function() {
	writeFileSync('./package.json', JSON.stringify(pkg, null, 4));
}

write();
