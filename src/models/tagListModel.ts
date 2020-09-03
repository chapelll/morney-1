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
    update: (id: string, name: string) => 'not found' | 'duplicated' | 'success';
    remove: (id: string) => boolean;
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
        const names = this.data.map(item => item.name)
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
    },
    //更新标签名函数
    update(id: string, name: string) {
        const idList = this.data.map(item => item.id)
        if (idList.indexOf(id) >= 0) {
            const names = this.data.map(item => item.name)
            if (names.indexOf(name) >= 0) {
                return 'duplicated'
            } else {
                const tag = this.data.filter(item => item.id === id)[0]
                tag.name = name
                this.save()
                return 'success'
            }
        } else {
            return 'not found'
        }
    },
    //删除标签函数
    remove(id: string) {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i
                break
            }
        } 
        console.log(index);
        this.data.splice(index,1)
        this.save()
        
        return true
    }

}
export default tagListModel
