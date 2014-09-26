function bail(msg) {
  var prexif = '[check-config-files] ';
  process.stderr.write(prexif + msg + '\n');
  console.log(false);
  process.exit(1);
}

module.exports = bail;
