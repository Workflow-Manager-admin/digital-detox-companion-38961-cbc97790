#!/bin/bash
cd /home/kavia/workspace/code-generation/digital-detox-companion-38961-cbc97790/digital_detox_companion
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

