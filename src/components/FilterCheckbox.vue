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
    font-size: .9em;
  }
  input[type=checkbox] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: white;
    background-image: none;
    border: 1px solid var(--primary);
    display: inline-block;
    position: relative;
    padding: 7px !important;
    top: 0.25rem;
    cursor: pointer;

    &:focus {
      border: 1px solid var(--primary);
      outline-offset: 1px;
    }

    &:checked {
      outline: 1px solid var(--primary);
      background-color: white;
      outline-offset: 1;

      &:after {
        position: absolute;
        top: 0;
        left: 3px;
        padding: 0;
      }
    }
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
