<template>
  <div id="app">
    <app-header class="app-header"/>
    <div class="app-content">
      <transition name="x-fade" mode="out-in" appear>
        <router-view/>
      </transition>
    </div>
    <app-footer class="app-footer"/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="scss">
  @import "~@/styles/kit-overrides";
  @import "~@/styles/kit/core";
  @import "~@/styles/transitions";

  html,
  body {
    height: 100%;
    margin: 0;
    color: inherit;
    background-color: inherit;
  }

  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .app-header {
    flex: 0 0 auto;
  }

  .app-content {
    flex: 1 1 auto;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }

  .app-footer {
    flex: 0 0 auto;
  }

  .input-select {
    background-color: inherit;
  }

  .x-padded-container {
    @include container;
    @include padding-y(3, 6);
  }
</style>
