.DEFAULT_TARGET: all
.PHONY: all

all: clean install_dependencies copy

install_dependencies:
	npm install

copy:
	cp node_modules/testimonial/dist/js/testimonial.min.js javascripts/
	cp node_modules/testimonial/dist/css/testimonial.min.css stylesheets/
	cp -a node_modules/testimonial/dist/img/. img/

clean:
	rm -f javascripts/testimonial.min.js
	rm -f stylesheets/testimonial.min.css
	rm -rf img/
