<template>
    <div class="list-row">
        <div v-for="(field, index) in fields" :key="index" class="list-row-field" :style="styler(field)"
             :secondary="field.secondary === true">
            <table-data :data="data" :field="field"></table-data>
        </div>
        <div v-if="controls && controls.length" class="controls list-row-field">
            <table-row-option v-for="(control, key) in controls" :key="key" :config="control"
                              :data="data"></table-row-option>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../sass/styles";

    div[secondary="true"] {
        @media(max-width: 1023px) {
            display: none !important;
        }
    }

    .controls {
        display: flex;
        flex-direction: row-reverse;
    }

    .list-row {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid $tabbs-gray-4;
        min-height: 56px;
        padding-left: 1em;
        padding-right: 0.125em;

        @media(max-width: 480px) {
            min-height: 65px;
            padding-left: 0.5em;
        }

        .list-row-field {
            flex: 1;
            padding: 0px 3px;
        }

        .list-row-field:last-child {
            padding: 0 3px;

            @media(max-width: 1023px) and (min-width: 481px) {
            }

            @media(max-width: 480px) {
            }

            div {
                text-align: right;
            }
        }
    }

    .list-row:last-child {
        @media(max-width: 480px) {
            margin-bottom: 65px;
        }
    }
</style>

<script>
  import TableData from './TableData.vue'
  import TableRowOption from './TableRowOption.vue'

  export default {
    components: {
      TableData,
      TableRowOption
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      fields: {
        type: Array,
        required: true
      },
      styler: {
        type: Function,
        required: true
      },
      controls: {
        type: Array,
        required: false
      }
    }
  }
</script>
