.DEFAULT_TARGET: all
.PHONY: all

all: install_dependencies tests build

install_dependencies: install_global_module
	npm install

install_global_module: install_say_me
	@$(call install_npm_module,gulp,-g)
	@$(call install_npm_module,bower,-g)
	@$(call install_npm_module,karma-cli,-g)
	@$(call install_npm_module,npm-check-updates,-g)

install_say_me:
	npm install -g say-me

build:
	gulp build

tests:
	karma start test/karma.conf.js --single-run --browsers PhantomJS

clean:

fullclean: clean
	rm -rf ./node_modules
	rm -rf ./bower_components

define install_npm_module
	$(eval IS_INSTALLED = $(shell say-me --npmmii $(2) -p $(1)))
	@if [ $(IS_INSTALLED) = "false" ] ; then \
		echo "installing $(1)"; \
		npm install $(2) $(1); \
	fi
	@echo "$(1) is installed"
endef
