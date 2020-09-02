<template>
    <Layout>
        编辑标签
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

@Component
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id
    tagListModel.fetch()
    const tags =  tagListModel.data
    // 取出存在localstorage中的标签数组，将其赋值给tags
    console.log(tags);
    
    const tag = tags.filter(t => t.id === id)[0]
    // 找到我们想要操作的那一个标签
    // tags.filter这一句的意思是遍历整个tags数组，找出里面那一项id = 我们访问的字符串
    // 的那一项，因为filter返回的是一个数组，所以需要加[0] (我们访问哪项就找哪项)
    if (tag) {
        console.log(tag);
    } else {
        this.$router.replace('/404')
    }
    
  }
}
</script>

<style lang="scss" scoped>

</style>