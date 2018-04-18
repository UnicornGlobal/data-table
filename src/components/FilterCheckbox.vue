<template>
    <div>
        <label :for="'filter-' + filter.field" class="filter-label-checkbox">
            <input type="checkbox"
                   :id="'filter-' + filter.field"
                   v-model="filter.value"
                   class="filter-checkbox"/>
            {{ filter.text }}
        </label>
    </div>
</template>

<style lang="scss" scoped>
    @import "../sass/styles";

    .filter-checkbox {
        appearance: none;
        background-color: $tabbs-gray-5;
        border: 1px solid $tabbs-gray-4;
        display: inline-block;
        position: relative;
        padding: 7px;
        top: 0.25rem;
        margin-left: 0;
    }

    .filter-checkbox:focus {
        outline: rgba(41, 98, 255, 0.3) solid 2px;
        outline-offset: 1px;
    }

    .filter-checkbox:checked {
        border: 1px solid $tabbs-blue;
        background-color: $white;
        background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20d%3D%22M173.898%20439.404l-166.4-166.4c-9.997-9.997-9.997-26.206%200-36.204l36.203-36.204c9.997-9.998%2026.207-9.998%2036.204%200L192%20312.69%20432.095%2072.596c9.997-9.997%2026.207-9.997%2036.204%200l36.203%2036.204c9.997%209.997%209.997%2026.206%200%2036.204l-294.4%20294.401c-9.998%209.997-26.207%209.997-36.204-.001z%22%20fill%3D%22blue%22/%3E%3C/svg%3E);
    }

    .filter-checkbox:checked:after {
        position: absolute;
        top: 0;
        padding: 0;
    }

    .filter-label-checkbox {
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

