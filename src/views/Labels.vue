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
// import tagListModel from "@/models/tagListModel.ts";

@Component({
  components: {Button}
})
export default class Labels extends Vue {
  // 属性
  tags = window.tagList
  // 方法
  createTag() {
    // const name = window.prompt("请输入标签名");
    // if (name) {
    //   const message = tagListModel.create(name);
    //   if (message === "success") {
    //     alert("创建成功!");
    //   } else if (message === "duplicated") {
    //     alert("标签名不能重复!");
    //   }
    // } else if (name === "") {
    //   // 用户输入为空
    //   alert("标签名不能为空!");
    //   return;
    // } else {
    //   // 用户点击了取消
    //   return;
    // }

    const name = window.prompt("请输入标签名");
    if (name) {
      window.createTag(name)
    } else if (name === "") {
      alert("标签名不能为空!");
      return
    } else {
      //用户点击了取消
      return
    }
  }
  onClick(event: MouseEvent) {
    const xxx = event.target as HTMLElement
    console.log(xxx.textContent);
    this.$router.replace(`/labels/edit/${xxx.textContent}`)
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