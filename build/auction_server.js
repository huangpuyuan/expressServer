"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Kaitai on 2017/4/20.
 */
var express = require("express");
var ws_1 = require("ws");
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
var Comment = (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var products = [
    new Product(1, '第一个商品', 1.99, 1.5, "这是一个商品，Angular组件学习之旅", ["电子产品", "硬件设施"]),
    new Product(2, "第二个商品", 2.99, 3.5, "这是二个商品，Angular组件学习之旅", ["图书"]),
    new Product(3, "第三个商品电子", 3.99, 2.5, "这是三个商品，Angular组件学习之旅", ["硬件设施"]),
    new Product(4, "第四个商品电子", 4.99, 4.5, "这是四个商品，Angular组件学习之旅", ["电子产品", "硬件设施"]),
    new Product(5, "第五个商品", 5.99, 3.5, "这是五个商品，Angular组件学习之旅", ["电子产品"]),
    new Product(6, "第六个商品", 6.99, 5, "这是六个商品，Angular组件学习之旅", ["图书"])
];
var comments = [
    new Comment(1, 1, "2017-4-17 14:52:42", "张三", 3, "东西不错"),
    new Comment(2, 1, "2017-4-14 11:52:42", "李四", 4, "好东西呀"),
    new Comment(3, 1, "2017-4-18 12:52:42", "王五", 2, "质量太差"),
    new Comment(4, 2, "2017-4-19 13:52:42", "赵六", 4, "东西不错")
];
app.get('/', function (req, res) {
    res.send("Hello Express");
});
app.get('/api/products', function (req, res) {
    var result = products;
    var params = req.query;
    if (params.title) {
        result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1; });
    }
    if (params.price && result.length > 0) {
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
    }
    if (params.category && (params.category !== "-1") && result.length > 0) {
        result = result.filter(function (p) { return p.categories.indexOf(params.category) !== -1; });
    }
    res.json(result);
});
app.get('/api/products/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
app.get('/api/products/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params.id; }));
    // res.json(products.find((product) => product.id == req.params.id));
});
var server = app.listen(8000, 'localhost', function () {
    console.log("服务器启动，地址是：http://localhost:8000");
});
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (websocket) {
    websocket.send("这个消息是服务器主动推送的");
    websocket.on("message", function (message) {
        console.log("接收到消息", message);
    });
});
//  定时推送模式
// setInterval(() => {
//     if (wsServer.clients) {
//         wsServer.clients.forEach( client =>{
//             client.send('这是每隔2s钟定时推送的');
//         })
//     }
// }, 2000);
