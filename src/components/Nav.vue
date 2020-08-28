<template>
   <nav>
      <router-link to="/money" class="item" active-class="selected">
        <Icon name="money"></Icon>
        记账
      </router-link>
      <router-link to="/labels" class="item" active-class="selected">
        <Icon name="label"></Icon>
        标签
      </router-link>
      <router-link to="/statistics" class="item" active-class="selected">
        <Icon name="statistics"></Icon>
        统计
      </router-link>
    </nav>
</template>

<script lang="ts">
    export default {
        name: 'Nav'
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

    nav {
        display: flex;
        box-shadow: 0 0 3px rgba(0,0,0,.25);
        > .item {
            display: flex;
            flex-direction: column;
            padding: 2px 0;
            width: 33.3333%;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            .icon {
                width: 32px;
                height: 32px;
            }
        }
        > .item.selected {
            color: $color-highlight;
        }
    }

</style>