<template>
    <div v-if="config.type == 'link'">
        <router-link :to="config.href(data)" :class="config.class" :style="config.style">
            {{config.label}}
        </router-link>
    </div>
    <component v-else-if="config.type == 'component'" :is="componentName" v-bind="componentProps"
               v-on="componentEvents" :style="config.style">
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
