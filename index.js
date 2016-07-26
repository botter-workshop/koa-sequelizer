module.exports = initialize;

function initialize(model) {
    return {
        create: require('./generators/create')(model),
        get: require('./generators/get')(model),
        query: require('./generators/query')(model),
        remove: require('./generators/remove')(model),
        update: require('./generators/update')(model)
    };
}