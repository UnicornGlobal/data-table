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
      <div
        v-if="filter.from"
        class="clear-date"
        @click="setDateFrom({date:null})">
        CLEAR
      </div>
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
      <div
        v-if="filter.to"
        class="clear-date"
        @click="setDateTo({date:null})">
        CLEAR
      </div>
    </div>
    <input hidden ref="from" v-model="filter.from"/>
    <input hidden ref="to" v-model="filter.to"/>
  </div>
</template>

<style lang="scss" scoped>
  // Label from / to
  span {
    font-size: calc(var(--padding) * 0.8);
    margin: calc(var(--padding) / 2) 0;
  }

  span:first-of-type {
    margin-top: calc(var(--padding) / 3);
  }

  .date-input {
    display: flex;
    flex-direction: row;

    button {
      border: 0;
      outline: 0;
      background-color: white;
      padding: 0;
      margin: 0;
      height: 20px;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }
  }

  .clear-date {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    margin-left: -5em;
    color: grey;
    font-size: 0.5em;
    font-weight: bold;

    &:hover {
      opacity: 0.9;
      cursor: pointer;
    }
  }

  .close-tab {
    position: absolute;
    top: var(--padding);
    right: var(--padding);
  }
</style>

<script>
  import CloseButton from './CloseButton.vue'
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
