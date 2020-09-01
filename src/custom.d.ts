//全局的ts配置文件，在这里主要用来声明一些全局都可以使用的接口
// 定义一个接口,名称为Record,它规定了有哪些属性及属性的类型
type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date; //类是object的细分
  };