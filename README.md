swig-marked
===========

Markdown filter and tag based on marked


usage:

```javascript
    var marked = require('swig-marked');


    var configured = ext.configure();


    marked.useFilter( swig );
    marked.useTag( swig );

    or, simply:

    swig.setFilter('markdown', marked.filter );






```
