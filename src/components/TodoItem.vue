<template>
  <div class="TODO-ITEM">
    <div>
      <span class="AUTHOR">{{ item.author }}</span> -
      <span class="DATE">{{ item.due_date }}</span>
    </div>
    <div class="CONTENT">{{ item.content }}</div>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/styles/toolbox";

  .TODO-ITEM {
    @include padding(2);
    position: relative;
    width: 100%;
    color: $color-gray10;
    background-color: $color-gray50;
    border-radius: 4px;
  }
</style>
