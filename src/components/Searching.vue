<template>
  <div class="search-div">
    <div>
      <input
        v-model="config.term"
        :placeholder="config.placeholder" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search-div {
    border-bottom: 1px solid var(--primary);

    div {
      padding: var(--padding);

      input, input:focus {
        color: var(--primary-text);
        border: 1px solid var(--primary);
      }

      input::placeholder {
        color: var(--primary);
      }
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
