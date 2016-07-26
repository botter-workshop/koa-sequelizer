module.exports = init;

function init(model) {
    return function* (next) {
        yield next;
        
        var options = this.state.options || {},
            primaryKey = model.primaryKeyAttribute;
            
        options.where = options.where || {};
        options.where[primaryKey] = this.params[primaryKey];
        
        var result = yield model.findOne(options);
        
        if (!result) {
            this.throw(404);
        }
        
        this.body = yield result.updateAttributes(this.request.body);
    }
}