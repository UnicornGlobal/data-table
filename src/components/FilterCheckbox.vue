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
    margin-left: 5px;
    margin-top: 1px;
    flex-basis: 200px;
    font-size: .9rem;
  }

  input[type=checkbox] {
    border: 1px solid var(--primary);
    background-color: white;
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
        return `background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20d%3D%22M173.898%20439.404l-166.4-166.4c-9.997-9.997-9.997-26.206%200-36.204l36.203-36.204c9.997-9.998%2026.207-9.998%2036.204%200L192%20312.69%20432.095%2072.596c9.997-9.997%2026.207-9.997%2036.204%200l36.203%2036.204c9.997%209.997%209.997%2026.206%200%2036.204l-294.4%20294.401c-9.998%209.997-26.207%209.997-36.204-.001z%22%20fill%3D%22${this.$theme.primary}%22/%3E%3C/svg%3E)`
      }
    }
  }
</script>
