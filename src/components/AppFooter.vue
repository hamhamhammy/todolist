<template>
  <div class="FOOTER">
    <div class="CONTAINER">
      Hamzeh Doostie &copy; TodoList {{ (new Date()).getFullYear() }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-footer',
};
</script>

<style lang="scss" scoped>
  @import "~@/styles/toolbox";

  .FOOTER {
    flex: 0 0 auto;
  }

  .CONTAINER {
    @include container;
    @include padding-y(2);
    text-align: right;
  }
</style>
