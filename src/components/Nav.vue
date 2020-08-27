<template>
   <nav>
      <router-link to="/money" class="item">
        <Icon name="money"></Icon>
        记账
      </router-link>
      <router-link to="/labels" class="item">
        <Icon name="label"></Icon>
        标签
      </router-link>
      <router-link to="/statistics" class="item">
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
    nav {
        display: flex;
        box-shadow: 0 0 3px rgba(0,0,0,.25);
        > .item {
            padding: 2px 0;
            display: flex;
            flex-direction: column;
            width: 33.3333%;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            .icon {
                width: 32px;
                height: 32px;
            }
        }
    }

</style>