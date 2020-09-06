<template>
  <Layout>
    <Types class-prefix="zzz" :value.sync="type"></Types>Statistics
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "@/components/Money/Types.vue";
import { Component } from "vue-property-decorator";

@Component({
  components: { Types },
})
export default class Statistics extends Vue {
  // 属性
  type = "-";
}
</script>

<style lang="scss" scoped>
::v-deep .zzz-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>