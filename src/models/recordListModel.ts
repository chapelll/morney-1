// 将数据层面的操作进行封装(读取和写入)
const localStorageKeyName = 'recordList'
const recordListModel = {

    data: [] as RecordItem[],

    //获取数据函数
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[]
        return this.data
    },
    //保存数据函数
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
    },
    //深拷贝函数
    clone(data: RecordItem | RecordItem[]) {
        return JSON.parse(JSON.stringify(data)) 
    }
}
export default recordListModel
