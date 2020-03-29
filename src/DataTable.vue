<template>
    <div class="data-table">
        <div class="action-component-container" :style="actionComponentStyle">
            <component
                    v-if="settings.config.actionComponent"
                    :is="settings.config.actionComponent.component"
                    v-bind="settings.config.actionComponent.props || {}">
            </component>
        </div>
        <div
                v-if="(settings.config.filtering.enabled || settings.config.search.enabled) && loaded"
                :class="settings.config.headers && settings.config.headers.gap ? 'gapped' : ''"
                class="filtering-card">
            <filtering
                    v-if="settings.config.filtering.enabled"
                    :config="settings"
                    :filters="settings.config.filtering.filters"
                    :dataset="dataset">
            </filtering>
            <searching
                    v-if="settings.config.search.enabled"
                    :config="settings.config.search">
            </searching>
        </div>
        <div class="table-card" :class="settings.config.headers && settings.config.headers.gap ? 'gapped' : ''">
            <table-headers
                    v-if="processedData.length && showHeaders && !smallScreen"
                    :total-records="processedData.length"
                    :config="settings.config"
                    :fields="settings.fields"
                    :styler="getStyle"
                    :controls="settings.controls || []">
            </table-headers>
            <table-body
                    v-if="processedData.length"
                    :dataset="processedData"
                    :fields="settings.fields"
                    :styler="getStyle"
                    :linking="settings.config.linking"
                    :mobileType="settings.config.mobileType"
                    :showLabelOnMobile="settings.config.showLabelOnMobile"
                    :smallScreen="smallScreen"
                    :controls="settings.controls || []">
            </table-body>
            <div v-else-if="!loaded" class="no-results" style="text-align: center">
                Loading...
            </div>
            <div v-else class="no-results">
                <div v-if="settings.config.search && settings.config.search.emptyTerm">
                    {{ settings.config.search.emptyTerm }}
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
        border: var(--border);
        background: white;

        &.gapped {
            margin-bottom: calc(var(--padding) * 1.5);
        }
    }

    .table-card {
        border: var(--border);
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
    $border: '1px solid #fff';
    $headers: #eee;
    $headerWeight: 200;
    $headerFont: sans-serif;
    $divider: '1px solid #eee';
    $padding: 1em;
    $fontSize: 0.9em;
    $rowHeight: 55px;
    $rowMobileHeight: 80px;

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
        --rowMobileHeight: $rowMobileHeight;
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
        rowMobileHeight: $rowMobileHeight;
    }
</style>

<!--<style lang="scss">-->
<!--</style>-->

<script>
  import Filtering from './components/Filtering.vue'
  import Searching from './components/Searching.vue'
  import TableHeaders from './components/TableHeaders.vue'
  import TableBody from './components/TableBody.vue'

  export default {
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
      },
      loaded: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    data () {
      return {
        settings: this.options,
        processedDataset: [],
        windowWidth: null
      }
    },
    watch: {
      dataset () {
        this.processData()
      },
      settings: {
        deep: true,
        handler () {
          this.processData()
        }
      }
    },
    mounted () {
      this.setTheme()
      this.processData()
      this.windowWidth = window.innerWidth
      this.$nextTick(() => {
        window.addEventListener('resize', this.setInnerWidth)
      })
    },
    computed: {
      showHeaders () {
        return !(this.settings.config.headers && this.settings.config.headers.enabled === false)
      },
      processedData () {
        return this.processedDataset
      },
      smallScreen () {
        return false
        // Disabled for now while we rework the mobile layouts
        // return !!(this.windowWidth && this.windowWidth <= 500)
      },
      actionComponentStyle () {
        if (!this.settings.config.actionComponent) {
          return false
        }

        if (!this.settings.config.actionComponent.offset) {
          return false
        }

        let top = '0px'
        let bottom = '0px'

        if (this.settings.config.actionComponent.offset.top) {
          top = this.settings.config.actionComponent.offset.top
        }

        if (this.settings.config.actionComponent.offset.bottom) {
          bottom = this.settings.config.actionComponent.offset.bottom
        }

        return `margin-top: ${top}; margin-bottom: ${bottom}`
      }
    },
    methods: {
      setTheme () {
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
      processData () {
        let dataset = this.dataset.slice()

        if (this.settings.config.filtering.enabled) {
          for (const filter of this.settings.config.filtering.filters) {
            if (!filter.enabled) {
              continue
            }

            dataset = dataset.filter(row => {
              if (filter.type === 'checkbox') {
                return this.filterCheckbox(row, filter)
              }

              if (filter.type === 'tabbed') {
                return this.filterTabs(row, filter)
              }

              if (filter.type === 'dropdown') {
                return this.filterDropdown(row, filter)
              }

              return true
            })
          }
        }

        if (this.settings.config.sorting.enabled) {
          dataset.sort(this.compare)
        }

        if (this.settings.config.search.term) {
          dataset = this.search(dataset)
        }

        this.processedDataset = dataset

        return dataset
      },
      search (dataset) {
        return dataset.filter(row => {
          return row[this.settings.config.search.field].toLowerCase().search(this.settings.config.search.term.toLowerCase()) > -1
        })
      },
      filterDropdown (row, filter) {
        if (!filter.value) {
          return true
        }

        if (filter.value && filter.data && typeof filter.data === 'function') {
          return filter.data(row[filter.field]) === filter.value
        }

        if (filter.value && filter.field.indexOf('.') < 0) {
          return this.doFilterByDropdown(filter.value, row[filter.field])
        }

        const val = filter.field.split('.').reduce((o, i) => {
          if (row === null || row[o] === null) {
            return false
          }

          if (row[o] !== null && row[o][i] !== null) {
            return row[o][i]
          }

          if (row[o] !== null) {
            return row[o]
          }
        })

        if (typeof val !== 'undefined') {
          return this.doFilterByDropdown(filter.value, val)
        }

        return false
      },
      doFilterByDropdown (filterValue, dataValue) {
        //No filter selected
        if(Array.isArray(filterValue) && filterValue.length === 0){
          return true
        }

        //Empty data
        if(Array.isArray(dataValue) && dataValue.length === 0){
          return false
        }
        //Both arrays
        if (Array.isArray(filterValue) && Array.isArray(dataValue)) {
          return filterValue.some(fv => dataValue.includes(fv))
        }

        //Both scalar
        if (!(Array.isArray(filterValue) || Array.isArray(dataValue))) {
          return filterValue === dataValue
        }

        //Filter value is array
        if (Array.isArray(filterValue)) {
          return filterValue.some(fv => fv === dataValue)
        }

        //Data value is array
        if (Array.isArray(dataValue)) {
          return dataValue.some(dv => dv === filterValue)
        }

        return false
      },
      filterCheckbox (row, filter) {
        const value = row[filter.field]
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

        for (const tab of config.tabs) {
          if (tab.type === 'date' && !this.dateTabFilter(dataItem, tab)) {
            return false
          }

          if (tab.type === 'range' && !this.rangeTabFilter(dataItem, tab)) {
            return false
          }
        }

        return true
      },
      dateTabFilter (dataItem, tab) {
        const date = dataItem[tab.field].split(' ')[0]
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
        const value = dataItem[tab.field]
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
        if (field.grow || field.grow === 0) {
          return 'flex: ' + field.grow
        }

        if (field.type === 'image' && !field.secondary) {
          return 'flex: 0; min-width: 50px;'
        }

        if (field.type === 'component') {
          return 'flex: 0;'
        }

        return 'flex: 1'
      },
      compare (a, b) {
        let field = this.settings.config.sorting.field

        if (field.includes('.')) {
          const names = field.split('.')
          // Very naive but only allow 1 dot nested depth at the moment
          a = a[names[0]]
          b = b[names[0]]
          field = names[1]
        }

        if (a === null || a === undefined) {
          a = []
          a[field] = ''
        }

        if (b === null || b === undefined) {
          b = []
          b[field] = ''
        }

        const first = a[field] || ''
        const second = b[field] || ''

        // We can only sort strings
        if (first.toString().toLowerCase() < second.toString().toLowerCase()) {
          return this.settings.config.sorting.ascending ? -1 : 1
        }

        if (first.toString().toLowerCase() > second.toString().toLowerCase()) {
          return this.settings.config.sorting.ascending ? 1 : -1
        }

        return 0
      }
    }
  }
</script>
