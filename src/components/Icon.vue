<template>
    <svg class="icon">
        <use :xlink:href="'#' + name"/>
    </svg>
</template>

<script lang="ts">
// 将一个目录里面的后缀为.svg的文件进行批量引入
const importALL = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {
    importALL(require.context('../assets/icons', true, /\.svg$/));
} catch (error) {
    console.log(error);
}

    export default {
        name: 'Icon',
        props: ['name']
    }
</script>

<style lang="scss" scoped>
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>