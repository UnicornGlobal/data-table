<template>
    <div class="dropdown-box__udt" v-if="filter.type === 'dropdown'">
        <label :for="'filter-' + filter.filter" class="label-filter__udt">
            {{ filter.text }}
        </label>
        <select v-model="filter.value" :name="`${filter.filter}`" class="select__udt">
            <option value="">{{ filter.placeholder }}</option>
            <option v-for="each in options" :value="value(each)">{{label(each)}}</option>
        </select>
    </div>
</template>

<style lang="scss">
  .dropdown-box__udt {
    display: flex;
    align-items: center;
  }

  .label-filter__udt {
    margin-right: 0.7em;
    font-size: .9rem;
  }

  .select__udt {
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    padding: 0 0 0 10px;
    background-size: 15px 13px;
    background-repeat: no-repeat;
    background-origin: content-box;
    background-position: right 10px center;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAflBMVEUAAAAvZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/svZ/tg0db9AAAAKXRSTlMAAQUKDhIUFRgcHR4gJCcoNU5WV11eX2FiaH6FlJ63yszP1+bp8ff5/R3tDSEAAAFCSURBVGje7c3HUgNBFENRgcE2Occmwxj0/z/IZso1oaeng3rjenephQ5gWZZlWdYut7h+XIsvz56u9nvD+YbkjdR4Jvmz6gwXfyTJW6HhSJLNamgoFdc+NsuhoVPc9rFVOoZKcZ3HZglg3TU0ius9NgvgnRQrbvD4gj1SrAwNfgNfYmVk8BU4pVQZG5sDAJdKxWMcAX7lTm0IlYAhU4KGSJkxJMqsIVAijGIlyihUIo0iJdrwKvdqI1tJMjKVRCNLSTYylAwjWckyEpVMI0nJNhKUAiNaKTK8yoPaiFKKjQhFYMwqHuMY0CoiI6jIjIAiNCYVqTGhiA2v8qk2vIrciFAExqwiMWYUkRFUflVGQBEak4rUmFDEhleRGx6lgjFSqhgDpZLRU6oZHaWisVWqGq1S2QBOPvh2CMuyLMuyrF3qHzdJFFyfRs27AAAAAElFTkSuQmCC);
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
    },
    methods: {
      value (option) {
        if (typeof option === 'object') {
          return option.value
        }
        return option
      },
      label (option) {
        if (typeof option === 'object') {
          return option.label
        }
        return option
      }
    }

  }
</script>
