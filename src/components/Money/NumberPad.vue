<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  //属性
  output = "0";
  //方法
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    // 指定event.target为按钮类型(按钮是一定有内容的，所以输出按钮.textContent不会再报错)
    const input = button.textContent!;
    // input为每次点击按钮的输入数字

    if (this.output.length === 16) {
      // 最多显示16个字符
      return;
    }

    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        // input 在字符串 '0123456789' 中的索引大于等于0， 相当于 input 就是 '0123456789' 中的一个
        this.output = input;
        return;
      }
    }

    if (this.output.indexOf(".") >= 0) {
      // 字符串 "." 在output中存在
      if (input === ".") {
        return;
      }
    }

    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = "0";
  }

  ok() {
    this.$emit('update:value', this.output)
    this.$emit('submit', this.output)
    this.output = '0'
    // 每次点击 ok 后，将output至为0
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
  }

  .buttons {
    @extend %clearFix;
    // 将选择器 .buttons 移动到 clearFix 那里
    button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      // 基础背景色
      $bg: #c7e6f3;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
        // 比背景色 $bg 暗4%
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
      &.ok {
        float: right;
        height: 64 * 2px;
      }
      &.zero {
        width: 50%;
      }
    }
  }
}
</style>