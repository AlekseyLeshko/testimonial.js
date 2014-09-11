# Binaries we use
all: clean node_modules build test

build:
	gulp build

test: karma

karma:
	karma start test/karma.conf.js --single-run --browsers PhantomJS

install_karma_cli:
	npm install -g karma-cli

clean:
	rm -rf www

fullclean: clean
	rm -rf ./node_modules
	rm -rf ./bower_components

node_modules:
	npm install
