/**
 * Created by Kaitai on 2017/4/20.
 */
import * as express from 'express';

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
const products: Product[] = [
    new Product(1, '第一个商品', 1.99, 1.5, "这是一个商品，Angular组件学习之旅", ["电子产品", "硬件设施"]),
    new Product(2, "第二个商品", 2.99, 3.5, "这是二个商品，Angular组件学习之旅", ["图书"]),
    new Product(3, "第三个商品电子", 3.99, 2.5, "这是三个商品，Angular组件学习之旅", ["硬件设施"]),
    new Product(4, "第四个商品电子", 4.99, 4.5, "这是四个商品，Angular组件学习之旅", ["电子产品", "硬件设施"]),
    new Product(5, "第五个商品", 5.99, 3.5, "这是五个商品，Angular组件学习之旅", ["电子产品"]),
    new Product(6, "第六个商品", 6.99, 5, "这是六个商品，Angular组件学习之旅", ["图书"])
];

app.get('/', (req, res) => {
    res.send("Hello Express");
});

app.get('/api/products', (req, res) => {
    res.json(products);
});
app.get('/api/products/:id',(req,res)=>{
    res.json(products.find((product)=>product.id == req.params.id));
});
const server = app.listen(8000,'localhost',()=>{
    console.log("服务器启动，地址是：http://localhost:8000");
});