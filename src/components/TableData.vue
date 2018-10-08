<template>
    <div v-if="field.type === 'image'" class="field-contents" :class="field.field" style="flex-grow: 0">
        <avatar-or-initials class="item-avatar"
                            round
                            size="35"
                            :image="getProperty(data, field.image)"
                            :title="data[field.field]">
        </avatar-or-initials>
    </div>
    <div v-else-if="field.type === 'text'" class="field-contents" :class="field.field">{{ getProperty(data, field.field)
        }}
    </div>
    <div v-else-if="field.type === 'count'" class="field-contents" :class="field.field">
        {{ count(getProperty(data, field.field))}}
    </div>
    <div v-else-if="field.type === 'boolean'" class="field-contents" :class="field.field">
        <template v-if="field.yes">
            {{ getProperty(data, field.field) ? field.yes : field.no }}
        </template>
        <template v-else>
            <check-mark v-if="getProperty(data, field.field)" width="20px" height="20px"></check-mark>
            <close-button width="20px" height="20px" v-else></close-button>
        </template>
    </div>
    <div v-else-if="field.type === 'boolean-inverted'" class="field-contents" :class="field.field">
        <check-mark-inverted v-if="getProperty(data, field.field)" width="20px" height="20px"></check-mark-inverted>
        <close-button-inverted width="20px" height="20px" v-else></close-button-inverted>
    </div>
    <div v-else-if="field.type === 'third_party'" class="field-contents" :class="field.field">
        <span v-if="getProperty(data, field.field)">Third Party</span>
        <span v-else>First Party</span>
    </div>
    <div v-else-if="field.type === 'property'" class="field-contents" :class="field.field">
        {{ field.symbol ? field.symbol : '' }} {{ getProperty(data, field.field) }}
    </div>
    <div v-else-if="field.type === 'component'" class="field-contents" :class="field.field" style="flex-grow: 0">
        <component :is="getComponentName()" v-bind="getProps()" v-on="getComponentEvents()"></component>
    </div>
    <div v-else-if="field.type === 'currency'" class="field-contents" :class="field.field">
        {{ formatAsCurrency(getProperty(data, field.field), field.symbol) }}
    </div>
    <div v-else-if="field.type === 'datetime'" class="field-contents datetime" :class="field.field">
        <span class="year_udt">{{formatDate(getProperty(data, field.field)).year}}</span>
        <span class="delimiter">,</span>
        <span class="time">{{formatDate(getProperty(data, field.field)).time}}</span>
    </div>
    <div v-else-if="field.type === 'date'" class="field-contents" :class="field.field">
        <span class="year">{{formatDate(getProperty(data, field.field)).year}}</span>
    </div>
    <div v-else-if="field.type === 'time'" class="field-contents" :class="field.field">
        <span class="year">{{formatDate(getProperty(data, field.field)).time}}</span>
    </div>
    <div v-else-if="field.type === 'custom'" v-html="getCustomContent()" class="field-contents" :class="field.field"></div>
</template>
<style lang="scss">
  .field-contents {
    font-size: .9em;
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
  import AvatarOrInitials from 'vue-avatar-or-initials'
  import CheckMark from './Icons/check.svg'
  import CheckMarkInverted from './Icons/check-inverted.svg'
  import CloseButton from './Icons/close-button.svg'
  import CloseButtonInverted from './Icons/close-button-inverted.svg'
  import moment from 'moment'

  export default {
    components: {
      AvatarOrInitials,
      CheckMark,
      CloseButton,
      CheckMarkInverted,
      CloseButtonInverted
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
          return value.toLocaleString(undefined, {style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2})
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

        return symbol + String.fromCharCode(160) + value.toLocaleString(undefined, {style: 'decimal', minimumFractionDigits: decimals, maximumFractionDigits: decimals})
      }
    }
  }
</script>
