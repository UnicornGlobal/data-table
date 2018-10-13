<template>
  <div>
    <label
      :for="'filter-' + filter.field">
      <input
        type="checkbox"
        :style="filter.value ? checkboxStyle : ''"
        :id="'filter-' + filter.field"
        v-model="filter.value" />
      {{ filter.text }}
    </label>
  </div>
</template>

<style scoped lang="scss">
  label {
    cursor: pointer;
    margin-left: 5px;
    margin-top: 1px;
    flex-basis: 200px;
    font-size: .9rem;
  }

  input[type=checkbox] {
    cursor: pointer;
    border: 1px solid var(--primary);
    background-color: white;
    background-image: none;
  }

  input[type=checkbox]:checked {
    border: 1px solid var(--primary);
  }

  input[type=checkbox]:focus {
    outline: 1px solid var(--primary);
    outline-offset: 0;
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
    computed: {
      checkboxStyle() {
        return `background-image: ${this.$assets.checkbox};`
      }
    }
  }
</script>
