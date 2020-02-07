<template>
  <div class="list">
    <div
      v-if="mustLink()">
      <table-link-row
        v-for="(data, key) in dataset"
        :fields="fields"
        :data="data"
        :styler="styler"
        :key="key"
        :controls="controls"
        :linking="linking"
        :mobileType="mobileType"
        :showLabelOnMobile="showLabelOnMobile"
        :smallScreen="smallScreen">
      </table-link-row>
    </div>
    <table-row
      v-else
      v-for="(data, key) in dataset"
      :fields="fields"
      :data="data"
      :styler="styler"
      :key="key"
      :controls="controls"
      :mobileType="mobileType"
      :showLabelOnMobile="showLabelOnMobile"
      :smallScreen="smallScreen">
    </table-row>
  </div>
</template>

<style lang="scss" scoped>
  .list {
    position: relative;
    overflow-y: auto;
    max-height: 540px;

    @media(max-width: 480px) {
      max-height: calc(100vh - 250px);
    }
  }

  .row-link:nth-of-type(1) {
    border-top: 1px solid var(--primary);
  }

  .row-link {
    &:nth-of-type(odd) {
      border-left: 5px solid rgba(184,199,223, 0.7);
    }

    &:nth-of-type(even) {
      border-left: 5px solid rgb(230,237,249) ;
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
      },
      mobileType: {
        type: String,
        required: false,
        default: 'no-image'
      },
      showLabelOnMobile: {
        type: Boolean,
        required: false,
        default: true
      },
      smallScreen: {
        type: Boolean,
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

