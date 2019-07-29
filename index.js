const cheerio = require('cheerio')

function generateGTagSnippet(id, minified) {
  return minified ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script><script>window.dataLayer=window.dataLayer||[],window.gtag=function(){dataLayer.push(arguments)},gtag("js",new Date),gtag("config","${id}")</script>`
: `
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id}');
</script>
`
}

module.exports = function injectGTag(html, trackingID, minify) {
  const $ = cheerio.load(html)
  $('head').prepend(generateGTagSnippet(trackingID, minify))
  return $.html()
}
