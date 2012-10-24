#!/bin/bash

for i in spec/*.js; do echo -n "Running $i... "; node "$i"; echo ""; done
