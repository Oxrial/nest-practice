/* eslint-disable @typescript-eslint/no-unused-vars */
class A {
    name: string
    // 当无需传参时一下BC类所new出的实例也不需要参数的传递
    // constructor() {
    //     this.name = 'static'
    // }

    constructor(name: string) {
        this.name = name
    }
}

// 强耦合 当A类必须依赖参数实例化时，强耦合的BC的new A实例都必须同时更改传参
class B {
    b: string
    constructor() {
        // A类无需传参时，正常
        // this.b = new A().name
        // 当A类必须依赖参数实例化时
        // this.b = new A().name //Expected 1 arguments, but got 0.
    }
}
class C {
    c: string
    constructor() {
        // A类无需传参时，正常
        // this.c = new A().name
        // 当A类必须依赖参数实例化时
        // this.c = new A().name //Expected 1 arguments, but got 0.
    }
}
// -----------------------IOC-------------------------- //
// 容器
type Module = any // 类的实例化的实例
interface ModuleObj {
    [key: string]: Module
}
class Container {
    module: ModuleObj
    constructor() {
        this.module = {}
    }
    provide(key: string, module: Module) {
        this.module[key] = module
    }
    get(key: string) {
        return this.module[key]
    }
}
// 声明要使用的类
class D {
    name: string
    constructor(name: string) {
        this.name = name
    }
}
class E {
    name: string
    constructor(name: string) {
        this.name = name
    }
}

// 将类托管注入到容器
const container = new Container()
container.provide('_D', new D('I AM D'))
container.provide('_E', new D('I AM E'))

// F使用的D和E已经逻辑解耦，不会影响
class F {
    name1: Module
    name2: Module
    constructor(container: Container) {
        this.name1 = container.get('_D')
        this.name2 = container.get('_E')
    }
}
