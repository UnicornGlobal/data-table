<template>
    <div class="filters">
        <div v-for="filter in filters" class="filter" :class="'filter-' + filter.type">
            <tabbed-filters v-if="filter.type === 'tabbed'" :filter="filter" class="tabbed-filters"></tabbed-filters>
            <filter-checkbox v-if="filter.type === 'checkbox'" :filter="filter"
                             class="checkbox-filter"></filter-checkbox>
            <filter-dropdown v-if="filter.type === 'dropdown'" :filter="filter" class="dropdown-filter"
                             :options="dropdownDataSet(filter, dataset)"></filter-dropdown>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../sass/styles";

    .filters {
        display: flex;
        flex-wrap: wrap;
    }

    .filter-checkbox, .filter-dropdown {
        flex: 1;
        padding: 0.6em;
        flex-basis: 170px;
    }

    .filter-tabbed {
        margin-bottom: 1em;
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
        return [...new Set(data.map(obj => obj[filter.field]))]
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

