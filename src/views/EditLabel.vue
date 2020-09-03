<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left"></Icon>
      <span class="title">编辑标签</span>
      <div class="rightIcon"></div>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" fieldName="标签名" placeholder="请输入标签名"></FormItem>
    </div>

    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
import { Component, Prop } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";

@Component({
  components: { FormItem, Button },
})
export default class EditLabel extends Vue {
  tag?: { id: string; name: string } = undefined;

  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    // 取出存在localstorage中的标签数组，将其赋值给tags
    const tag = tags.filter((t) => t.id === id)[0];
    // 找到我们想要操作的那一个标签
    // tags.filter这一句的意思是遍历整个tags数组，找出里面那一项id = 我们访问的字符串
    // 的那一项，因为filter返回的是一个数组，所以需要加[0] (我们访问哪项就找哪项)
    if (tag) {
      this.tag = tag
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  .title {
  }
  .leftIcon {
    width: 24px;
    height: 24px;
  }
  .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  display: flex;
  justify-content: center;
  padding: 16px;
  margin-top: 28px;
}
</style>