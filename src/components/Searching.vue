<template>
  <div class="search-div">
    <div>
      <input v-model="config.term" :placeholder="config.placeholder" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search-div {
    border-bottom: 1px solid rgb(216, 218, 225);

    div {
      padding: 1em 0.75em;
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
