<template>
    <Layout class-prefix="layout"> 

        <number-pad></number-pad>

        <types></types>

        <notes></notes>

        <tags :data-source.sync="tags"></tags>

    </Layout>
</template>

<script lang="js">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';

    export default {
        name: 'Money',
        components: {
            NumberPad,
            Types,
            Notes,
            Tags
        },
        data()   {
            return {
                tags: ["衣","食","住","行","玩"]
            }
        }
    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

</style>