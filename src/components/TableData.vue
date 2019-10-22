<template>
  <div
    v-if="field.type === 'image'"
    :class="field.field"
    style="flex-grow: 0">
    <avatar-or-initials
      class="item-avatar"
      :size="this.$theme.rowHeight.slice(0, -2) * 0.66"
      :image="getProperty(data, field.image)"
      :title="getProperty(data, field.field)">
    </avatar-or-initials>
  </div>
  <div
    v-else-if="field.type === 'text'"
    :class="field.field">
    {{ getProperty(data, field.field) }}
  </div>
  <div
    v-else-if="field.type === 'count'"
    :class="field.field">
    {{ count(getProperty(data, field.field))}}
  </div>
  <div
    v-else-if="field.type === 'boolean'"
    :class="field.field">
    <template
      v-if="field.yes">
      {{ getProperty(data, field.field) ? field.yes : field.no }}
    </template>
    <template
      v-else>
      <div
        v-if="getProperty(data, field.field)"
        :style="`background-image: ${ this.$assets.checkmark }; background-repeat: no-repeat; width: 20px; height: 20px;`"
        width="20px"
        height="20px">
      </div>
      <div
        v-else
        :style="`background-image: ${ this.$assets.crossmark }; background-repeat: no-repeat; width: 20px; height: 20px;`"
        width="20px"
        height="20px">
      </div>
    </template>
  </div>
  <div
    v-else-if="field.type === 'boolean-inverted'"
    :class="field.field">
    <div
      v-if="getProperty(data, field.field)"
      :style="`background-image: ${ this.$assets.crossmark }; background-repeat: no-repeat; width: 20px; height: 20px;`"
      width="20px"
      height="20px">
    </div>
    <div
      v-else
      :style="`background-image: ${ this.$assets.checkmark }; background-repeat: no-repeat; width: 20px; height: 20px;`"
      width="20px"
      height="20px">
    </div>
  </div>
  <div
    v-else-if="field.type === 'third_party'"
    :class="field.field">
    <span v-if="getProperty(data, field.field)">
      Third Party
    </span>
    <span v-else>
      First Party
    </span>
  </div>
  <div
    v-else-if="field.type === 'property'"
    :class="field.field">
    {{ field.symbol ? field.symbol : '' }} {{ getProperty(data, field.field) }}
  </div>
  <div
    v-else-if="field.type === 'component'"
    :class="field.field"
    style="flex-grow: 0">
    <component
      :is="getComponentName()"
      v-bind="getProps()"
      v-on="getComponentEvents()">
    </component>
  </div>
  <div
    v-else-if="field.type === 'currency'"
    :class="field.field">
    {{ formatAsCurrency(getProperty(data, field.field), field.symbol) }}
  </div>
  <div
    v-else-if="field.type === 'datetime'"
    :class="field.field">
    <span class="year">
      {{formatDate(getProperty(data, field.field)).year}}
    </span>
    <span class="delimiter">,</span>
    <span class="time">
      {{formatDate(getProperty(data, field.field)).time}}
    </span>
  </div>
  <div
    v-else-if="field.type === 'date'"
    :class="field.field">
    <span class="year">
      {{formatDate(getProperty(data, field.field)).year}}
    </span>
  </div>
  <div
    v-else-if="field.type === 'time'"
    :class="field.field">
    <span class="year">
      {{formatDate(getProperty(data, field.field)).time}}
    </span>
  </div>
  <div
    v-else-if="field.type === 'custom'"
    :class="field.field"
    v-html="getCustomContent()">
  </div>
</template>

<style lang="scss" scoped>
  div {
    font-size: var(--fontSize);
    color: var(--primaryText);

    &.image {
      min-width: 58px;
    }
  }

  .year, .time {
    display: inline-block;
  }

  .time {
    margin-left: 10px;
  }

  @media only screen and (max-width: 600px) {
    .datetime {
      .time, .delimiter {
        display: none;
      }
    }
  }
</style>

<script>
  import AvatarOrInitials from '@unicorns/avatars'
  import moment from 'moment'

  export default {
    components: {
      AvatarOrInitials
    },
    props: ['field', 'data'],
    methods: {
      getProperty (data, field) {
        if (!field) {
          return null
        }
        let path = field.split('.')
        let value = data

        path.forEach(function (prop) {
          let index = parseInt(prop)

          if (isNaN(index)) {
            value = value[prop]
          } else {
            value = value[index]
          }
        })

        if (typeof value === 'number') {
          return value.toLocaleString(undefined, {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        }

        return value
      },
      count (field) {
        return field.length
      },
      getProps () {
        if (this.field.requireProps.propsFromData.enabled) {
          const propFields = this.field.requireProps.propsFromData.propFields
          const props = {}
          propFields.forEach((propField) => {
            const key = Object.keys(propField)
            const value = propField[key[0]]
            props[key] = this.data[value]
          })

          return props
        }

        return this.field.requireProps.defaultProps || {}
      },
      getComponentName () {
        if (typeof this.field.component === 'function') {
          return this.field.component(this.data)
        }

        return this.field.component
      },
      getComponentEvents () {
        return this.field.events || {}
      },
      getCustomContent () {
        if (!this.field.value) {
          return ''
        }

        if (typeof this.field.value === 'function') {
          return this.field.value(this.data)
        }

        return this.field.value
      },
      formatDate (date) {
        const year = moment(date).format('YYYY-MM-DD')
        const time = moment(date).format('LT')

        return {
          year,
          time
        }
      },
      formatAsCurrency(value, symbol = 'R', decimals = 2) {
        value = Number.parseFloat(value)

        if (Number.isNaN(value)) {
          value = 0
        }

        return symbol + String.fromCharCode(160) + value.toLocaleString(undefined, {
          style: 'decimal',
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        })
      }
    }
  }
</script>
