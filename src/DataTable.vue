<template>
  <div class="data-table">
    <div class="action-component-container" :style="actionComponentStyle">
      <component
        v-if="options.config.actionComponent"
        :is="options.config.actionComponent.component">
      </component>
    </div>
    <div
      v-if="options.config.filtering.enabled || options.config.search.enabled"
      :class="options.config.headers && options.config.headers.gap ? 'gapped' : ''"
      class="filtering-card">
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
  .data-table {
    display: flex;
    flex-direction: column;
  }

  .action-component-container {
    align-self: flex-end;
  }

  .filtering-card {
    border: 3px solid var(--border);
    background: white;

    &.gapped {
      margin-bottom: calc(var(--padding) * 1.5);
    }
  }

  .table-card {
    border: 3px solid var(--border);
    background: white;
  }

  .no-results {
    padding: var(--padding);
  }
</style>

<style module lang="scss">
  $primary: #000;
  $secondary: #111;
  $hover: #eee;
  $primaryText: #234;
  $secondaryText: #234;
  $border: #fff;
  $headers: #ddd;
  $headerWeight: 200;
  $headerFont: sans-serif;
  $divider: #eee;
  $padding: 1em;
  $fontSize: 0.9em;
  $rowHeight: 55px;

  :root {
    --primary: $primary;
    --secondary: $secondary;
    --hover: $hover;
    --primaryText: $primaryText;
    --secondaryText: $secondaryText;
    --border: $border;
    --headers: $headers;
    --headerWeight: $headerWeight;
    --headerFont: $headerFont;
    --divider: $divider;
    --padding: $padding;
    --fontSize: $fontSize;
    --rowHeight: $rowHeight;
  }

  :export {
    primary: $primary;
    secondary: $secondary;
    hover: $hover;
    primaryText: $primaryText;
    secondaryText: $secondaryText;
    border: $border;
    headers: $headers;
    headerWeight: $headerWeight;
    headerFont: $headerFont;
    divider: $divider;
    padding: $padding;
    fontSize: $fontSize;
    rowHeight: $rowHeight;
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
      },
      actionComponentStyle () {
        if (!this.options.config.actionComponent) {
          return false
        }

        if (!this.options.config.actionComponent.offset) {
          return false
        }

        let top = '0px'
        let bottom = '0px'

        if (this.options.config.actionComponent.offset.top) {
          top = this.options.config.actionComponent.offset.top
        }

        if (this.options.config.actionComponent.offset.bottom) {
          bottom = this.options.config.actionComponent.offset.bottom
        }

        return `margin-top: ${top}; margin-bottom: ${bottom}`
      }
    },
    methods: {
      setTheme() {
        // Set the configured theme
        this.$style.primary = this.$theme.primary || this.$style.primary
        this.$style.primaryText = this.$theme.primaryText || this.$style.primaryText
        this.$style.secondaryText = this.$theme.secondaryText || this.$style.secondaryText
        this.$style.secondary = this.$theme.secondary || this.$style.secondary
        this.$style.border = this.$theme.border || this.$style.border
        this.$style.headers = this.$theme.headers || this.$style.headers
        this.$style.headerWeight = this.$theme.headerWeight || this.$style.headerWeight
        this.$style.headerFont = this.$theme.headerFont || this.$style.headerFont
        this.$style.divider = this.$theme.divider || this.$style.divider
        this.$style.hover = this.$theme.hover || this.$style.hover
        this.$style.padding = this.$theme.padding || this.$style.padding
        this.$style.fontSize = this.$theme.fontSize || this.$style.fontSize
        this.$style.rowHeight = this.$theme.rowHeight || this.$style.rowHeight

        // Then set the css variables
        const bodyStyles = document.body.style
        bodyStyles.setProperty('--primary', this.$style.primary)
        bodyStyles.setProperty('--secondary', this.$style.secondary)
        bodyStyles.setProperty('--hover', this.$style.hover)
        bodyStyles.setProperty('--primaryText', this.$style.primaryText)
        bodyStyles.setProperty('--secondaryText', this.$style.secondaryText)
        bodyStyles.setProperty('--border', this.$style.border)
        bodyStyles.setProperty('--headers', this.$style.headers)
        bodyStyles.setProperty('--headerWeight', this.$style.headerWeight)
        bodyStyles.setProperty('--headerFont', this.$style.headerFont)
        bodyStyles.setProperty('--divider', this.$style.divider)
        bodyStyles.setProperty('--padding', this.$style.padding)
        bodyStyles.setProperty('--fontSize', this.$style.fontSize)
        bodyStyles.setProperty('--rowHeight', this.$style.rowHeight)
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
            return this.dateTabFilter(dataItem, tab)
          }

          if (tab.type === 'range') {
            return this.rangeTabFilter(dataItem, tab)
          }
        }

        return show
      },
      dateTabFilter (dataItem, tab) {
        let date = dataItem[tab.field].split(' ')[0]
        let show = true

        if (tab.from && date < tab.from) {
          show = false
        }

        if (tab.to && date > tab.to) {
          show = false
        }

        return show
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
