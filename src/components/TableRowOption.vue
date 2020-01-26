<template>
    <router-link v-if="config.type === 'link'"
                 :class="config.class"
                 :style="config.style"
                 :to="href"
                 @click.native="handleClick($event)"
    >
        {{config.label}}
    </router-link>
    <component
            v-else-if="config.type === 'component'"
            v-bind="componentProps"
            v-on="componentEvents"
            :is="componentName"
            :style="config.style">
    </component>
</template>

<script>
  export default {
    props: ['config', 'data'],
    computed: {
      href () {
        if (typeof this.config.href === 'function') {
          return this.config.href(this.data)
        }
        return this.config.href
      },
      componentName () {
        if (typeof this.config.component === 'function') {
          return this.config.component(this.data)
        }

        return this.config.component
      },
      componentProps () {
        if (typeof this.config.props === 'function') {
          return this.config.props(this.data)
        }

        if (typeof this.config.props === 'object') {
          return this.config.props
        }

        return {}
      },
      componentEvents () {
        return this.config.events || {}
      }
    },
    methods: {
      handleClick (event) {
        if (this.config.onClick) {
          this.config.onClick(this.data, event)
        }
      }
    }
  }
</script>
