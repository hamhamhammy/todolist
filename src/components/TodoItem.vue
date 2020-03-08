<template>
  <div class="TODO-ITEM" title="Click to modify or delete">
    <div>
      <span class="AUTHOR">{{ item.author }}</span>
      <span class="DATE"> {{ displayDate }}</span>
    </div>
    <div class="CONTENT">{{ item.content }}</div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns';

export default {
  name: 'calendar',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    displayDate () {
      return format(parseISO(this.item.due_date), 'M/d/yyyy');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/styles/toolbox";

  .TODO-ITEM {
    @include padding(2);
    position: relative;
    color: $color-gray10;
    background-color: $color-gray60;
    border-radius: 4px;
    cursor: pointer;
  }

  .AUTHOR, .DATE {
    @include text-medium;
  }

  .CONTENT {
    @include h6;
    font-style: italic;
  }
</style>
