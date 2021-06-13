#!/bin/bash

jest \
    --forceExit \
    --detectOpenHandles \
    --env=jsdom \
    --watch
