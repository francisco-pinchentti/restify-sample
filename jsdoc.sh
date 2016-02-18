#!/bin/bash

node_modules/.bin/jsdoc -d doc -r README.md index.js app lib --verbose
