/**
 * Created by Kaitai on 2017/4/20.
 */
import * as express from 'express';
import {Server} from 'ws';

const app = express();

export class Product {
    constructor(public id: number,
                public title: string,
                public price: number,
                public rating: number,
                public desc: string,
                public categories: Array<string>) {

    }
}
export class Comment {
    constructor(public id: number,
                public productId: number,
                public timestamp: string,
                public user: string,
                public rating: number,
                public content: string) {

    }
}
const products: Product[] = [
    new Product(1, '第一个商品', 1.99, 1.5, "这是一个商品，Angular组件学习之旅", ["电子产品", "硬件设施"]),
    new Product(2, "第二个商品", 2.99, 3.5, "这是二个商品，Angular组件学习之旅", ["图书"]),
    new Product(3, "第三个商品电子", 3.99, 2.5, "这是三个商品，Angular组件学习之旅", ["硬件设施"]),
    new Product(4, "第四个商品电子", 4.99, 4.5, "这是四个商品，Angular组件学习之旅", ["电子产品", "硬件设施"]),
    new Product(5, "第五个商品", 5.99, 3.5, "这是五个商品，Angular组件学习之旅", ["电子产品"]),
    new Product(6, "第六个商品", 6.99, 5, "这是六个商品，Angular组件学习之旅", ["图书"])
];

const comments: Comment[] = [
    new Comment(1, 1, "2017-4-17 14:52:42", "张三", 3, "东西不错"),
    new Comment(2, 1, "2017-4-14 11:52:42", "李四", 4, "好东西呀"),
    new Comment(3, 1, "2017-4-18 12:52:42", "王五", 2, "质量太差"),
    new Comment(4, 2, "2017-4-19 13:52:42", "赵六", 4, "东西不错")
]
app.get('/', (req, res) => {
    res.send("Hello Express");
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    res.json(products.find((product) => product.id == req.params.id));
});

app.get('/api/products/:id/comments', (req, res) => {
    res.json(comments.filter((comment: Comment) => comment.productId == req.params.id));
    // res.json(products.find((product) => product.id == req.params.id));
});

const server = app.listen(8000, 'localhost', () => {
    console.log("服务器启动，地址是：http://localhost:8000");
});

const wsServer = new Server({port: 8085});
wsServer.on("connection", websocket => {
    websocket.send("这个消息是服务器主动推送的");
    websocket.on("message", message => {
        console.log("接收到消息", message);
    });
})

//  定时推送模式
// setInterval(() => {
//     if (wsServer.clients) {
//         wsServer.clients.forEach( client =>{
//             client.send('这是每隔2s钟定时推送的');
//         })
//     }
// }, 2000);
