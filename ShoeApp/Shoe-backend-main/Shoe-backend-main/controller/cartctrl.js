const repo = require("../DB/repository/cartrepo");
const jwt = require('jsonwebtoken');
const SECRET = 'MY_SECRET_KEY';
const productrepo = require('../DB/repository/productrepo');


module.exports = {
    async add(req, res) {
        // console.log("called cart add", req.body);
        // console.log(req.headers);
        var obj = req.body.data;
        var auth = null;
        const token = req.body.headers.Authorization.split(" ")[1];
        jwt.verify(token, SECRET, function (err, decoded) {
            if (decoded) {
                auth = decoded;
            }
            else if (err) {
                res.status(400).send({
                    message: "Invalid Token",
                    err,
                });
            }
        });
        var cartObject = {};
        cartObject.user = auth.userId;
        cartObject.product = obj.product._id;
        cartObject.quantity = obj.quantity;
        // console.log("cartobj;::::", cartObject);
        const result = await repo.getByProduct(cartObject);
        console.log("### " + result);
        if (result) {
            res.status(400).send({
                message: "Already in Cart"
            })
        }
        else {
            repo.add(cartObject).then(data => {
                res.status(200).send({
                    message: "Product added to cart Successfully",
                    data,
                });
            }).catch(err => {
                res.status(400).send({
                    message: "Some error occured",
                    err
                });
            })
        }
    },
    update(request, response) {
        var obj = request.body;
        var auth = null;
        const token = request.headers.authorization.split(" ")[1];
        jwt.verify(token, SECRET, function (err, decoded) {
            if (decoded) {
                auth = decoded;
            }
            else if (err) {
                response.status(400).send({
                    message: "Invalid Token",
                    err,
                });
            }
        });
        var cartObject = {};
        cartObject.user = auth.userId;
        cartObject.product = obj.product._id;
        cartObject.quantity = obj.quantity;
        repo.update(cartObject).then(data => {
            response.status(200).send({
                message: "Updated Successfully",
                data,
            });
        }).catch(err => {
            response.status(400).send({
                message: "Some error occured", err,
            })
        })
    },
    delete(request, response) {
        console.log("booo ", request.body.data.shoe._id);
        var obj = request.body.data.shoe;
        var auth = null;
        const token = request.body.headers.Authorization.split(" ")[1];
        jwt.verify(token, SECRET, function (err, decoded) {
            if (decoded) {
                auth = decoded;
            }
            else if (err) {
                response.status(400).send({
                    message: "Invalid Token",
                    err,
                });
            }
        });
        var cartObject = {};
        cartObject.user = auth.userId;
        cartObject.product = obj._id;
        repo.delete(cartObject).then(data => {
            response.status(200).send({
                message: "Deleted Successfully",
                data,
            });
        }).catch(err => {
            response.status(400).send({
                message: "Some error occured", err,
            })
        })
    },
    async fetch(request, response) {
        var auth = null;
        const token = request.headers.authorization.split(" ")[1];
        jwt.verify(token, SECRET, function (err, decoded) {
            if (decoded) {
                auth = decoded;
            }
            else if (err) {
                response.status(400).send({
                    message: "Invalid Token",
                    err,
                });
            }
        });
        let result = await repo.getByUser(auth.userId);
        let cart = [];
        for (let i = 0; i < result.length; i++) {
            await productrepo.fetchProduct(result[i].product)
                .then(data => {
                    let obj = {
                        _id : result[i].product,
                        product: data[0].name,
                        price: data[0].price,
                        quantity: result[i].quantity,
                        description: data[0].description,
                        image: data[0].image,
                        category: data[0].category,
                        seller: data[0].seller,
                        totalprice: data[0].price * result[i].quantity,
                    };
                    cart.push(obj);
                })
        }
        {
            if (result) {
                response.status(200).send({
                    message: "Users Data Found", cart
                })
            }
            else {
                response.status(400).send({
                    message: "error"
                })
            }
        }
    },
}