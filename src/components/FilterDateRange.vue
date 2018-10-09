<template>
  <div>
    <button
      class="close-tab"
      @click="closeFilter">
      <close-button></close-button>
    </button>
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
      <button
        tabindex="-1"
        @click="setDateFrom({date:null})">
        <close-button></close-button>
      </button>
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
      <button
        tabindex="-1"
        @click="setDateTo({date:null})">
        <close-button></close-button>
      </button>
    </div>
    <input hidden ref="from" v-model="filter.from"/>
    <input hidden ref="to" v-model="filter.to"/>
  </div>
</template>

<style lang="scss" scoped>
  @import '../styles/filters/close-tab.scss';

  // Label from / to
  span {
    margin-bottom: 0.3em;
  }

  .date-input {
    display: flex;
    flex-direction: row;
    margin-bottom: 1em;

    button {
      border: 0;
      background-color: white;
      padding: 0;
      margin: 0;
      height: 38px;
      width: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;

      svg {
        height: 20px;
        width: 20px;
      }
    }
  }
</style>

<script>
  import CloseButton from './Icons/close-button.svg'
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
        this.$refs.from.dispatchEvent(new Event('input', { 'bubbles': true }))
      },
      setDateTo(e) {
        this.$refs.to.value = e.date
        this.$refs.to.dispatchEvent(new Event('input', { 'bubbles': true }))
      }
    }
  }
</script>
