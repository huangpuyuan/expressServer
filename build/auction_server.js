"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Kaitai on 2017/4/20.
 */
var express = require("express");
var app = express();
var Product = (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var products = [
    new Product(1, '第一个商品', 1.99, 1.5, "这是一个商品，Angular组件学习之旅", ["电子产品", "硬件设施"]),
    new Product(2, "第二个商品", 2.99, 3.5, "这是二个商品，Angular组件学习之旅", ["图书"]),
    new Product(3, "第三个商品电子", 3.99, 2.5, "这是三个商品，Angular组件学习之旅", ["硬件设施"]),
    new Product(4, "第四个商品电子", 4.99, 4.5, "这是四个商品，Angular组件学习之旅", ["电子产品", "硬件设施"]),
    new Product(5, "第五个商品", 5.99, 3.5, "这是五个商品，Angular组件学习之旅", ["电子产品"]),
    new Product(6, "第六个商品", 6.99, 5, "这是六个商品，Angular组件学习之旅", ["图书"])
];
app.get('/', function (req, res) {
    res.send("Hello Express");
});
app.get('/api/products', function (req, res) {
    res.json(products);
});
app.get('/api/products/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
var server = app.listen(8000, 'localhost', function () {
    console.log("服务器启动，地址是：http://localhost:8000");
});
