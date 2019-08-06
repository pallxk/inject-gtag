inject-gtag
===========

[![inject-gtag @ npm](https://img.shields.io/npm/v/inject-gtag)](https://www.npmjs.com/package/inject-gtag)

A CLI & helper function to inject gtag.js code snippet into an html file. Just like what [Cloudflare Google Analytics App](https://www.cloudflare.com/apps/google-analytics) does.

The following is the code snippet to be inserted as the first item of `<HEAD>`. It can optionally be inserted as minified.

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id}');
</script>
```


## Install as CLI

```sh
npm i -g inject-gtag
```

### Usage

```
inject-gtag --id <tracking_id> [ [-i|--input] <input_file> ] [ [-o|--output] <output_file> ] [--minify]

Options:
  --help        Show help                                              [boolean]
  --version     Show version number                                    [boolean]
  --id          Google Analytics / Global Site Tag Tracking ID        [required]
  -i, --input   path to input html file                  [default: "/dev/stdin"]
  -o, --output  path to output html file                [default: "/dev/stdout"]
  --minify      minify the gtag code snippet          [boolean] [default: false]
```

### Examples

```sh
# Reads stdin and wrties stdout by default
inject-gtag --id UA-123456789-1 < original.html > injected.html
curl -s example.com | inject-gtag --id UA-123456789-1 > my.html

# Specify the same file as input and output to make change in-place
inject-gtag --id UA-123456789-1 -i path/to/my/file.html -o path/to/my/file.html

# Specify --minify to minify the gtag code snippet
# (Note that it does not minify other parts of the html page)
# Input and output can be specified as positional arguments
inject-gtag --minify --id UA-123456789-1 a.html b.html
```


## Install as package dependency

```sh
npm i inject-gtag
```

### Usage & Examples

#### HTML string as arguments

API:

```js
const injectGTag = require('inject-gtag');
injectGTag(html, trackingID, minify = false);
```

Code Example:

```js
const injectGTag = require('inject-gtag');
const html = '<!doctype html><html><head><title>Hello World</title></head><body>Morning World</body></html>';
const injectedHTML = injectGTag(html, 'UA-123456789-1', true);
console.log(injectedHTML);
```

#### Filename as arguments

API:

```js
const injectGTag = require('inject-gtag/cli');
injectGTagFile(input, output, trackingID, minify = false);
```

Code Example:

```js
const injectGTag = require('inject-gtag/cli');

const inputFilename = 'a.html';
const outputFilename = 'b.html';
const trackingID = 'UA-123456789-1';
const minify = true;
injectGTag(inputFilename, outputFilename, trackingID, minify);
```


## LICENSE

[MIT](LICENSE)
