<template>
  <div
    v-if="!smallScreen"
    class="list-row">
    <div
      v-for="(field, index) in fields"
      class="list-row-field"
      :key="index"
      :style="styler(field)"
      :secondary="field.secondary === true">
      <table-data
        :data="data"
        :field="field">
      </table-data>
    </div>
    <div
      v-if="controls && controls.length"
      class="controls list-row-field">
      <table-row-option
        v-for="(control, key) in controls"
        v-if="showControl(control, data)"
        :key="key"
        :config="control"
        :data="data">
      </table-row-option>
    </div>
  </div>
  <div v-else>
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
        <div
          :style="getStyle(displayRight, data)"
          class="list-row-field">
          <table-data
            v-if="displayRight"
            :data="data"
            :field="displayRight">
          </table-data>
        </div>
      </div>
    </div>
    <div
      v-else
      class="mobile-screen no-image">
      <div class="thumbnail">
        <div class="list-row-field">
          <table-data
            :data="data"
            :field="firstField"></table-data>
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
            :key="index"
            class="mobile-right">
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
    <div
            v-if="controls && controls.length"
            class="controls list-row-field">
      <table-row-option
              v-for="(control, key) in controls"
              v-if="showControl(control, data)"
              :key="key"
              :config="control"
              :data="data">
      </table-row-option>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .list-row-field[secondary="true"] {
    @media(max-width: 1023px) {
      display: none !important;
    }
  }

  .controls {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
  }

  .list-row {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: var(--divider);
    min-height: var(--rowHeight);
    height: var(--rowHeight);
    padding: 0 var(--padding);

    @media(max-width: 480px) {
      min-height: 65px;
      padding-left: calc(var(--padding) / 2);
    }

    @media(max-width: 680px) {
      min-height: 65px;
      padding-left: calc(var(--padding) / 2);
    }

    .list-row-field {
      flex: 1;
      padding: 0px 3px;
    }

    .list-row-field:last-child {
      padding: 0 3px;

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

  .mobile-screen {
    text-decoration: none;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(216, 218, 225);
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
      background-color: #f7f8f9;
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
        background-color: green;
        padding: 3px;
        border-radius: 4px;
        color: white;
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
      },
      showControl (control, data) {
        if (control.show === undefined) {
          return true
        }
        if (typeof control.show === 'function') {
          return control.show(data)
        }

        return control.show
      }
    }
  }
</script>
