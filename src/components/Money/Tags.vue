<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        @click="toggle(tag)"
        :class="selectedTags.indexOf(tag) >= 0 ? 
        'select' : 'unselect' "
      >{{tag.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from '@/store/index2.ts';
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  //属性
  tagList = store.fetchTags();
  selectedTags: string[] = [];
  //方法
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }

    this.$emit('update:value', this.selectedTags)
    // 当选择标签时触发xxx事件，参数为当前的selectedTags数组
  }

  create() {
    const name = window.prompt("请输入标签名");
    
    if (name) {
      store.createTag(name)
    } else if (name === "") {
      alert('标签名不能为空')
      return
    } else {
      //当用户点击了取消
      return
    }

    /*
    if (name) {
      if (this.dataSource) {
        this.$emit('update:dataSource', [
          ...this.dataSource,name
          // 在总线上触发一个事件，事件名称为 update:dataSource，参数为新生成的dataSource数组
        ])
      }
    } else if (name === "") {
      alert('标签名不能为空')
      return
    } else {
      //当用户点击了取消
      return
    }
    */
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      height: 24px;
      line-height: 24px;
      // 当只有一行字时，行高与高一样高可以使文本垂直居中
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.select {
        background: darken($bg, 50%);
        color: $bg;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: #999;
      padding: 0 4px;
    }
  }
}
</style>