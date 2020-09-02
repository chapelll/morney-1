// 将数据层面的操作进行封装(读取和写入)
const localStorageKeyName = 'tagList'

type Tag = {
    id: string;
    name: string;
}

type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicated'; // 返回值只能是 'success' 或者 'duplicated'(联合类型)
    save: () => void;
}

const tagListModel: TagListModel = {
    data: [],

    //获取数据函数
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')
        return this.data
    },
    //保存数据函数
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
    },
    //创建标签函数
    create(name: string) {
        const names = this.data.map(item =>item.name)
        // 收集this.data数组中的每一项的name组成一个新数组
        if (names.indexOf(name) >= 0) {
            return 'duplicated'
        }
        this.data.push({
            id: name,
            name: name
        })
        this.save()
        return 'success'
    }
}
export default tagListModel
