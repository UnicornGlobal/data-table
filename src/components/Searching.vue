<template>
  <div>
    <input
      v-model="config.term"
      :placeholder="config.placeholder" />
  </div>
</template>

<style lang="scss" scoped>
  div {
    padding: var(--padding);

    input {
      color: var(--primaryText);
      border: 1px solid var(--primary);
      width: 100%;
      height: calc(var(--padding) * 3);
      padding: 0 calc(var(--padding) / 2);
    }

    input:focus {
      outline: var(--primary) auto 5px;
    }

    input::placeholder {
      color: var(--primary);
    }
  }
</style>

<script>
  export default {
    props: {
      config: {
        type: Object,
        required: true
      }
    }
  }
</script>
