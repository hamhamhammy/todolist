<template>
  <div class="HEADER">
    <div class="HEADER-GRID container">
      <div class="LOGO-CONTAINER">
        <router-link :to="{ name: 'home' }" class="LOGO">
          TodoList
        </router-link>
      </div>
      <div class="CARET">
        <icon-caret-square-down
            class="d-block"
            width="24"
            @click.native="toggleMenu"/>
      </div>
      <menu-links
          class="LINKS d-none:mo"
          @close="toggleMenu"/>
    </div>
    <transition name="x-fade-fast" mode="out-in">
      <div v-show="menuOpen" class="MENU d-none:t">
        <menu-links
            class="LINKS"
            @close="toggleMenu"/>
      </div>
    </transition>
  </div>
</template>

<script>
import MenuLinks from './MenuLinks';

import IconCaretSquareDown from './icons/IconCaretSquareDown';

export default {
  name: 'app-header',
  components: {
    MenuLinks,
    IconCaretSquareDown,
  },
  data () {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu () {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/styles/toolbox";

  .HEADER {
    position: relative;
    flex: 0 0 auto;
  }

  .HEADER-GRID {
    @include padding-y(1, 2);
    display: grid;
    grid-template:
      "logo caret" min-content /
        1fr min-content min-content;
    align-items: center;
    grid-gap: $unit;

    @include tablet {
      grid-template:
        "logo links" min-content /
         1fr  auto;
      grid-gap: $unit * 2;;
    }
  }

  .LOGO-CONTAINER {
    grid-area: logo;
  }

  .LOGO {
    @include h4;
    color: inherit; // TODO - link styles
    display: inline-block;
    text-decoration: none !important;
  }

  .CARET {
    @include responsive(display, block, none);
    grid-area: caret;
  }

  .LINKS {
    display: flex;
    flex-direction: column;

    @include tablet {
      grid-area: links;
      flex-direction: row;
      align-items: center;
    }
  }

  .PLUS {
    cursor: pointer;
  }

  .MENU {
    @include absolute(auto, 0, 0, 0);
    display: block;
    padding: $unit * 1;
    background-color: white;
    transform: translateY(100%);
    z-index: 1; // ios smooth scroll bug
  }
</style>
