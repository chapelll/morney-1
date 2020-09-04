import clone from '@/lib/clone.ts'
console.log('fuck');

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
    //创建数据函数
    create(record: RecordItem) {
        // 每次调用saveRecord函数时都创建一个新的对象record2，record2的属性与record相同，将它存放进recordList
        const record2: RecordItem = clone(record)
        record2.createdAt = new Date()  
        this.data.push(record2)
        // push的是record这个对象的地址，所以recordList存放的都是一样的数据
    }
}
export default recordListModel
