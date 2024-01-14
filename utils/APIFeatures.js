// Blueprint definition
class APIFeatures {

    constructor(queryObj, query) {
        this.queryObj = queryObj;
        this.query = query;
    }


    filter() {
        // Filtering (Remove custom operations from queryString)
        let tempQuery = {...this.queryObj};
        const customOperations = ['sort', 'fields', 'page', 'limit'];
        customOperations.forEach( operation => delete tempQuery[operation] );

        // Convert MongoDb operators to thier working form, like converting lt to $lt etc.
        tempQuery = JSON.parse( JSON.stringify(tempQuery).replace(/\b(lt|lte|gt|gte)\b/g, match => `$${match}`) );
        this.query = this.query.find(tempQuery);
        return this;
    }



    sort() {
        // Sorting
        const sortBy = this.queryObj.sort ? this.queryObj.sort.split(',').join(' ') : '-createdAt';
        this.query = this.query.sort(sortBy);
        return this;
    }



    project() {
        // Projection
        const selectBy = this.queryObj.fields ? this.queryObj.fields.split(',').join(' ') : '-__v';
        this.query = this.query.select(selectBy);
        return this;
    }



    paginate() {
        // Pagination
        const page = this.queryObj.page * 1 || 1;
        const limit = this.queryObj.limit * 1 || 10;
        const skipBy = limit * (page-1);

        this.query = this.query.skip(skipBy).limit(limit);
        return this;
    }
}



// Exports Utility to handle custom operations in Url Query String
module.exports = APIFeatures;