<template>
  <div class="tags">
    <div class="new">
      <button>新增标签</button>
    </div>
    <ul class="current">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "Tags",
};
</script>

<style lang="scss" scoped>
.tags {
        display: flex;
        flex-direction: column-reverse;
        flex-grow: 1;
        font-size: 14px;
        padding: 16px;
        > .current {
            display: flex;
            flex-wrap: wrap;
            > li {
                background: #d9d9d9;
                height: 24px;
                line-height: 24px;
                // 当只有一行字时，行高与高一样高可以使文本垂直居中
                border-radius: 12px;
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 4px;
            }
        }
        > .new {
            padding-top: 16px;
            button {
                background: transparent;
                border: none;
                border-bottom: 1px solid;
                color: #999;
                padding: 0 4px;
            }
        }
    }

</style>