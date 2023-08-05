const repo = require('../DB/repository/productrepo');

module.exports = {
    addProduct(req, res) {
        let productObj = req.body;
        repo.addProduct(productObj)
            .then((data) => {
                res.status(200).send({
                    message: "Product Added Successfully",
                    data,
                });
            })
            .catch((error) => {
                res.status(400).send({
                    message: "Error adding product",
                    error,
                });
            })
    },
    async fetchProducts(req, res) {
        console.log("called");
        const result = await repo.fetchProducts();
        console.log(result);
        if (result) {
            res.status(200).send({
                message: "Products Fetched Successfully",
                result,
            });
        }
        else {
            res.status(400).send({
                message: "No Product Found",
            });
        }
    },
    async fetchProduct(req, res) {
        console.log("let me see",req.body.product);
        const result = await repo.fetchProduct(req.body.product)
        
        if (result) {
            res.status(200).send({
                message: "Product Fetched Successfully",
                result,
            });
        }
        else {
            res.status(400).send({
                message: "No Product Found",
            });
        }
    },
    async fetchProductByCategory(req, res) {
        const result = await repo.fetchProductByCategory(req.body.cat)
        if (result) {
            res.status(200).send({
                message: "Products Fetched Successfully",
                result,
            });
        }
        else {
            res.status(400).send({
                message: "No Product Found",
            });
        }
    },
    deleteProduct(req, res) {
        let productObj = req.body;
        repo.deleteProduct(productObj)
            .then((data) => {
                res.status(200).send({
                    message: "Product Deleted Successfully",
                    data,
                });
            })
            .catch((error) => {
                res.status(400).send({
                    message: "Error deleting product",
                    error,
                });
            })
    },
    async updateProduct(req, res) {
        let productObj = req.body;
        const result = await repo.updateProduct(productObj);
        if (result) {
            res.status(200).send({
                message: "Product Updated Successfully",
                result,
            });
        }
        else {
            res.status(400).send({
                message: "Error updating product",
            });
        }
    },
     async fetchProductByCategorylimit(req, res) {
        // console.log("let me see^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",req.body.cat);
        const result = await repo.fetchProductByCategorylimit(req.body.cat)
        if (result) {
            res.status(200).send({
                message: "Products Fetched Successfully",
                result,
            });
        }
        else {
            res.status(400).send({
                message: "No Product Found",
            });
        }
    },

}