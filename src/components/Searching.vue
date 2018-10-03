<template>
    <div class="flex search-div">
        <div class="controls">
            <div class="search-bar-label"></div>
            <input v-model="config.term" :placeholder="config.placeholder"/>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../sass/styles";

    .search-div {
      border-bottom: 1px solid $gray-4;
        .controls {
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

