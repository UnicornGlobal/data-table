<template>
  <div class="data-table">
    <div class="action-component-container">
      <component
        v-if="options.config.actionComponent"
        :is="options.config.actionComponent.component">
      </component>
    </div>
    <div class="filtering-card" :class="options.config.headers && options.config.headers.gap ? 'gapped' : ''">
      <filtering
        v-if="options.config.filtering.enabled"
        :filters="options.config.filtering.filters"
        :dataset="dataset">
      </filtering>
      <searching
        v-if="options.config.search.enabled"
        :config="options.config.search">
      </searching>
    </div>
    <div class="table-card" :class="options.config.headers && options.config.headers.gap ? 'gapped' : ''">
      <table-headers
        v-if="processedData.length && showHeaders && !smallScreen"
        :config="options.config"
        :fields="options.fields"
        :styler="getStyle"
        :controls="options.controls || []">
      </table-headers>
      <table-body
        v-if="processedData.length"
        :dataset="processedData"
        :fields="options.fields"
        :styler="getStyle"
        :linking="options.config.linking"
        :mobileType="options.config.mobileType"
        :showLabelOnMobile="options.config.showLabelOnMobile"
        :smallScreen="smallScreen"
        :controls="options.controls || []">
      </table-body>
      <div v-else class="no-results">
        <div v-if="options.config.search && options.config.search.emptyTerm">
          {{ options.config.search.emptyTerm }}
        </div>
        <div v-else>
          No Results. Please broaden your search parameters.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .filtering-card {
    border: 3px solid var(--primary);
    background: white;

    &.gapped {
      margin-bottom: calc(var(--padding) * 1.5);
    }
  }

  .table-card {
    border: 3px solid var(--primary);
    background: white;
  }

  .no-results {
    padding: var(--padding);
  }
</style>

<style module lang="scss">
  $primary: #000;
  $secondary: #111;
  $tertiary: #222;
  $primaryText: #234;
  $secondaryText: #234;
  $lightBackground: #DDD;
  $darkBackground: #333;
  $padding: 1em;
  $fontSize: 0.9em;

  :root {
    --primary: $primary;
    --secondary: $secondary;
    --tertiary: $tertiary;
    --primaryText: $primaryText;
    --secondaryText: $secondaryText;
    --lightBackground: $lightBackground;
    --darkBackground: $darkBackground;
    --padding: $padding;
    --fontSize: $fontSize;
  }

  :export {
    primary: $primary;
    secondary: $secondary;
    tertiary: $tertiary;
    primaryText: $primaryText;
    secondaryText: $secondaryText;
    lightBackground: $lightBackground;
    darkBackground: $darkBackground;
    padding: $padding;
    fontSize: $fontSize;
  }
</style>

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
      this.setTheme()
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
      setTheme() {
        // Set the configured theme
        this.$style.primary = this.$theme.primary || this.$style.primary
        this.$style.primaryText = this.$theme.primaryText || this.$style.primaryText
        this.$style.secondaryText = this.$theme.secondaryText || this.$style.secondaryText
        this.$style.secondary = this.$theme.secondary || this.$style.secondary
        this.$style.tertiary = this.$theme.tertiary || this.$style.tertiary
        this.$style.lightBackground = this.$theme.lightBackground || this.$style.lightBackground
        this.$style.darkBackground = this.$theme.darkBackground || this.$style.darkBackground
        this.$style.padding = this.$theme.padding || this.$style.padding
        this.$style.fontSize = this.$theme.fontSize || this.$style.fontSize

        // Then set the css variables
        const bodyStyles = document.body.style
        bodyStyles.setProperty('--primary', this.$style.primary)
        bodyStyles.setProperty('--secondary', this.$style.secondary)
        bodyStyles.setProperty('--tertiary', this.$style.tertiary)
        bodyStyles.setProperty('--primaryText', this.$style.primaryText)
        bodyStyles.setProperty('--secondaryText', this.$style.secondaryText)
        bodyStyles.setProperty('--lightBackground', this.$style.lightBackground)
        bodyStyles.setProperty('--darkBackground', this.$style.darkBackground)
        bodyStyles.setProperty('--padding', this.$style.padding)
        bodyStyles.setProperty('--fontSize', this.$style.fontSize)
      },
      setInnerWidth () {
        this.windowWidth = window.innerWidth
      },
      watchConfig () {
        this.$watch('options.config', () => {
          return this.$nextTick(this.processData)
        }, { deep: true })
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
