.DEFAULT_TARGET: all
.PHONY: all

all: clean install_dependencies copy

install_dependencies: install_global_module
	npm install

install_global_module: install_say_me
	@$(call install_npm_module,http-server,-g)

install_say_me:
	npm install -g say-me

copy:
	cp node_modules/testimonial/dist/js/testimonial.min.js javascripts/
	cp node_modules/testimonial/dist/css/testimonial.min.css stylesheets/
	cp -a node_modules/testimonial/dist/img/. img/

clean:
	rm -f javascripts/testimonial.min.js
	rm -f stylesheets/testimonial.min.css
	rm -rf img/

define install_npm_module
	$(eval IS_INSTALLED = $(shell say-me --npmmii $(2) -p $(1)))
	@if [ $(IS_INSTALLED) = "false" ] ; then \
		echo "installing $(1)"; \
		npm install $(2) $(1); \
	fi
	@echo "$(1) is installed"
endef
