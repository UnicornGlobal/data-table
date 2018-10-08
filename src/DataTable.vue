<template>
    <div class="data-table__udt">
        <div class="action-component-container__udt">
            <component v-if="options.config.actionComponent" :is="options.config.actionComponent.component"></component>
        </div>
        <filtering v-if="options.config.filtering.enabled" :filters="options.config.filtering.filters"
                   :dataset="dataset"></filtering>
        <searching v-if="options.config.search.enabled" :config="options.config.search"></searching>
        <table-headers v-if="processedData.length && showHeaders && !smallScreen" :config="options.config"
                       :fields="options.fields"
                       :styler="getStyle" :controls="options.controls || []"></table-headers>
        <table-body v-if="processedData.length" :dataset="processedData" :fields="options.fields" :styler="getStyle"
                    :linking="options.config.linking" :mobileType="options.config.mobileType"
                    :showLabelOnMobile="options.config.showLabelOnMobile" :smallScreen="smallScreen"
                    :controls="options.controls || []"></table-body>
        <div v-else class="no-results__udt">No Results. Please broaden your search parameters.</div>
    </div>
</template>

<script>
  import Filtering from './components/Filtering.vue'
  import Searching from './components/Searching.vue'
  import TableHeaders from './components/TableHeaders.vue'
  import TableBody from './components/TableBody.vue'

  export default {
    name: 'data-table',
    components: {
      Filtering,
      Searching,
      TableHeaders,
      TableBody
    },
    props: {
      dataset: {
        type: Array,
        required: true
      },
      options: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        processedDataset: [],
        windowWidth: null
      }
    },
    watch: {
      dataset () {
        this.processData()
      }
    },
    mounted () {
      this.processData()
      this.watchConfig()
      this.windowWidth = window.innerWidth
      this.$nextTick(() => {
        window.addEventListener('resize', this.setInnerWidth)
      })
    },
    computed: {
      showHeaders () {
        return !(this.options.config.headers && this.options.config.headers.enabled === false)
      },
      processedData () {
        return this.processedDataset
      },
      smallScreen () {
        return this.windowWidth && this.windowWidth <= 500 ? true : false
      }
    },
    methods: {
      setInnerWidth () {
        this.windowWidth = window.innerWidth
      },
      watchConfig () {
        this.$watch('options.config', () => {
          return this.$nextTick(this.processData)
        }, {deep: true})
      },
      processData () {
        let dataset = this.dataset.slice()

        if (this.options.config.filtering.enabled) {
          for (let filter of this.options.config.filtering.filters) {
            if (!filter.enabled) {
              continue
            }

            dataset = dataset.filter(row => {
              let show = true
              if (filter.type === 'checkbox') {
                show = this.filterCheckbox(row, filter)
              }

              if (filter.type === 'tabbed') {
                show = this.filterTabs(row, filter)
              }

              if (filter.type === 'dropdown') {
                if (filter.value) {
                  show = row[filter.field] === filter.value
                }
              }

              return show
            })
          }
        }

        if (this.options.config.sorting.enabled) {
          dataset.sort(this.compare)
        }

        if (this.options.config.search.term) {
          dataset = this.search(dataset)
        }

        this.processedDataset = dataset
        return dataset
      },
      search (dataset) {
        return dataset.filter(row => {
          return row[this.options.config.search.field].toLowerCase().search(this.options.config.search.term.toLowerCase()) > -1
        })
      },
      filterCheckbox (row, filter) {
        let value = row[filter.field]
        let show = false

        show = !filter.collection && value

        if (!filter.collection && filter.value) {
          show = true
        }
        // TODO empty collections
        if (filter.collection && value.length > 0) {
          show = true
        }

        if (filter.value && filter.collection) {
          show = true
        }

        return show
      },
      filterTabs (dataItem, filter) {
        const config = filter
        let show = true
        for (let tab of config.tabs) {
          if (tab.type === 'date') {
            show = this.dateTabFilter(dataItem, tab)
          }

          if (tab.type === 'range') {
            show = this.rangeTabFilter(dataItem, tab)
          }
        }
        return show
      },
      dateTabFilter (dataItem, tab) {
        let date = dataItem[tab.field].split(' ')[0]

        if (tab.from && date < tab.from) {
          return false
        }

        return !(tab.to && date > tab.to)
      },
      rangeTabFilter (dataItem, tab) {
        let value = dataItem[tab.field]
        let show = true

        if (tab.from && value < tab.from) {
          show = false
        }

        if (tab.to && value > tab.to) {
          show = false
        }

        return show
      },
      getStyle (field) {
        if (field.grow) {
          return 'flex: ' + field.grow
        }

        if (field.type === 'image') {
          return 'flex: 0; min-width: 50px;'
        }

        if (field.type === 'component') {
          return 'flex: 0;'
        }

        return 'flex: 1'
      },
      compare (a, b) {
        let field = this.options.config.sorting.field
        if (field.includes('.')) {
          const names = field.split('.')
          // Very naive but only allow 1 dot nested depth at the moment
          a = a[names[0]]
          b = b[names[0]]
          field = names[1]
        }

        if (a[field] < b[field]) {
          return this.options.config.sorting.ascending ? -1 : 1
        }

        if (a[field] > b[field]) {
          return this.options.config.sorting.ascending ? 1 : -1
        }

        return 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-div__udt {
    min-height: 65px;
  }

  .search-bar-label__udt {
    width: 18px;
    height: 18px;
    margin-top: 12px;
    margin-left: 7px;
    position: absolute;
    background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20fill%3D%22%239DA3B3%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20d%3D%22M505%20442.7L405.3%20343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3%2044-79.7%2044-128C416%2093.1%20322.9%200%20208%200S0%2093.1%200%20208s93.1%20208%20208%20208c48.3%200%2092.7-16.4%20128-44v16.3c0%206.4%202.5%2012.5%207%2017l99.7%2099.7c9.4%209.4%2024.6%209.4%2033.9%200l28.3-28.3c9.4-9.4%209.4-24.6.1-34zM208%20336c-70.7%200-128-57.2-128-128%200-70.7%2057.2-128%20128-128%2070.7%200%20128%2057.2%20128%20128%200%2070.7-57.2%20128-128%20128z%22/%3E%3C/svg%3E);
  }

  .data-table__udt {
    position: relative;
    overflow-x: auto;

    @media(max-width: 480px) {
      margin: 0;
    }

    .action-component-container__udt {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  .controls__udt {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    a {
      background-color: rgb(84, 129, 255);
      border: 1px solid rgb(216, 218, 225);
      color: rgb(255, 255, 255);
      text-decoration: none;
      padding: 7px 20px;
      text-align: center;
      display: block;
    }
  }

  div.no-results__udt {
    padding-left: 20px;
    padding-bottom: 20px;
  }
</style>
