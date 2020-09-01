<template>
  <Layout class-prefix="layout">
    {{record}}
    <number-pad @update:value="onUpdateAmount" @submit="saveRecord"></number-pad>

    <types :value.sync="record.type"></types>

    <notes @update:value="onUpdateNotes"></notes>

    <tags :data-source.sync="tags" @update:value="onUpdateTags"></tags>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";

// 定义一个接口,名称为Record,它规定了有哪些属性及属性的类型
type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
};

@Component({
  components: { NumberPad, Types, Notes, Tags },
})
export default class Money extends Vue {
  // 属性
  tags = ["衣", "食", "住", "行", "玩"];
  record: Record = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  }; 
  // 定义了一个对象record，它的接口是Reord，因此它必须要有Record的属性且属性数据类型要一致

  recordList: Record[] = [];
  // 定义一个recordList数组用来存放 record

  // 方法
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }         

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    // 每次调用saveRecord函数时都创建一个新的对象record2，record2的属性与record相同，将它存放进recordList
    const record2 = JSON.parse(JSON.stringify(this.record))
    this.recordList.push(record2)
    // push的是record这个对象的地址，所以recordList存放的都是一样的数据
    console.log(this.recordList);
  }
  // Watch  
  @Watch('recordList')
  OnRecordListChange() {
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
</style>