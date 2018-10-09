<template>
  <div>
    <label :for="'filter-' + filter.field">
      <input type="checkbox"
             :id="'filter-' + filter.field"
             v-model="filter.value" />
      {{ filter.text }}
    </label>
  </div>
</template>

<style scoped>
  label {
    margin-left: 5px;
    margin-top: 1px;
    flex-basis: 200px;
    font-size: .9rem;
  }
</style>

<script>
  export default {
    props: {
      filter: {
        type: Object,
        required: true
      }
    }
  }
</script>
