<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
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
import { Component, Prop } from "vue-property-decorator";
import { mixins } from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper.ts'

@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList
    }
  }
})
export default class Tags extends mixins(TagHelper) {
  //属性
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

  created() {
    this.$store.commit('fetchTags')
    // 页面创建时就获取tagList数据
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