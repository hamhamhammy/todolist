<template>
  <form @submit.prevent="submit">
    <div class="w-100 m-b-2">
      <input
          v-model="author"
          :class="{ error: Boolean(errorAuthor) }"
          class="input w-100"
          type="text"
          placeholder="Your Name"/>
      <div v-if="Boolean(errorAuthor)" class="input-error">
        {{ errorAuthor }}
      </div>
    </div>
    <div class="w-100 m-b-2">
      <date-picker
          v-model="due_date"
          :disabled-dates="disabledDays"
          :input-class="`input w-100 ${Boolean(errorDate) && 'error'}`"
          format="MMMM d yyyy"
          placeholder="Due Date"/>
      <div v-if="Boolean(errorDate)" class="input-error">
        {{ errorDate }}
      </div>
    </div>
    <div class="w-100 m-b-2">
      <textarea
          v-model="content"
          :class="{ error: Boolean(errorContent) }"
          class="input-textarea w-100"
          rows="5"
          placeholder="Description"/>
      <div v-if="Boolean(errorContent)" class="input-error">
        {{ errorContent }}
      </div>
    </div>
    <button class="btn-proceed w-100" type="submit">
      {{ submitText }}
    </button>
    <button v-if="deletable" class="btn-secondary w-100 m-t-2" @click="deleteItem">
      {{ deleteText }}
    </button>
  </form>
</template>

<script>
import { parseISO } from 'date-fns';
import DatePicker from 'vuejs-datepicker';

export default {
  name: 'todo-form',
  components: {
    DatePicker,
  },
  props: {
    item: {
      type: Object,
      default () {
        return {};
      },
    },
    deletable: {
      type: Boolean,
      default: false,
    },
    submitText: {
      type: String,
      default: 'Create',
    },
    deleteText: {
      type: String,
      default: 'Delete',
    },
    clear: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    clear: {
      async handler (value) {
        if (value) {
          this.reset();
        }
      },
      immediate: true,
    },
  },
  data () {
    return {
      author: '',
      content: '',
      due_date: null,
      attemptedSubmission: false,
    };
  },
  computed: {
    hasError () {
      return this.errorAuthor || this.errorDate || this.errorContent;
    },
    errorAuthor () {
      if (!this.attemptedSubmission) {
        return;
      }

      if (!this.author) {
        return 'Please enter your name';
      }

      return '';
    },
    errorDate () {
      if (!this.attemptedSubmission) {
        return;
      }

      if (!this.due_date) {
        return 'Please enter a date';
      }

      return '';
    },
    errorContent () {
      if (!this.attemptedSubmission) {
        return;
      }

      if (!this.content) {
        return 'Please enter your description';
      }

      return '';
    },
    disabledDays () {
      const date = new Date();
      date.setDate(date.getDate() - 1);

      return {
        to: date, // Disable dates before current date
      };
    },
  },
  mounted () {
    if (this.item) { // Set the initial state from the props
      this.author = this.item.author;
      this.content = this.item.content;
      this.due_date = typeof this.item.due_date === 'string' ? parseISO(this.item.due_date) : this.item.due_date;
    }
  },
  methods: {
    submit () {
      this.attemptedSubmission = true;

      if (this.hasError) {
        return;
      }

      this.$emit('submit', {
        ...this.item,
        author: this.author,
        content: this.content,
        due_date: new Date(this.due_date),
      });
    },
    deleteItem () {
      this.$emit('delete', this.item.rowid);
    },
    reset () {
      this.author = '';
      this.content = '';
      this.due_date = null;
      this.attemptedSubmission = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/styles/toolbox";

  .BUTTON {
    margin: 0 auto;
  }
</style>
