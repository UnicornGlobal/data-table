<template>
  <div>
    <close-button @close="$emit('close')"></close-button>
    <date-input
      title="From"
      name="dateFrom"
      ref="dateFrom"
      :value="filter.from"
      :event="setDateFrom">
    </date-input>
    <date-input
      title="To"
      name="dateTo"
      ref="dateTo"
      :value="filter.to"
      :event="setDateTo">
    </date-input>
    <input hidden ref="from" v-model="filter.from"/>
    <input hidden ref="to" v-model="filter.to"/>
  </div>
</template>

<script>
  import CloseButton from './CloseButton.vue'
  import DateInput from './DateInput.vue'

  export default {
    props: {
      filter: {
        type: Object,
        required: true
      }
    },
    components: {
      CloseButton,
      DateInput
    },

    /**
     * Pikaday breaks reactivity.
     * To keep it we act as a 'proxy' here, and bind the real, reactive value
     * to a hidden input.
     *
     * We dispatch an event to force a refresh
     */
    mounted() {
      if (!this.$refs.from.value) {
        // this.$nextTick(() => this.$refs.dateFrom.$refs.dateInput.$refs.inputArea.focus())
      }
    },
    methods: {
      setDateFrom(date) {
        this.$refs.from.value = date
        this.$refs.from.dispatchEvent(new Event('input', {
          'bubbles': true
        }))
      },
      setDateTo(date) {
        this.$refs.to.value = date
        this.$refs.to.dispatchEvent(new Event('input', {
          'bubbles': true
        }))
      }
    }
  }
</script>
