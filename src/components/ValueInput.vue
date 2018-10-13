<template>
  <div>
    <span>
      {{ label }}
    </span>
    <div class="value-input">
      <input
        type="text"
        ref="inputBox"
        :target="target"
        :value="value"
        @input="handleInput" />
      <clear-button
        v-if="value"
        @click="clear">
      </clear-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: calc(var(--padding) * 0.8);
      margin: var(--padding) 0 calc(var(--padding) / 2) 0;
    }

    div.value-input {
      flex-direction: row;

      input, input:focus {
        border: 1px solid var(--primary);
      }
    }
  }
</style>

<script>
  import ClearButton from './ClearButton.vue'

  export default {
    components: {
      ClearButton
    },
    methods: {
      clear() {
        this.$emit('input', '', this.target)
        this.$refs.inputBox.focus()
      },
      handleInput(e) {
        this.$emit('input', e.target.value, this.target)
      }
    },
    props: {
      value: {
        type: String
      },
      target: {
        type: String
      },
      label: {
        type: String
      }
    }
  }
</script>

