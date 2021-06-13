#!/bin/bash

jest \
    --forceExit \
    --detectOpenHandles \
    --env=jsdom \
    --reporters=default \
    --maxWorkers=1 \
    --reporters=jest-junit \
    --coverage \
    --watchAll=false
