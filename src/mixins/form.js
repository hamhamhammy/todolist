import { formatISO } from 'date-fns';

export default {
  data () {
    return {
      reset: false,
      success: false,
      fail: false,
    };
  },
  methods: {
    preSubmit () {
      this.reset = false;
      this.fail = false;
      this.success = false;
    },
    onSuccess () {
      this.success = true;

      setTimeout(() => {
        this.reset = true;
        this.success = false;
      }, 2000);
    },
    formatDate (date) {
      return formatISO(new Date(date));
      // return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    },
  },
};
