<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"></Tabs>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"></Tabs>
      <ol>
        <li v-for="(group,index) in result" :key="index">
            <h3 class="title">{{group.title}}</h3>
            <ol>
                <li v-for="item in group.items" :key="item.id" class="record">
                  <span>{{tagString(item.tags)}}</span> 
                  <span class="sta-notes">{{item.notes}}</span> 
                  <span>￥{{item.amount}}</span>
                </li>
            </ol>
        </li>
      </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  // 计算属性
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    const recordList = this.recordList;

    type HashTableValue = {
        title: string;
        items: RecordItem[];
    }

    const hashTable: {[key: string]: HashTableValue} = {}
    for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createdAt!.split('T')
        hashTable[date] = hashTable[date] || {title: date, items: []}
        // 如果该date这个键在哈希表还没有，就创建一个空的
        hashTable[date].items.push(recordList[i])
    }
    // v-for 遍历哈希表时，只会遍历hash的value
    return hashTable;
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',')
  }

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style scoped lang="scss">
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  min-height: 40px;
}
.record {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  min-height: 40px;
  padding: 0 16px;
}
.sta-notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999
}
</style>