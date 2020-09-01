<template>
  <Layout class-prefix="layout">
    {{record}}
    <number-pad @update:value="onUpdateAmount"></number-pad>

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
import { Component } from "vue-property-decorator";

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
  }; // 定义了一个对象record，它的接口是Reord，因此它必须要有Record的属性且属性数据类型要一致
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