module.exports = init;

function init(model) {
    return function* (next) {
        yield next;
        
        var result = yield model.create(this.request.body);
        
        if (result) {
            this.status = 201;
        }
        
        this.body = yield result.updateAttributes(this.request.body);
    }
}