<template>
  <div>
    <close-button
      class="close-tab"
      @click="closeFilter">
    </close-button>
    <span>
      From
    </span>
    <div class="date-input">
      <datatable-date-picker
        ref="pickFrom"
        name="dateFrom"
        :value="filter.from"
        @dateFrom="setDateFrom">
      </datatable-date-picker>
      <clear-button
        v-if="filter.from"
        @click="setDateFrom({date:null})">
      </clear-button>
    </div>
    <span>
      To
    </span>
    <div class="date-input">
      <datatable-date-picker
        ref="pickTo"
        name="dateTo"
        :value="filter.to"
        @dateTo="setDateTo">
      </datatable-date-picker>
      <clear-button
        v-if="filter.to"
        @click="setDateTo({date:null})">
      </clear-button>
    </div>
    <input hidden ref="from" v-model="filter.from"/>
    <input hidden ref="to" v-model="filter.to"/>
  </div>
</template>

<style lang="scss" scoped>
  // Label from / to
  span {
    font-size: calc(var(--padding) * 0.8);
    margin: var(--padding) 0 calc(var(--padding) / 2) 0;

    &:first-of-type {
      margin-top: calc(var(--padding) / 3);
    }
  }

  .date-input {
    display: flex;
    flex-direction: row;
  }
</style>

<script>
  import CloseButton from './CloseButton.vue'
  import ClearButton from './ClearButton.vue'
  import DatatableDatePicker from './DatePicker.vue'

  export default {
    props: {
      filter: {
        type: Object,
        required: true
      }
    },
    components: {
      CloseButton,
      ClearButton,
      DatatableDatePicker
    },

    /**
     * Pikaday breaks reactivity.
     * To keep it we act as a 'proxy' here, and bind the real, reactive value
     * to a hidden input.
     *
     * We dispatch an event to force a refresh
     */
    methods: {
      closeFilter() {
        this.$emit('close')
      },
      setDateFrom(e) {
        this.$refs.from.value = e.date
        this.$refs.from.dispatchEvent(new Event('input', {
          'bubbles': true
        }))
      },
      setDateTo(e) {
        this.$refs.to.value = e.date
        this.$refs.to.dispatchEvent(new Event('input', {
          'bubbles': true
        }))
      }
    }
  }
</script>
