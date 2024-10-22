install: deps-install
	npx simple-git-hooks

deps-update:
	npx ncu -u

deps-install:
	npm ci --legacy-peer-deps

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test