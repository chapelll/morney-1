<template>
  <Layout>
    <div class="tags">
      <router-link :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id" class="tag" >
        <span>{{tag.name}}</span>
        <Icon name="right"></Icon>
      </router-link>
    </div>

    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
      <!-- 组件一般是不会绑定事件的，用户点击大Button时它就不会触发点击事件
           .native修饰符的作用是监听这个组件的根元素的原生事件，一旦根元素触发了事件，
           这个大的组件也会收到相应的事件触发 -->
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Button from '@/components/Button.vue';
import { Component } from "vue-property-decorator";
import { mixins } from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper.ts'

@Component({
  components: {Button},
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList
  }
  // 方法
  beforeCreate() {
    this.$store.commit('fetchTags')
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      color: #666;
      margin-right: 16px;
      height: 18px;
      width: 18px;
    }
  }
}

.createTag {
  border: none;
  background: #767676;
  color: white;
  height: 40px;
  border-radius: 4px;
  padding: 0 16px;
  &-wrapper {
    // createTag 的父亲
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
}
</style>