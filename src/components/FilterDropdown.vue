<template>
  <div
    v-if="filter.type === 'dropdown'">
    <label
      v-if="filter.text"
      :for="'filter-' + filter.filter">
      {{ filter.text }}
    </label>
    <select
      v-model="filter.value"
      :style="dropdownStyle"
      :name="`${filter.filter}`">
      <option value="">
        {{ filter.placeholder }}
      </option>
      <option
        v-for="each in options"
        :value="value(each)">
        {{label(each)}}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
  div {
    display: flex;
    align-items: center;
    margin: calc(var(--padding) / 2);
  }

  label {
    margin-right: var(--padding);
    font-size: .9rem;
  }

  select {
    cursor: pointer;
    padding: 0 0 0 10px;
    border: 1px solid var(--divider);
    background-size: 15px 13px;
    background-repeat: no-repeat;
    background-origin: content-box;
    background-position: right 10px center;
  }
</style>

<script>
  export default {
    props: {
      filter: {
        type: Object,
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    },
    computed: {
      dropdownStyle() {
        return `background-image: ${this.$assets.dropdown};`
      }
    },
    methods: {
      value (option) {
        if (typeof option === 'object') {
          return option.value
        }
        return option
      },
      label (option) {
        if (typeof option === 'object') {
          return option.label
        }
        return option
      }
    }
  }
</script>
