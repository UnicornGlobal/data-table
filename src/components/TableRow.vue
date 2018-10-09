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
      v-else-if="mobileType === 'no-image'"
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
  </div>
</template>

<style lang="scss" scoped src="../styles/table-row.scss"></style>

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
      }
    }
  }
</script>
