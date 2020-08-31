<template>
  <div>
    <ul class="types">
      <li :class="type === '-' ? 'selected' : ''" @click="selectType('-')">支出</li>
      <li :class="type === '+' ? 'selected' : ''" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  // 属性
  type = '-';
  // 方法
  selectType(type: string) {
    this.type = type;
  }
}

</script>

<style lang="scss" scoped>

.types {
        display: flex;
        background: #c4c4c4;
        font-size: 24px;
        text-align: center;
        > li {
            display: flex;
            height: 64px;
            width: 50%;;
            justify-content: center;
            align-items: center;
            position: relative;
            &.selected::after {
                // &代表 li 自己 综合起来的意思就是:拥有 selected 属性的 li
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 4px;
                background: #333;
            }
        }
    }
</style>