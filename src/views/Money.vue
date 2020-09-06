<template>
  <Layout class-prefix="layout">
    <!-- {{recordList}} -->
    <Number-pad @update:value="onUpdateAmount" @submit="saveRecord"></Number-pad>

    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"></Tabs>

    <div class="notes">
    <FormItem @update:value="onUpdateNotes" fieldName="备注" placeholder="在这里输入备注"></FormItem>
    </div>

    <Tags></Tags>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import { Component } from "vue-property-decorator";
import recordTypeList from '@/constants/recordTypeList';


@Component({
  components: { NumberPad, Tabs, FormItem, Tags },
})
export default class Money extends Vue {
  get recordList() {
      return this.$store.state.recordList;
      // recordList映射的是vuex中的recordList映射的是vuex中的
  }

  recordTypeList = recordTypeList

  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  }; 
  // 定义了一个对象record，它的接口是Reord，因此它必须要有Record的属性且属性数据类型要一致

  created() {
    // 页面创建时获得数据
    this.$store.commit('fetchRecords')
  }

  // 方法
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record)
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