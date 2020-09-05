<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack"></Icon>
      <span class="title">编辑标签</span>
      <div class="rightIcon"></div>
    </div>
    <div class="form-wrapper">
      <FormItem :value="currentTag.name" @update:value="update" fieldName="标签名" placeholder="请输入标签名"></FormItem>
    </div>

    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
import { Component, Prop } from "vue-property-decorator";

// import tagListModel from "@/models/tagListModel";

@Component({
  components: { FormItem, Button },
})
export default class EditLabel extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
    // 使用计算属性的get方法。 tag的值依赖于this.$store.state.currentTag
  }

  created() {
    const id = this.$route.params.id;
    // 通过url找到想要修改的那个标签的id
    this.$store.commit('fetchTags')
    //setCurrentTag方法默认tagList是存在的，但是当我直接刷新当前页面时tagList是不在的(本来应该由其他组件执行fetch函数获取tagList，但是直接刷新当前页面其他组件不会执行，所以增加一个fetch函数)
    this.$store.commit('setCurrentTag', id);
    if (!this.currentTag) {
      this.$router.replace("/404");
    }

    // //const tags = window.tagList;
    // // 取出存在localstorage中的标签数组，将其赋值给tags
    // this.tag = store.findTag(this.$route.params.id);
    // // 找到我们想要操作的那一个标签
    // // tags.filter这一句的意思是遍历整个tags数组，找出里面那一项id = 我们访问的字符串
    // // 的那一项，因为filter返回的是一个数组，所以需要加[0] (我们访问哪项就找哪项)
    // if (!this.tag) {
    //   this.$router.replace("/404");
    // }
  }

  update(name: string) {
    if (this.currentTag) {
      this.$store.commit("updateTag", { id: this.currentTag.id, name: name });
    }
  }

  remove() {
    if (this.currentTag) {
      this.$store.commit('removeTag', this.currentTag.id)
    }
  }

  goBack() {
    this.$router.back();
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