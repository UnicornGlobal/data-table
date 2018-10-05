<template>
    <div>
        <button @click="closeFilter" class="close-tab__udt"><close-button></close-button></button>
        <span class="custom-form-label__udt">Amount from:</span>
        <div class="value-input__udt">
            <input type="text" v-model="filter.from" ref="amountFrom">
            <button tabindex="-1" @click="clearAmountFrom" class="button__udt"><close-button></close-button></button>
        </div>
        <span class="custom-form-label__udt">Amount to:</span>
        <div class="value-input__udt">
            <input type="text" v-model="filter.to" ref="amountTo">
            <button tabindex="-1" @click="clearAmountTo" class="button__udt"><close-button></close-button></button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .custom-form-label__udt {
      margin-bottom: 0.3em;
    }

    .close-tab__udt {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0;
      margin: 0;
      height: 30px;
      width: 30px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      svg {
        height: 22px;
        width: 22px;
      }
    }

    .value-input__udt {
      display: flex;
      flex-direction: row;
      margin-bottom: 1em;
    }

    .button__udt {
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
</style>

<script>
  import CloseButton from './Icons/close-button.svg'

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
        this.$refs.amountFrom.dispatchEvent(new Event('input', {'bubbles': true}))
      },
      clearAmountTo() {
        this.$refs.amountTo.value = null
        this.$refs.amountTo.dispatchEvent(new Event('input', {'bubbles': true}))
      }
    }
  }
</script>
