var _ = require('lodash'),
    filter = require('../tools/filter');

module.exports = init;

function init(model) {
    return function* (next) {
        yield next;
        
        var options = this.state.options || {};
        
        options = _.merge(options, filter(model, this.query));
        
        var result = yield model.findAndCountAll(options);
        
        var count = result.count,
            end = options.offset + options.limit,
            start = options.offset;
            
        if (end >= count) {
            end = count;
        } else {
            this.status = 206;
        }
        
        this.set('Content-Range', `${start}-${end}/${count}`);
        this.body = result.rows;
    }
}

