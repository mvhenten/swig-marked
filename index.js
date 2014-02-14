var marked = require('marked');

/**
 * {% markdown }...{% endmarkdown %}
 *
 * Based upon the original markdown tag writen by Paul Armstrong
 * https://github.com/paularmstrong/swig-extras
 *
 * Extended from the markdown tag written by Jon Schlinkert, Brian Woodward & contributors
 */
function tag(marked) {
    return {
        parse: function(str, line, parser, types, options) {
            parser.on('*', function() {
                throw new Error('The marked tag does not accept arguments');
            });

            return true;
        },

        compile: function(compiler, args, content, parents, options, blockName) {
            return '(function () {\n' +
                '  var __o = _output;\n' +
                '  _output = "";\n' +
                compiler(content, parents, options, blockName) + ';\n' +
                '  __o += _ext.markdown(_output);\n' +
                '  _output = __o;\n' +
                '})();\n';
        },

        ends: true,

        blockLevel: false,

        ext: {
            name: 'markdown',
            obj: marked
        },

        safe: true
    };
}

/**
 * Wrap around marked.setOptions, adding the possiblity of overriding defaults if needed.
 * setOptions sets the options for *all* instances of marked at this package's level, sadly,
 * so you're basically changing your global markdown config each time.
 */
function configure(options) {
    marked.setOptions(options || {});

    return {
        useTag: function(swig, name) {
            var t = tag(marked);

            swig.setTag(name || 'marked', t.parse, t.compile, t.ends, t.blockLevel);
            swig.setExtension(t.ext.name, t.ext.obj);
        },

        useFilter: function(swig, name) {
            swig.setFilter(name || 'marked', this.filter);
        },

        get filter() {
            var filter = function(str) {
                return marked(str);
            };

            filter.safe = true;

            return filter;
        },

        get tag() {
            return tag(marked);
        }
    };
}

module.exports = configure();
module.exports.configure = configure;
