import tagListStore from '@/store/tagStore.ts'
import recordStore from '@/store/recordStore.ts'

const store = {
    ...recordStore,
    ...tagListStore
}

export default store;
