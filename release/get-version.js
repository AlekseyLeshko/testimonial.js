var fs = require("fs");
var semver = require("semver");

var packageFile = fs.readFileSync("package.json");
var packageJson = JSON.parse(packageFile);
var ver = semver.parse(packageJson.version);
console.log(ver.toString());
