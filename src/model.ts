// 将数据层面的操作进行封装(读取和写入)
const localStorageKeyName = 'recordList'
const model = {
    //获取数据函数
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[]
    },
    //保存数据函数
    save(data: RecordItem[]) {
        window.localStorage.setItem('recordList', JSON.stringify(data))
    },
    //深拷贝函数
    clone(data: RecordItem | RecordItem[]) {
        return JSON.parse(JSON.stringify(data)) 
    }
}
export default model
