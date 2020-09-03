<template>
        <button class="button">
            <slot/>
        </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  
}
</script>

<style lang="scss" scoped>
.button {
  border: none;
  background: #767676;
  color: white;
  height: 40px;
  border-radius: 4px;
  padding: 0 16px;
}
</style>