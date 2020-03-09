<template>
  <transition name="x-fade" mode="out-in" appear>
    <div class="MODAL">
      <div class="MODAL-CLOSE" @click="$emit('close')">Close</div>
      <div class="MODAL-CONTENT">
        <h1 class="h1 m-t-0">
          Your Todo
        </h1>
        <todo-form
            :item="item"
            submit-text="Update"
            deletable
            @submit="update"
            @delete="deleteItem(item.rowid)"/>
      </div>
    </div>
  </transition>
</template>

<script>
import TodoForm from '@/components/TodoForm';
import formMixin from '@/mixins/form';
import $axios from '@/axios';

export default {
  name: 'modal-todo',
  mixins: [formMixin],
  components: {
    TodoForm,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async update (data) {
      this.preSubmit();

      try {
        const updateData = {
          ...data,
          due_date: this.formatDate(data.due_date),
        };

        await $axios.put(`/api/todo/modify/${data.rowid}`, updateData);

        this.success = true;
        this.$emit('modify', updateData);

        setTimeout(() => {
          this.success = false;
        }, 2000);
      } catch (err) {
        this.fail = true;
      }
    },
    async deleteItem (rowid) {
      await $axios.delete(`/api/todo/delete/${rowid}`);
      this.$emit('delete', rowid);
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/styles/toolbox";

  .MODAL {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.8);
  }

  .MODAL-CONTENT {
    @include padding(2, 3);
    overflow-y: auto;
    background-color: white;

    max-height: 80%;
    min-width: 70vw;
    max-width: 90vw;

    @include tablet {
      max-height: 80vh;
      min-width: 500px;
      max-width: 800px;
    }
  }

  .MODAL-CLOSE {
    position: fixed;
    top: $unit;
    right: $unit;
    font-size: 32px;
    color: white;
    text-transform: uppercase;
    cursor: pointer;

    @include tablet {
      top: $unit * 2;
      right: $unit * 2;
    }
  }
</style>
