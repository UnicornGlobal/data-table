<template>
    <router-link :to="link(data)" class="list-row">
        <div v-for="(field, index) in fields" class="list-row-field" :style="styler(field)"
             :secondary="field.secondary === true">
            <table-data :data="data" :field="field"></table-data>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
    @import "../sass/styles";

    div[secondary="true"] {
        @media(max-width: 1023px) {
            display: none !important;
        }
    }

    .list-row {
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid $tabbs-gray-4;
        height: 55px;
        padding-left: 1em;
        color: $black;

        &:hover {
            background-color: #f7f8f9;
        }

        @media(max-width: 480px) {
            height: 65px;
            padding-left: 0.5em;
        }

        .list-row-field {
            flex: 1;
        }

        .list-row-field:first-child {
            flex: 0;
        }

        .list-row-field:last-child {
            padding-right: 0.5em;

            @media(max-width: 1023px) and (min-width: 481px) {
                padding-right: 20px;
            }

            @media(max-width: 480px) {
                padding-right: 20px;
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

  export default {
    components: {
      TableData
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
      linking: {
        type: Object,
        required: true
      }
    },
    methods: {
      link(rowData) {
        return {
          name: this.linking.route.name,
          params: {
            [this.linking.param]: rowData[this.linking.field]
          }
        }
      }
    }
  }
</script>
