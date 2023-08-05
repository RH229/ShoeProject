const repo = require('../DB/repository/orderrepo');
const jwt = require('jsonwebtoken');
const SECRET = 'MY_SECRET_KEY';
const productrepo = require('../DB/repository/productrepo');
const cartrepo = require('../DB/repository/cartrepo');


module.exports = {

    async addOrder(req, res) {
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
        cartrepo.deleteByUser(auth.userId);
        flag = true;
        // error;
        console.log("message",req.body.obj, auth);
        for (let i = 0; i < req.body.obj.cart.cart.length; i++) {
            let obj = req.body.obj.cart.cart[i];
            obj.user = auth.userId;
            obj.address = req.body.obj.address.add;
            obj.phoneno = req.body.obj.phoneno.phn;
            repo.addOrder(obj)
        }
        if (flag) {
            res.status(200).send({
                message: "Order Placed Successfully",
                
            });
        }
        else {
            res.status(400).send({
                message: "some error occured",
                
            });
        }
    },
    async fetchOrders(req, res) {
        var auth = null;
        const token = req.headers.authorization.split(" ")[1];
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
        const result = await repo.fetchOrders(auth.userId);
        let order = [];
        for (let i = 0; i < result.length; i++) {
            await productrepo.fetchProduct(result[i].orderItems.product)
                .then(data => {
                    let obj = {
                        name : auth.name,
                        address: result[i].orderItems.address,
                        quantity: result[i].orderItems.quantity,
                        price: result[i].orderItems.price,
                        time: result[i].orderItems.timestamp,
                        product: data[0].name,
                        image: data[0].image,
                        category: data[0].category,
                        seller: data[0].seller,
                    }
                    order.push(obj);
                })
        }
        if (result) {
            res.status(200).send({
                message: "Orders Fetched Successfully",
                order,
            });
        }
        else {
            res.status(400).send({
                message: "No Orders Found",
            });
        }
    }
}