<template>
  <div class="x-padded-container">
    <h1 class="h1 m-t-0">
      Todos for {{ formattedDate }}
    </h1>
    <div class="GRID">
      <date-picker
          :value="new Date(year, month - 1)"
          inline
          minimumView="month"
          maximumView="month"
          class="DATEPICKER"
          @selected="choseDate"/>
      <div class="TODOS">
        <transition name="x-fade" mode="out-in" appear>
          <div v-if="loading" key="loading">
            Loading...
          </div>
          <div v-else-if="results.length" key="todos">
            <todo-item
                v-for="result in results"
                :key="result.rowId"
                :item="result"
                class="TODO-ITEM"/>
          </div>
          <div v-else key="empty">
            No todos this month
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns';
import DatePicker from 'vuejs-datepicker';

import TodoItem from '@/components/TodoItem';
import $axios from '@/axios';

export default {
  name: 'calendar',
  components: {
    DatePicker,
    TodoItem,
  },
  props: {
    month: {
      type: [Number, String],
      required: true,
    },
    year: {
      type: [Number, String],
      required: true,
    },
  },
  data () {
    return {
      loading: true,
      results: [],
    };
  },
  watch: {
    $route: {
      async handler (to, from) {
        await this.fetchTodosbyMonthYear(to, from);
      },
      immediate: true,
    },
  },
  computed: {
    formattedDate () {
      const date = new Date(this.year, this.month - 1);

      return format(date, 'MMMM yyyy');
    },
  },
  methods: {
    async fetchTodosbyMonthYear (to) {
      const { month, year } = to.params;

      this.loading = true;

      const { data: { results } } = await $axios.get('/api/todo/fetch-month', {
        params: {
          year,
          month: String(month).padStart(2, '0'),
        },
      });

      this.results = results.map((result) => ({
        ...result,
        due_date: format(parseISO(result.due_date), 'MM/dd/yyyy'),
      }));

      this.loading = false;
    },
    choseDate (date) {
      this.$router.push({
        name: 'calendar',
        params: {
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/styles/toolbox";

  .GRID {
    display: grid;
    grid-template:
      "datepicker" min-content
      "todos" min-content /
       1fr;
    grid-gap: $unit * 3;

    @include tablet {
      grid-template:
        "datepicker todos" min-content /
         300px      1fr;
      grid-gap: $unit * 5;
    }
  }

  .DATEPICKER {
    grid-area: datepicker;
  }

  .TODOS {
    grid-area: todos;
  }

  .TODO-ITEM {
    & + & {
      @include margin-top(2, 3)
    }
  }
</style>
