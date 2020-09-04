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
import { Component, Watch } from "vue-property-decorator";
import recordListModel from '@/models/recordListModel.ts'
import tagListModel from '@/models/tagListModel.ts'

const recordList = recordListModel.fetch()

@Component({
  components: { NumberPad, Types, FormItem, Tags },
})
export default class Money extends Vue {
  // 属性
  tags = window.tagList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  }; 
  // 定义了一个对象record，它的接口是Reord，因此它必须要有Record的属性且属性数据类型要一致

  recordList: RecordItem[] = recordListModel.fetch();
  // 定义一个recordList数组用来存放record (它的值要从localStorage取,默认值为空)

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
    recordListModel.create(this.record)
  }
  // Watch  
  @Watch('recordList')
  OnRecordListChange() {
    // 当我在money页面提交新的record数据时，会调用Model的create函数，create函数就会把新的record放到data(也就是recordList)中去。当data的值改变了，就会执行OnRecordListChange函数
    console.log('我执行了');
    
    recordListModel.save()
  }
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