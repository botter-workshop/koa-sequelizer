var _ = require('lodash'),
    qs = require('./qs');

module.exports = filter;

function filter(model, query) {
    var keys = {},
        options = {};

    keys.model = _.keys(model.rawAttributes);
    keys.query = _.keys(query);
    keys.filters = _.intersection(keys.model, keys.query);

    options.attributes = qs.fields(query.fields);
    options.limit = qs.limit(query.limit) || 50;
    options.offset = qs.offset(query.offset);
    options.order = qs.sort(query.sort);
    options.where = qs.filters(_.pick(query, keys.filters));

    return _.omitBy(options, _.isNull);
}