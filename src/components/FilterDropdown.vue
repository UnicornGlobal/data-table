<template>
    <div v-if="filter.type === 'dropdown'">
        <label
                v-if="filter.text"
                :for="'filter-' + filter.filter">
            {{ filter.text }}
        </label>
        <vue-select ref="select" v-model="filter.value" :options="dropdownOptions" v-if="filter.multiple"
                    :multiple="true"
                    :reduce="item => item.value" placeholder="All"/>
        <select v-else v-model="filter.value" :style="dropdownStyle" :name="`${filter.filter}`">
            <option value="">
                {{ filter.placeholder }}
            </option>
            <option
                    v-for="each in dropdownOptions"
                    :value="each.value">
                {{each.label}}
            </option>
        </select>
    </div>
</template>

<style lang="scss">
    .v-select {
        width: 100%;
        font-weight: bold;

        .vs__dropdown-toggle {
            width: 100%;
        }

        .vs__dropdown-toggle {
            border: none;
            border-radius: 0;
            padding-bottom: 0;

            .vs__selected-options {
                align-items: center;
            }

            input.vs__search {
                border: none;
                width: 0;
                margin: 0;

                &:focus {
                    box-shadow: none;
                }
            }

            .vs__selected {
                display: inline;

                button {
                    height: initial;
                }
            }
        }

        .vs__dropdown-option--selected {
            display: none;
        }
    }

</style>

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
  import VueSelect from 'vue-select'
  import 'vue-select/dist/vue-select.css'
  import { css } from 'styled-vue'

  export default {
    props: {
      theme: {
        type: Object,
        required: false
      },
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
      dropdownStyle () {
        return `background-image: ${this.$assets.dropdown};`
      },
      dropdownOptions () {
        return this.options.map((opt) => {
          return {label: this.label(opt), value: this.value(opt)}
        })
      }
    },
    data () {
      return {
        multiselect: {
          bg: '#FFFFFF',
          border: 'solid 1px #CED4DA',
          selectedBg: '#f0f0f0',
          selectedBorder: '#3c3c3c80',
          selectedColor: '#333',
          deselectIconColor: '#3c3c3c80',
          ...this.theme
        }
      }
    },
    globalStyle: css`
      .v-select {
        background-color: ${vm.multiselect.bg};
        border: ${vm.multiselect.border};
      }
      .vs__dropdown-toggle .vs__selected-options span.vs__selected {
        background-color: ${vm.multiselect.selectedBg};
        border: ${vm.multiselect.selectedBorder};
        color: ${vm.multiselect.selectedColor};
      }
      .vs__dropdown-toggle .vs__selected-options .vs__selected .vs__deselect svg{
        fill: ${vm.multiselect.deselectIconColor};
        stroke: ${vm.multiselect.deselectIconColor};
      }
    `,
    watch: {
      filter: {
        deep: true,
        handler (config) {
          // this.setTheme(config)
        }
      }
    },
    components: {
      VueSelect
    },
    mounted () {

    },
    methods: {
      value (option) {
        if (typeof option === 'undefined') {
          return
        }

        if (option === null || option.value === null) {
          return
        }

        if (typeof option.value === 'function') {
          return option.value()
        }

        if (typeof option === 'object') {
          return option.value
        }

        return option
      },
      label (option) {
        if (option === null) {
          return
        }

        if (typeof option === 'object') {
          return option.label
        }

        return option
      }
    }
  }
</script>
