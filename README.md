# fa-svgs-in-js

[![NPM version](http://img.shields.io/npm/v/fa-svgs-in-js.svg?style=flat)](https://www.npmjs.com/package/fa-svgs-in-js)
[![NPM downloads](http://img.shields.io/npm/dm/fa-svgs-in-js.svg?style=flat)](https://www.npmjs.com/package/fa-svgs-in-js)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

A tiny helper library that converts the available [Font-Awesome 4.7.0](http://fontawesome.io/) icon-set to a JavaScript object of key value pairs of SVG paths.

This enables easy imports in JavaScript & allows for embedding font-icons as SVG, which circumvents issues created by MIME paths for font-files (ttf, eot, woff) being disallowed or font-download being prevented for security reasons by the browser.

### Usage
```js
import * as faGetIcon from 'fa-svgs-in-js/dist';
const myIcon = faGetIcon('cog');
```
- The key to pass as parameter, follows the same naming as listed [here](http://fontawesome.io/icons/).
- The function can be wrapped in to an attribute directive to be used in Angular/ AngularJs.
- In the world of React the result can be set as Html(dangerouslySetHtml) content.
- Or simply set innerHTML.

### Why?
Ran into an issue with Internet Explorer dis-allowing font-downloads, which hid all the icons with in the application. This is a common issue experienced, and although there were several work arounds, there was not a fluent and easy fix.
Some common bugs with regards to above issues are:
- [Font Awesome Icons won't load](https://stackoverflow.com/questions/23653708/fallback-from-fontawesome-if-font-download-blocked)
- [IE Font download disable work around?](https://github.com/FortAwesome/Font-Awesome/issues/7283)
- [IE11 not showing font awesome icons](https://github.com/FortAwesome/Font-Awesome/issues/8825)

### The Thinking & Approach
- Keep things simple.
- Re-use the well-adopted and well know [Font-Awesome 4.7.0](http://fontawesome.io/) library.
- The approach taken to build this module has two parts. First part, involves downloading the [YML Declaration](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/v4.7.0/src/icons.yml) of the icon set.
The YML file was then used to [font-blast](https://www.npmjs.com/package/font-blast) the concatenated SVG source from font-awesome, the results of which were plumbed later into a JSON file of key value pairs of name vs svg strings. Details on the steps involved can be seen in the [gulpfile](https://github.com/jkodu/fa-icon-in-js/blob/master/gulpfile.js). The second part of the approach involves exposing the icons via a utility method to provide the required svg string as [shown here](https://github.com/jkodu/fa-icon-in-js/blob/master/src/index.js)

### Contributions
- PR's are welcome.
- Please raise issues if any.

### License
Licensed under the MIT license.

### Local Development
Steps | Command | Description
---|---|---
1 | npm run start | Installs all dependencies `node_modules` etc., that are necessary for building the project.
2 | npm run dist | Generate library in ./dist directory.
8 | npm run publish | Publish library/ module. Refer Usage section.
