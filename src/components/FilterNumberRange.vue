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

<style lang="scss" scoped>
  .value-input {
    display: flex;
    flex-direction: row;
    margin-bottom: 1em;

    button {
      border: 0;
      background-color: white;
      padding: 0;
      margin: 0;
      height: 38px;
      width: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;

      svg {
        height: 20px;
        width: 20px;
      }
    }

    input, input:focus {
      border: 1px solid var(--primary);
    }
  }
</style>

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
