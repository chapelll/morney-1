<template>
    <div class="nav-wrapper">
        <div class="content" :class="classPrefix && `${classPrefix}-content`">
            <slot/>
        </div>
        <Nav></Nav>
    </div>
</template>

<script lang="ts">
    // 插槽 Layout 
    export default {
        name: 'Layout',
        props: ['classPrefix']
    }
</script>

<style lang="scss" scoped>
    .nav-wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content {
        overflow: auto;
        flex-grow: 1;
    }
</style>