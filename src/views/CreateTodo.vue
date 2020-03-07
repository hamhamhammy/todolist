<template>
  <div class="x-padded-container d-flex jc-center">
    <form class="FORM" @submit.prevent="submit">
      <h1 class="h1 m-t-0">
        Create Todo
      </h1>
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
            v-model="dueDate"
            :disabled-dates="disabledDays"
            :input-class="`input w-100 ${Boolean(errorDate) && 'error'}`"
            format="MMMM d yyyy"
            placeholder="Select Due Date"/>
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
            placeholder="Type your content here..."/>
        <div v-if="Boolean(errorContent)" class="input-error">
          {{ errorContent }}
        </div>
      </div>
      <div v-if="createSuccess" class="input-success m-b-2">
        Your todo has been created!
      </div>
      <button class="btn-proceed w-100" type="submit">
        Create
      </button>
    </form>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker';

import $axios from '@/axios';

export default {
  name: 'create',
  components: {
    DatePicker,
  },
  data () {
    return {
      author: '',
      content: '',
      dueDate: null,
      attemptedSubmission: false,
      createSuccess: false,
      createFailed: false,
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

      if (!this.dueDate) {
        return 'Please enter a date';
      }

      return '';
    },
    errorContent () {
      if (!this.attemptedSubmission) {
        return;
      }

      if (!this.author) {
        return 'Please enter your content';
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
  methods: {
    async submit () {
      this.createFailed = false;
      this.createSuccess = false;
      this.attemptedSubmission = true;

      if (this.hasError) {
        return;
      }

      try {
        await $axios.post('/api/todo/create', {
          author: this.author,
          content: this.content,
          due_date: this.dueDate.toISOString().replace(/\d{2}:\d{2}:\d{2}/, '00:00:00'),
        });
        this.attemptedSubmission = false;
        this.createSuccess = true;
        setTimeout(() => {
          this.createSuccess = false;
        }, 3000);
        this.reset();
      } catch (err) {
        this.createFailed = true;
        console.log('Error creating todo, try again later'); // Replace this with proper error message
      }
    },
    reset () {
      this.author = '';
      this.dueDate = null;
      this.content = '';
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

  .BUTTON {
    margin: 0 auto;
  }
</style>
