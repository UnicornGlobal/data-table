<template>
  <div>
    <close-button
      class="close-tab"
      @click="closeFilter">
    </close-button>
    <span>
      Amount from:
    </span>
    <div class="value-input">
      <input
        type="text"
        v-model="filter.from"
        ref="amountFrom" />
      <button
        tabindex="-1"
        @click="clearAmountFrom">
        <!-- <close&#45;button></close&#45;button> -->
      </button>
    </div>
    <span>
      Amount to:
    </span>
    <div class="value-input">
      <input
        type="text"
        v-model="filter.to"
        ref="amountTo" />
      <button
        tabindex="-1"
        @click="clearAmountTo">
        <!-- <close&#45;button></close&#45;button> -->
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  // Label from / to
  span {
    margin-bottom: 0.3em;
  }

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

  export default {
    props: {
      filter: {
        type: Object,
        required: true
      }
    },
    components: {
      CloseButton
    },
    methods: {
      closeFilter() {
        this.$emit('close')
      },
      clearAmountFrom() {
        this.$refs.amountFrom.value = null
        this.$refs.amountFrom.dispatchEvent(new Event('input', {
          'bubbles': true
        }))
      },
      clearAmountTo() {
        this.$refs.amountTo.value = null
        this.$refs.amountTo.dispatchEvent(new Event('input', {
          'bubbles': true
        }))
      }
    }
  }
</script>
