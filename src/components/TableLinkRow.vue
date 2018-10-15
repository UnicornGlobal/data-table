<template>
  <router-link
    v-if="!smallScreen"
    class="list-row"
    :to="link(data)">
    <div
      v-for="(field, index) in fields"
      class="list-row-field"
      :style="styler(field)"
      :secondary="field.secondary === true">
      <table-data
        :data="data"
        :field="field">
      </table-data>
    </div>
  </router-link>
  <router-link
    v-else
    class="row-link"
    style="text-decoration: none; display: block;"
    :to="link(data)">
    <div
      v-if="mobileType === 'with-image'"
      class="mobile-screen">
      <div
        v-if="imageField"
        class="thumbnail">
        <div class="list-row-field">
          <table-data
            v-if="imageField"
            :data="data"
            :field="imageField">
          </table-data>
        </div>
      </div>
      <div class="rest">
        <div
          v-for="(field, index) in filteredFields"
          class="list-row-field"
          :style="styler(field)"
          :secondary="field.secondary === true">
          <table-data
            v-if="field.field !== 'image' && !field.displayRightOnMobile"
            :data="data"
            :field="field">
          </table-data>
        </div>
      </div>
      <div
        v-if="displayRight"
        class="mobile-right">
        <div class="list-row-field"
          :style="getStyle(displayRight, data)">
          <table-data
            v-if="displayRight"
            :data="data"
            :field="displayRight">
          </table-data>
        </div>
      </div>
    </div>
    <div
      v-else-if="mobileType === 'no-image'"
      class="mobile-screen no-image">
      <div class="thumbnail">
        <div class="list-row-field">
          <table-data
            :data="data"
            :field="firstField">
          </table-data>
        </div>
      </div>
      <div class="flex">
        <div class="rest">
          <div
            v-for="(field, index) in rest"
            class="list-row-field"
            :style="styler(field)"
            :secondary="field.secondary === true">
            <div
              v-if="showLabelOnMobile"
              :class="`label-config ${index !== 0 ? 'grid' : ''}`">
              <span
                v-if="!field.displayRightOnMobile && index !== 0"
                class="label">
                {{field.name}}:
              </span>
              <table-data
                v-if="field.field !== 'image' && !field.displayRightOnMobile"
                :data="data"
                :field="field">
              </table-data>
            </div>
            <div v-else>
              <table-data
                v-if="field.field !== 'image' && !field.displayRightOnMobile"
                :data="data"
                :field="field">
              </table-data>
            </div>
          </div>
        </div>
        <div class="right-cont">
          <div
            v-if="displayRight.length > 0"
            v-for="(right, index) in displayRight"
            class="mobile-right"
            :key="index">
            <div
              :style="getStyle(right, data)"
              class="list-row-field">
              <table-data
                v-if="right"
                :data="data"
                :field="right">
              </table-data>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
  .list-row-field[secondary="true"] {
    @media(max-width: 1023px) {
      display: none !important;
    }
  }

  .list-row, .mobile-scroll {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--primary);
    height: var(--rowHeight);
    color: rgb(0, 0, 0);
    padding: 0 var(--padding);

    &:hover {
      background-color: #f7f8f9;
    }

    @media(max-width: 480px) {
      height: calc(var(--rowHeight) + 10px);
      padding-left: calc(var(--padding) / 2);
    }

    .list-row-field {
      flex: 1;
      padding: 0 3px;
    }

    .list-row-field:first-child {
      flex: 0;
    }

    .list-row-field:last-child {

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
      margin-bottom: calc(var(--rowHeight) + 10px);
    }
  }

  .mobile-screen {
    text-decoration: none;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--primary);
    color: rgb(0, 0, 0);
    padding-left: 2px;
    display: grid;
    grid-template-columns: 100px 6fr;
    align-items: center;

    .thumbnail {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &.no-image {
      grid-template-columns: 72px 6fr;
    }

    &:hover {
      background-color: var(--hover);
    }

    .grid {
      display: grid;
      grid-template-columns: 70px 3fr;
    }

    .label-config {
      .label {
        font-size: .9em;
        display: inline-block;
        padding-left: 3px;
        padding-right: 3px;
      }

      .field-contents {
        padding-left: 3px;
        padding-right: 3px;
        display: flex;
        align-items: flex-end;
      }
    }

    .list-row-field {
      padding-left: 3px;
      padding-right: 3px;
    }

    .rest {
      .list-row-field {
        color: rgba(0, 0, 0, 0.6)
      }

      .list-row-field:nth-of-type(1) {
        color: rgb(0, 0, 0);
        font-weight: 900 !important;
        font-size: 15px !important;
        padding-bottom: 5px;
      }
    }

    .right-cont {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      max-width: 120px;
      flex-wrap: wrap;
    }

    .mobile-right {
      text-align: right;
      margin-right: 2px;

      .list-row-field {
        display: inline-block;
        margin-right: var(--padding);
        background-color: lightgreen;
        padding: calc(var(--padding) / 2);
        border-radius: 4px;
        color: black;
        font-size: 12px;
      }
    }
  }

  .no-image {
    .rest {
      .list-row-field {
        color: rgba(0, 0, 0, 0.6)
      }

      .list-row-field:nth-of-type(1) {
        color: rgb(0, 0, 0);
        padding-bottom: 0px;
      }
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
      },
      mobileType: {
        type: String,
        required: false
      },
      showLabelOnMobile: {
        type: Boolean,
        required: false
      },
      smallScreen: {
        type: Boolean,
        required: false
      }
    },
    computed: {
      imageField () {
        return this.fields.find(field => field.field === 'image')
      },
      displayRight () {
        return this.fields.filter(field => field.displayRightOnMobile === true)
      },
      filteredFields () {
        const copied = [...this.fields]
        const image = copied.findIndex(field => field.field === 'image')

        if (image >= 0) {
          copied.splice(image, 1)
        }

        const displayRight = copied.findIndex(field => field.displayRightOnMobile === true)

        if (displayRight >= 0) {
          copied.splice(displayRight, 1)
        }

        return copied
      },
      firstField () {
        return this.fields[0]
      },
      rest () {
        const fields = [...this.fields]
        fields.splice(0, 1)
        return fields
      }
    },
    methods: {
      link (rowData) {
        if (typeof this.linking.link === 'function') {
          return this.linking.link(rowData)
        }

        return {
          name: this.linking.route.name,
          params: {
            [this.linking.param]: rowData[this.linking.field]
          }
        }
      },
      getStyle (field, data) {
        if (field.styledBackground && field.styledBackground.enabled) {
          let value

          if (field.value) {
            value = field.value(data)
          } else {
            value = field.field.split('.').reduce((prev, curr) => {
              return prev ? prev[curr] : null
            }, data || self)
          }

          return `background-color: ${field.styledBackground.config[value]}`
        }

        return ''
      }
    }
  }
</script>
