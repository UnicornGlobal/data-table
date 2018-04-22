<template>
    <div class="amount-form-picker flex">
        <div @click="closeFilter" class="close-tab">x</div>
        <span class="custom-form-label">Amount from: </span>
        <div class="value-input">
            <input type="text" v-model="filter.from" ref="amountFrom">
            <button tabindex="-1" @click="clearAmountFrom">x</button>
        </div>
        <span class="custom-form-label">Amount to:</span>
        <div class="value-input">
            <input type="text" v-model="filter.to" ref="amountTo">
            <button tabindex="-1" @click="clearAmountTo">x</button>
        </div>
    </div>

</template>

<style lang="scss">
    @import "../sass/styles";

    .close-tab {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0.5em 1em;
    }

    .value-input {
        display: flex;
        flex-direction: row;
        margin-bottom: 1em;
    }
</style>

<script>
  export default {
    props: {
      filter: {
        type: Object,
        required: true
      }
    },
    methods: {
      closeFilter() {
        this.$emit('close')
      },
      clearAmountFrom() {
        this.$refs.amountFrom.value = null
        this.$refs.amountFrom.dispatchEvent(new Event('input', {'bubbles': true}))
      },
      clearAmountTo() {
        this.$refs.amountTo.value = null
        this.$refs.amountTo.dispatchEvent(new Event('input', {'bubbles': true}))
      }
    }
  }
</script>
