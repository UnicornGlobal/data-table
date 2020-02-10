<template>
  <div class="filters">
    <div
      v-for="filter in filters"
      :class="'filter-' + filter.type + ''">
      <tabbed-filters
        v-if="filter.type === 'tabbed'"
        :filter="filter"
        class="tabbed-filters">
      </tabbed-filters>
      <filter-checkbox
        v-if="filter.type === 'checkbox'"
        :filter="filter"
        class="input_checkbox">
      </filter-checkbox>
      <filter-dropdown
        v-if="filter.type === 'dropdown'"
        :filter="filter"
        :options="dropdownDataSet(filter, dataset)">
      </filter-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .filters {
    display: flex;
    flex-wrap: wrap;
    border-bottom: var(--border);
  }

  .filter-checkbox, .filter-dropdown {
    flex: 1;
    padding: calc(var(--padding) / 2);
    flex-basis: 170px;
    align-self: center;
  }

  .filter-tabbed {
    width: 100%;
  }

  .tabbed-filters {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
</style>

<script>
  import FilterCheckbox from './FilterCheckbox.vue'
  import FilterDropdown from './FilterDropdown.vue'
  import TabbedFilters from './TabbedFilters.vue'

  export default {
    components: {
      FilterCheckbox,
      FilterDropdown,
      TabbedFilters
    },
    methods: {
      dropdownDataSet(filter, data) {
        if (typeof data === 'undefined') {
          return []
        }

        const returnSet = [...new Set(data.map(obj => {
          if (filter.field.indexOf('.') < 0) {
            return obj[filter.field]
          }

          return filter.field.split('.').reduce((o, i) => {
            if (obj[o] !== null && obj[o][i] !== null) {
              return obj[o][i]
            }

            if (obj[o] !== null) {
              return obj[o]
            }
          })
        }))]

        return returnSet.filter(function (el) {
          return el !== null && typeof el !== 'undefined'
        })
      }
    },
    props: {
      filters: {
        type: Array,
        required: true
      },
      dataset: {
        type: Array,
        required: true
      }
    }
  }
</script>
