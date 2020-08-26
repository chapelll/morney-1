<template>
    <div class="nav-wrapper">
        <div class="content">
            <slot/>
        </div>
        <Nav></Nav>
    </div>
</template>

<script lang="ts">
    // 插槽 Layout 
    export default {
        name: 'Layout'
    }
</script>

<style lang="scss" scoped>
    .nav-wrapper {
        display: flex;
        flex-direction: column;
        border: 1px solid green;
        height: 100vh;
    }
    .content {
        overflow: auto;
        flex-grow: 1;
        border: 1px solid blue;
    }
</style>