<template>
    <div class="date-form-picker">
        <div @click="closeFilter" class="close-tab">x</div>
        <span class="custom-form-label">From</span>
        <div class="date-input">
            <datatable-date-picker @dateFrom="setDateFrom" ref="pickFrom" name="dateFrom"
                                   :value="filter.from"></datatable-date-picker>
            <button tabindex="-1" @click="setDateFrom({date:null})">x</button>
        </div>
        <span class="custom-form-label">To</span>
        <div class="date-input">
            <datatable-date-picker @dateTo="setDateTo" ref="pickTo" name="dateTo"
                                   :value="filter.to"></datatable-date-picker>
            <button tabindex="-1" @click="setDateTo({date:null})">x</button>
        </div>
        <input hidden ref="from" v-model="filter.from"/>
        <input hidden ref="to" v-model="filter.to"/>
    </div>
</template>

<script>
  import DatatableDatePicker from './DatePicker.vue'

  export default {
    props: {
      filter: {
        type: Object,
        required: true
      }
    },
    components: {
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
        this.$refs.from.dispatchEvent(new Event('input', {'bubbles': true}))
      },
      setDateTo(e) {
        this.$refs.to.value = e.date
        this.$refs.to.dispatchEvent(new Event('input', {'bubbles': true}))
      }
    }
  }
</script>

<style lang="scss">
    @import "../sass/styles";

    .date-input {
        display: flex;
        flex-direction: row;
        margin-bottom: 1em;
    }

    .close-tab {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0.5em 1em;
    }

    .custom-form-label {
        margin-bottom: 0.5em;
    }
</style>
