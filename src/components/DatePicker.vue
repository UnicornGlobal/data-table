<template>
  <input
    type="text"
    :value="value"
    class="date-input" />
</template>

<style lang="scss">
  @import '~pikaday/scss/pikaday';

  input.date-input {
    border: 1px solid var(--primary) !important;
  }
</style>

<script type="text/javascript">
  import Pickaday from 'pikaday'

  export default {
    props: ['value', 'format', 'name'],
    data() {
      return {
        picker: null,
        inputName: this.name || 'date'
      }
    },
    watch: {
      value(value) {
        this.picker.setDate(value)
      }
    },
    destroyed() {
      this.picker.destroy()
      this.picker = null
    },
    mounted() {
      const getDate = this.getDate

      this.picker = new Pickaday({
        field: this.$el,
        bound: true,
        defaultDate: this.value,
        format: 'YYYY-MM-DD',
        onSelect: function (date) {
          getDate(this.getMoment(date).format('YYYY-MM-DD'))
        }
      })

      this.picker.setDate(this.value)
    },
    methods: {
      getDate(date) {
        this.$emit(this.inputName, {
          date,
          field: this.inputName
        })
        this.$emit('input', date)
      }
    }
  }
</script>
