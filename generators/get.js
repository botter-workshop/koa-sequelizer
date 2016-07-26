module.exports = init;

function init(model) {
    return function* (next) {
        yield next;
        
        var options = this.state.options || {},
            primaryKey = model.primaryKeyAttribute;
            
        options[primaryKey] = this.request.params[primaryKey];
        
        var result = yield model.findOne(options);

        if (!result) {
            this.throw(404);
        }
        
        this.body = result;
    }
}