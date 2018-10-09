<template>
  <div v-if="config.type == 'link'">
    <router-link
      :class="config.class"
      :style="config.style"
      :to="config.href(data)">
      {{config.label}}
    </router-link>
  </div>
  <component
    v-else-if="config.type == 'component'"
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
      componentName() {
        if (typeof this.config.component === 'function') {
          return this.config.component(this.data)
        }

        return this.config.component
      },
      componentProps() {
        if (typeof this.config.props === 'function') {
          return this.config.props(this.data)
        }

        if (typeof this.config.props === 'object') {
          return this.config.props
        }

        return {}
      },
      componentEvents() {
        return this.config.events || {}
      }
    }
  }
</script>
