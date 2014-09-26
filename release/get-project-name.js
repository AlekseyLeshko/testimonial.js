var fs = require("fs");
var packageFile = fs.readFileSync("package.json");
var packageJson = JSON.parse(packageFile);
console.log(packageJson.name);
