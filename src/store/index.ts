import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone.ts'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { //data
    recordList: [] as RecordItem[]
    // 将recordList存储在vuex的state中(方便进行全局管理)
  },
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
  }
})


export default store