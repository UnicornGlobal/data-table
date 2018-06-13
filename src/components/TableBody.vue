<template>
    <div class="list">
        <div v-if="mustLink()">
            <table-link-row v-for="(data, key) in dataset" :fields="fields" :data="data" :styler="styler" :key="key"
                            :linking="linking"></table-link-row>
        </div>
        <table-row v-for="(data, key) in dataset" :fields="fields" :data="data" :styler="styler" :key="key"
                   :controls="controls" v-else></table-row>
    </div>
</template>

<style lang="scss">
    @import "../sass/styles";

    .list {
        position: relative;
        overflow-y: auto;
        max-height: 540px;
        overflow-x: hidden;

        @media(max-width: 480px) {
            max-height: calc(100vh - 250px);
        }
    }
</style>

<script>
  import TableData from './TableData.vue'
  import TableRow from './TableRow.vue'
  import TableLinkRow from './TableLinkRow.vue'

  export default {
    components: {
      TableData,
      TableRow,
      TableLinkRow
    },
    props: {
      dataset: {
        type: Array,
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
      linking: {
        type: [Object, Boolean],
        required: false,
        default: false
      },
      controls: {
        type: Array,
        required: false
      }
    },
    methods: {
      mustLink() {
        return !!(this.linking && this.linking.enabled)

      }
    }
  }
</script>

