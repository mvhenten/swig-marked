swig-marked
===========

Markdown filter and tag based on marked. As the name already states, this module combines
[swig](https://github.com/paularmstrong/swig/) and [marked](https://github.com/chjj/marked).

There is already a markdown filter/tag in the package `swig-extras`, however, that one uses
[markdown](https://github.com/evilstreak/markdown-js), and I wanted to have `marked` for it's
support for tables and GFM.


usage:

```javascript
    var markedSwig = require('swig-marked'),
        swig = require('swig');


    markedSwig.useFilter( swig );
    markedSwig.useTag( swig );

    swig.render( '{% marked %}# hello world{% endmarked %}' );

    // <h1 id="hello-word">hello world</h1>


    swig.render('{{ words|marked }}', { locals: { words: '# hello word' } });

    // <h1 id="hello-world">hello world</h1>

    // filter and tag are also exposed like so:
    swig.setFilter( 'dingus', markedSwig.filter);
    swig.render('{{ words|dingus }}', { locals: { words: '# hello word' } });

    // <h1 id="hello-world">hello world</h1>

    // provide configuration options to marked:
    var configured = markedSwig.configure({
        gfm: false, // no more gfm :(
    });

```
