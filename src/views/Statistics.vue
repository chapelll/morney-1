<template>
    <div class="nav-wrapper">
        <div class="content">
            <div>Statistics</div>

        </div>
        <Nav></Nav>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Statistics',
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