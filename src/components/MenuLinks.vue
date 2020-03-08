<template>
  <div class="MENU-LINKS">
    <router-link
        :to="{ name: 'create' }"
        class="btn-secondary w-100:mo m-b-1:mo m-r-2:t"
        @click.native="$emit('close')">
      Create
    </router-link>
    <router-link
        :to="{
          name: 'calendar',
          params: {
            month,
            year,
          },
        }"
        class="btn-fourthary w-100:mo m-b-1:mo"
        @click.native="$emit('close')">
      Calendar
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'menu-links',
  computed: {
    month () {
      return (new Date()).getMonth() + 1;
    },
    year () {
      return (new Date()).getFullYear();
    },
  },
};
</script>
