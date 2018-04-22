<template>
    <div class="data-table">
        <div class="action-component-container">
            <component v-if="options.config.actionComponent" :is="options.config.actionComponent.component"></component>
        </div>
        <filtering v-if="options.config.filtering.enabled" :filters="options.config.filtering.filters"
                   :dataset="dataset"></filtering>
        <searching v-if="options.config.search.enabled" :config="options.config.search"></searching>
        <table-headers v-if="processedData.length && showHeaders" :config="options.config" :fields="options.fields"
                       :styler="getStyle" :controls="options.controls || []"></table-headers>
        <table-body v-if="processedData.length" :dataset="processedData" :fields="options.fields" :styler="getStyle"
                    :linking="options.config.linking" :controls="options.controls || []"></table-body>
        <div v-else class="no-results">No Results. Please broaden your search parameters.</div>
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
    data() {
      return {
        processedDataset: []
      }
    },
    watch: {
      dataset() {
        this.processData()
      }
    },
    mounted() {
      this.processData()
      this.$watch('options.config', () => {
        this.$nextTick(this.processData())
      }, {deep: true})
    },
    computed: {
      showHeaders() {
        return !(this.options.config.headers && this.options.config.headers.enabled === false)

      },
      processedData() {
        return this.processedDataset
      }
    },
    methods: {
      processData() {
        let result = this.dataset.slice()

        if (this.options.config.filtering.enabled) {
          for (let i = 0; i < this.options.config.filtering.filters.length; i++) {
            result = result.filter(item => {
              let show = false
              let field = this.options.config.filtering.filters[i].field
              let enabled = this.options.config.filtering.filters[i].enabled
              let value = this.options.config.filtering.filters[i].value
              let type = this.options.config.filtering.filters[i].type
              let collection = this.options.config.filtering.filters[i].collection
              let fieldItem = item[field]

              if (enabled) {
                show = true
              }

              if (type === 'checkbox') {

                show = !collection && fieldItem

                if (!collection && value) {
                  show = true
                }
                // TODO empty collections
                if (collection && fieldItem.length > 0) {
                  show = true
                }

                if (this.options.config.filtering.filters[i].value && collection) {
                  show = true
                }
              }

              if (type === 'dropdown') {
                if (this.options.config.filtering.filters[i].value) {
                  show = (fieldItem === this.options.config.filtering.filters[i].value)
                }
              }

              // TODO each 'type' should run through a method
              if (type === 'tabbed') {
                const config = this.options.config.filtering.filters[i]
                for (let c = 0; c < config.tabs.length; c++) {
                  if (config.tabs[c].type === 'date') {
                    let from = config.tabs[c].from
                    let to = config.tabs[c].to
                    let date = item[config.tabs[c].field].split(' ')[0]

                    if (from && date < from) {
                      show = false
                    }

                    if (to && date > to) {
                      show = false
                    }
                  }

                  if (config.tabs[c].type === 'range') {
                    let from = config.tabs[c].from
                    let to = config.tabs[c].to
                    let value = item[config.tabs[c].field]

                    if (from && value < from) {
                      show = false
                    }

                    if (to && value > to) {
                      show = false
                    }
                  }
                }
              }

              return show
            })
          }
        }

        if (this.options.config.sorting.enabled) {
          result.sort(this.compare)
        }

        if (this.options.config.search.term) {
          result = this.search(result)
        }

        this.processedDataset = result
        return result
      },
      search(data){
        return data.filter(item => {
          if (item[this.options.config.search.field].toLowerCase().search(this.options.config.search.term.toLowerCase()) > -1) {
            return true
          }
          return false
        })
      },
      getStyle(field) {
        if (field.grow) {
          return 'flex: ' + field.grow
        }

        if (field.type === 'image') {
          return 'flex: 0; min-width: 50px;'
        }

        if (field.type === 'component') {
          return 'flex: 0; padding-right: 1em;'
        }

        return 'flex: 1'
      },
      compare(a, b) {
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
    @import "sass/styles";

    .card {
        border: none;
        padding: 0;
        margin: 0;
        height: auto;

        @media(max-width: 480px) {
            flex-direction: column;
            align-items: left;
            max-height: calc(100vh - 55px);
        }
    }

    .search-div {
        min-height: 65px;
    }

    $background: #fff;
    $tabs-base-color: #fff;
    .search-bar-label {
        width: 18px;
        height: 18px;
        margin-top: 12px;
        margin-left: 7px;
        position: absolute;
        background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20fill%3D%22%239DA3B3%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20d%3D%22M505%20442.7L405.3%20343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3%2044-79.7%2044-128C416%2093.1%20322.9%200%20208%200S0%2093.1%200%20208s93.1%20208%20208%20208c48.3%200%2092.7-16.4%20128-44v16.3c0%206.4%202.5%2012.5%207%2017l99.7%2099.7c9.4%209.4%2024.6%209.4%2033.9%200l28.3-28.3c9.4-9.4%209.4-24.6.1-34zM208%20336c-70.7%200-128-57.2-128-128%200-70.7%2057.2-128%20128-128%2070.7%200%20128%2057.2%20128%20128%200%2070.7-57.2%20128-128%20128z%22/%3E%3C/svg%3E);
    }

    .data-table {
        position: relative;
        overflow-x: auto;

        @media(max-width: 480px) {
            margin: 0;
        }

        .action-component-container {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            padding: 10px;
        }
    }

    .controls {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        .search-bar {
            display: flex;
            flex-grow: 1;
            margin-top: 20px;
            margin-bottom: 20px;
            height: 40px;

            input {
                padding-left: 29px;
                background-color: $white;

                @media(max-width: 480px) {
                    margin-bottom: 8px;
                }
            }
        }

        a {
            background-color: $tabbs-blue;
            border: 1px solid $tabbs-gray-3;
            color: $white;
            text-decoration: none;
            padding: 7px 20px;
            text-align: center;
            display: block;
        }

        .action {
            margin-left: 1em;
            flex: 0;
        }
    }

    div.no-results {
        padding-left: 20px;
        padding-bottom: 20px;
    }

</style>
