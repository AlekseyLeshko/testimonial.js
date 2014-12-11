.DEFAULT_TARGET: all
.PHONY: all

all: clean node_modules build test

build:
	gulp build

test:

clean:
	rm -rf www

fullclean: clean
	rm -rf ./node_modules
	rm -rf ./bower_components

node_modules:
	npm install
