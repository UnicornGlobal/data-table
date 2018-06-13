<template>
    <div v-if="field.type === 'image'" class="field-contents" :class="field.field" style="flex-grow: 0">
        <avatar-or-initials class="item-avatar"
                            round
                            size="35"
                            :image="data[field.image]"
                            :title="data[field.field]">
        </avatar-or-initials>
    </div>
    <div v-else-if="field.type === 'text'" class="field-contents" :class="field.field">{{ data[field.field] }}</div>
    <div v-else-if="field.type === 'count'" class="field-contents" :class="field.field">{{ count(data[field.field])}}
    </div>
    <div v-else-if="field.type === 'boolean'" class="field-contents" :class="field.field">
        <template v-if="field.yes">
            {{ data[field.field] ? field.yes : field.no }}
        </template>
        <template v-else>
            <check-mark v-if="data[field.field]" width="20px" height="20px"></check-mark>
            <close-button width="20px" height="20px" v-else></close-button>
        </template>
    </div>
    <div v-else-if="field.type === 'boolean-inverted'" class="field-contents" :class="field.field">
        <check-mark-inverted v-if="data[field.field]" width="20px" height="20px"></check-mark-inverted>
        <close-button-inverted width="20px" height="20px" v-else></close-button-inverted>
    </div>
    <div v-else-if="field.type === 'property'" class="field-contents" :class="field.field">
        {{ field.symbol ? field.symbol : '' }} {{ getProperty(data, field.field) }}
    </div>
    <div v-else-if="field.type === 'component'" class="field-contents" :class="field.field" style="flex-grow: 0">
        <component :is="getComponentName()" v-bind="getProps()" v-on="getComponentEvents()"></component>
    </div>
    <div v-else-if="field.type === 'currency'" class="field-contents" :class="field.field">
        {{ `${field.symbol} ${getSumTotal(data, field)}` }}
    </div>
    <div v-else-if="field.type === 'datetime'" class="field-contents datetime" :class="field.field">
        <span class="year">{{formatDate(data[field.field]).date}}</span>
        <span class="delimiter">,</span>
        <span class="time">{{formatDate(data[field.field]).time}}</span>
    </div>
    <div v-else-if="field.type === 'date'" class="field-contents" :class="field.field">
        <span class="year">{{formatDate(data[field.field]).date}}</span>
    </div>
    <div v-else-if="field.type === 'time'" class="field-contents" :class="field.field">
        <span class="year">{{formatDate(data[field.field]).time}}</span>
    </div>
    <div v-else-if="field.type === 'custom'" v-html="getCustomContent()" class="field-contents"
         :class="field.field"></div>
</template>
<style lang="scss">
    @import "../sass/styles";

    .field-contents {
        font-size: .9em;
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
      CheckMark,
      CloseButton,
      AvatarOrInitials,
      CheckMarkInverted,
      CloseButtonInverted
    },
    props: ['field', 'data'],
    methods: {
      getProperty(data, field) {
        let pieces = field.split('.')
        let fieldVal = data[pieces[0]][pieces[1]]
        if (typeof (fieldVal) === 'number') {
          let num = fieldVal.toFixed(2)
          let parts = num.toString().split('.')
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          return parts.join('.')
        }
        return fieldVal
      },
      count(field) {
        return field.length
      },
      getSumTotal(data, field) {
        const format = amount => parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        let value = data[field.field]
        if (value) {
          return format(value)
        }
        return 0
      },
      getProps() {
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
      getComponentName() {
        if (typeof this.field.component === 'function') {
          return this.field.component(this.data)
        }

        return this.field.component
      },
      getComponentEvents() {
        return this.field.events || {}
      },
      getCustomContent() {
        if (!this.field.value) {
          return ''
        }

        if (typeof this.field.value === 'function') {
          return this.field.value(this.data)
        }
        return this.field.value
      },
      formatDate(input) {
        const date = moment(input).format('YYYY-MM-DD')
        const time = moment(input).format('LT')
        return {
          date,
          time
        }
      }
    }
  }
</script>
