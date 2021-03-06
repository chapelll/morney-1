//全局的ts配置文件，在这里主要用来声明一些全局都可以使用的接口
// 定义一个接口,名称为Record,它规定了有哪些属性及属性的类型
type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: string; //类是object的细分
  };

type Tag = {
    id: string;
    name: string;
}

type RootState = {
    recordList: RecordItem[];
    createRecordError: Error | null;
    tagList: Tag[];
    currentTag?: Tag;
}

type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicated'; // 返回值只能是 'success' 或者 'duplicated'(联合类型)
    save: () => void;
    update: (id: string, name: string) => 'not found' | 'duplicated' | 'success';
    remove: (id: string) => boolean;
}

// interface Window {
  
// }