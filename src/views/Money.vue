<template>
  <Layout class-prefix="layout">
    <!-- {{recordList}} -->
    <Number-pad @update:value="onUpdateAmount" @submit="saveRecord"></Number-pad>

    <Types :value.sync="record.type"></Types>

    <div class="notes">
    <FormItem @update:value="onUpdateNotes" fieldName="备注" placeholder="在这里输入备注"></FormItem>
    </div>

    <Tags :data-source.sync="tags" @update:value="onUpdateTags"></Tags>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import store from '@/store/index2.ts';

@Component({
  components: { NumberPad, Types, FormItem, Tags },
})
export default class Money extends Vue {
  // 属性
  tags = store.tagList;
  recordList = store.recordList;
  // 定义一个recordList数组用来存放record (它的值要从localStorage取,默认值为空)
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  }; 
  // 定义了一个对象record，它的接口是Reord，因此它必须要有Record的属性且属性数据类型要一致


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
    store.createRecord(this.record)
  }
  // Watch  
  
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
</style>