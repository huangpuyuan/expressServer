class Person {
    constructor(public name: string) {
          console.log("haha");
    }

    eat() {
        console.log("i am eating");
    }
}

class Exployee extends Person {
    constructor(name: string, code: string) {
        super(name);
        this.code = code;
        console.log("xixi");
    }

    code: string;

    work() {
        super.eat();
        this.doWork();
    }
    private doWork(){
        console.log("i am working")
    }
}

// var p1 = new Person('batman');
// p1.eat();

var p2 = new Exployee('superman','1');
//p2.eat();
p2.work();