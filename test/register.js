import { register } from 'node:module'
import React from 'react'

register('./css-hooks.js', import.meta.url)

// Makes JSX work in tests, even if tsx ignores tsconfig.json
globalThis.React = React