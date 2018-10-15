<template>
  <div>
    <close-button @close="$emit('close')"></close-button>
    <value-input
      label="Amount from:"
      ref="from"
      target="from"
      :value="filter.from"
      @input="handleInput">
    </value-input>
    <value-input
      label="Amount to:"
      ref="to"
      target="to"
      :value="filter.to"
      @input="handleInput">
    </value-input>
  </div>
</template>

<script>
  import CloseButton from './CloseButton.vue'
  import ValueInput from './ValueInput.vue'

  export default {
    props: {
      filter: {
        type: Object,
        required: true
      }
    },
    components: {
      CloseButton,
      ValueInput
    },
    mounted() {
      this.$refs.from.$refs.inputBox.focus()
    },
    methods: {
      handleInput(value, target) {
        this.filter[target] = value
        this.$parent.$forceUpdate()
        this.$forceUpdate()
      }
    }
  }
</script>
