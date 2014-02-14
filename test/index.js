var assert = require('assert'),
    util = require('util'),
    Faker = require('Faker'),
    markedSwig = require('../index'),
    swig = require('swig');

suite('swig-marked', function() {

    test('marked tag', function() {
        var words = Faker.Lorem.sentence(),
            input = util.format('{% marked %}# %s{% endmarked %}', words),
            expected = util.format('<h1 id="%s">%s</h1>\n', words.replace(/\s/g, '-'), words);

        markedSwig.useTag(swig);
        assert.equal(swig.render(input), expected);
    });

    test('marked filter', function() {
        var words = Faker.Lorem.sentence(),
            input = '{{ words|marked }}',
            expected = util.format('<h1 id="%s">%s</h1>\n', words.replace(/\s/g, '-'), words);

        markedSwig.useFilter(swig);
        assert.equal(swig.render(input, {
            locals: {
                words: util.format('# %s', words)
            }
        }), expected);
    });

});
