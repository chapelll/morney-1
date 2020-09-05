import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone.ts'
import createId from '@/lib/createId'
import router from '../router'

Vue.use(Vuex)

type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}

const store = new Vuex.Store({
  state: {
    currentTag: undefined,
    // 当前想要修改的tag标签
    recordList: [],
    // 将recordList存储在vuex的state中(方便进行全局管理)
    tagList: []
    // 将tagList存储在vuex的state中(方便进行全局管理)
  } as RootState,
  mutations: { //methods

    // 获取记录列表数据
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      // state中的recordList需要从localStorage中取出
    },
    // 创建新的记录
    createRecord(state, record) {
      const record2: RecordItem = clone(record)
      record2.createdAt = new Date()
      state.recordList.push(record2)
      store.commit('saveRecords')
      // 将新的记录经过深拷贝，添加到state.recordList中去，接着就调用saveRecords函数把recordList进行存储
    },
    // 存储记录列表
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
      // 将recordList存放在localStorage中去
    },


    // 获取标签数据
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      // state中的tagList需要从localStorage中取出
    },
    // 创建新的标签
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name)
      // 找出tagList所有item的name新生成数组names
      if (names.indexOf(name) >= 0) {
        window.alert('标签名不能重复!')
      }
      const id = createId().toString() //获取新id
      state.tagList.push({ id, name: name })
      store.commit('saveTags')
      window.alert('添加成功')
    },
    // 保存标签列表
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },

    // 获取想要修改的那个标签
    setCurrentTag(state, id) {
      const tag = state.tagList.filter(item => item.id === id)[0]
      // 获取id对应的那个tag，将其赋给currentTag
      state.currentTag = tag
    },

    // 在EditLabel页面更改当前标签的name
    updateTag(state, payload: { id: string; name: string }) {
      const id = payload.id
      const name = payload.name
      const idList = state.tagList.map(item => item.id)
      if (idList.indexOf(id) >= 0) {
        // 判断id存在于idList
        const names = state.tagList.map(item => item.name)
        if (names.indexOf(name) >= 0) {
          // 判断新的标签名是否在names已经存在
          window.alert('标签名重复')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0]
          // 找到进行修改的那个标签
          tag.name = name
          store.commit('saveTags')
          // 修改后对tagList进行保存
        }
      }
    },

    // 在在EditLabel页面删除当前标签
    removeTag(state, id: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i
          break
          // 找到当前标签在tagList中的索引值
        }
      }
      if (index >= 0) {
        // 如果当前标签在tagList中存在
        state.tagList.splice(index, 1)
        store.commit('saveTags')
        router.back()
      } else {
        window.alert('删除失败')
      }
      
    }
  }
})


export default store