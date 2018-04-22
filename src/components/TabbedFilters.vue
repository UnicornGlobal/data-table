<template>
    <div class="filter-tab">
        <div>
            <div class="tabs" role="tablist">
                <div class="tab" :class="index === activeTab ? 'active' : ''" v-for="(tab, index) in filter.tabs"
                     @click="setActive(index)">
                    {{ getTitle(tab) }}
                </div>
            </div>
            <div>
                <div v-for="(tab, index) in filter.tabs">
                    <filter-date-range @close="setActive(0)" v-if="tab.type === 'date' && index === activeTab" :filter="tab"
                                       class="filter-tab-content"></filter-date-range>
                    <filter-number-range @close="setActive(0)" v-if="tab.type === 'range' && index === activeTab" :filter="tab"
                                         class="filter-tab-content"></filter-number-range>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../sass/styles";

    .filter-tab {
    }

    .filter-tab-content {
        position: absolute;
        z-index: 999;
        left: 2em;
        background: white;
        border: 1px solid rgb(233, 234, 235);
        padding: 2em 1em 0em;
        width: 50%;
        min-width: 300px;
        max-width: 600px;
    }

    .tabs {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid rgb(233, 234, 235);
        align-items: center;

        .tab {
            padding: 0.7em;
            min-width: 65px;
            height: auto;
            font-size: .9rem;
            overflow-wrap: normal;

            &.active {
                background: lightgrey;
                color: $tabbs-blue;
            }
        }
    }

    @media screen and (max-width: 500px) {
        .tabs {
            .tab {
                font-size: .7rem;
                padding: 0.7em;
                min-height: 48px;
                display: flex;
                align-items: center;
            }
        }
    }
</style>

<script>
  import FilterDateRange from './FilterDateRange.vue'
  import FilterNumberRange from './FilterNumberRange.vue'

  export default {
    components: {
      FilterDateRange,
      FilterNumberRange
    },
    props: {
      filter: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        activeTab: 0
      }
    },
    methods: {
      setActive(selectedTab) {
        this.activeTab = selectedTab
      },
      getTitle(tab) {
        if (tab.type === 'null') {
          return tab.name
        }

        if (tab.type === 'date') {
          if (!tab.from && !tab.to) {
            return `${tab.name} (All)`
          }

          if (tab.from && !tab.to) {
            return `${tab.name} (Since ${tab.from})`
          }

          if (!tab.from && tab.to) {
            return `${tab.name} (Before ${tab.to})`
          }
        }

        if (tab.type === 'range') {
          if (!tab.from && !tab.to) {
            return `${tab.name} (All)`
          }

          if (tab.from && !tab.to) {
            return `${tab.name} (Above ${tab.from})`
          }

          if (!tab.from && tab.to) {
            return `${tab.name} (Below ${tab.to})`
          }
        }

        return `${tab.name} (${tab.from} - ${tab.to})`
      }
    }
  }
</script>

