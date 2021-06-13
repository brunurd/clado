#!/bin/bash

test -d dist && rm -rf dist
tsc
