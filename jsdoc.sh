#!/bin/bash
## deprecated in favor of a gulp task ATM

node_modules/.bin/jsdoc -d doc -r README.md index.js app lib --verbose
