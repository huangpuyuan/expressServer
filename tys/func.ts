var myArray = [1, 2, 3, 4, 5, 6];
// myArray.desc = "six number";

// myArray.forEach(v =>console.log(v));

for (var n of myArray) {
    if (n > 2) break;
    console.log(n);
}

function getStock(name: string) {
    this.name = name;
    setInterval(() => {
        console.log("name is:" + this.name);
    }, 1000)
}

// var stock = new getStock("IBM");