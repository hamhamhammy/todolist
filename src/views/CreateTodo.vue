<template>
  <div class="x-padded-container d-flex jc-center">
    <div class="FORM">
      <h1 class="h1 m-t-0">
        Create Todo
      </h1>
      <todo-form :clear="reset" @submit="submit"/>
      <div v-if="success" class="input-success m-b-2">
        Success :)
      </div>
      <div v-if="fail" class="input-error m-b-2">
        Failed :(
      </div>
    </div>
  </div>
</template>

<script>
import TodoForm from '@/components/TodoForm';
import formMixin from '@/mixins/form';
import $axios from '@/axios';

export default {
  name: 'create',
  mixins: [formMixin],
  components: {
    TodoForm,
  },
  methods: {
    async submit (data) {
      this.preSubmit();

      try {
        await $axios.post('/api/todo/create', {
          ...data,
          due_date: this.formatDate(data.due_date),
        });

        this.onSuccess();
      } catch (err) {
        this.fail = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/styles/toolbox";

  .FORM {
    @include responsive(width, 100%, 400px);
    display: inline-block;
  }
</style>
