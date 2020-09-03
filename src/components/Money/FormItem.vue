<template>
  <div>
    <label class="formItem">
      <span class="name">{{fieldName}}</span>
      <input type="text" :placeholder="placeholder" v-model="value"/>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  //属性
  value = ''
  //prop属性
  @Prop({required: true}) fieldName!: string 
  @Prop() placeholder?: string 
  // watch 
  // 当 value 的值发生改变时就触发onValueChanged函数，第一个参数是value改变后的值，第二个参数是value改变前的值
  @Watch('value') 
  onValueChanged(value: string, oldValue: string) {
    this.$emit('update:value', value)
  }
  //方法
}
</script>

<style lang="scss" scoped>

.formItem {
        font-size: 14px;
        padding-left: 16px;
        display: flex;
        align-items: center;
        > .name {
            padding-right: 16px;
        }
        > input {
            height: 40px;
            flex-grow: 1;
            background: transparent;
            border: none;
            padding-right: 16px;
        }
    }
</style>