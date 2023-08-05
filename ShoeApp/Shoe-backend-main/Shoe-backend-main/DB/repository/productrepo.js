const { fetchProduct, fetchProductByCategory } = require('../../controller/productctrl');
const ProductModel = require('../models/productmodel');


module.exports = {
    addProduct(productObj) {
        var promise = ProductModel.create(productObj);
        console.log(promise);
        return promise;
    },
    async fetchProducts() {
        const result = await ProductModel.find();
        if (result) {
            return result;
        }
        else {
            return null;
        }
    },
    async fetchProduct(productid) {
        console.log("idddd, " ,productid)
        const result = await ProductModel.find({ _id: productid });
        console.log("mai ", result);
        if (result) {
            return result;
        }
        else {
            return null;
        }
    },
    async fetchProductByCategory(category) {
        console.log("Category### ",category);
        const result = await ProductModel.find({ category : category });
        console.log("RESult###", result);
        if (result) {
            return result;
        }
        else {
            return null;
        }
    },
    async fetchProductByCategorylimit(category) {
        // console.log("Category###_______________________________________________________________________________- ",category);
        const result = await ProductModel.find({ category : category }).limit(3);
        console.log("RESult###", result);
        if (result) {
            return result;
        }
        else {
            return null;
        }
    },
    deleteProduct(productObj) {
        var promise = ProductModel.deleteOne({ _id: productObj._id });
        return promise;
    },
    async updateProduct(productObj) {
        const result = await ProductModel.updateOne({ _id: productObj._id }, productObj);
        if (result) {
            return result;
        }
        else {
            return null;
        }
    }
}