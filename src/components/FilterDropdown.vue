<template>
    <div class="dropdown-box" v-if="filter.type === 'dropdown'">
        <label :for="'filter-' + filter.filter" class="filter-label-checkbox">
            {{ filter.text }}
        </label>
        <select v-model="filter.value" :name="`${filter.filter}`">
            <option value="">{{ filter.placeholder }}</option>
            <option v-for="each in options" :value="each">{{each}}</option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
    @import "../sass/styles";

    .dropdown-box {
        display: flex;
        align-items: center;
    }

    label {
        margin-right: 0.7em;
        font-size: .9rem;
    }
</style>

<script>
  export default {
    props: {
      filter: {
        type: Object,
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    }
  }
</script>
