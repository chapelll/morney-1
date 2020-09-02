// 将数据层面的操作进行封装(读取和写入)
const localStorageKeyName = 'tagList'

type TagListModel = {
    data: string[];
    fetch: () => string[];
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
    create(name) {
        if (this.data.indexOf(name) >= 0) {
            return 'duplicated'
        }
        this.data.push(name)
        this.save()
        return 'success'
    }
}
export default tagListModel
