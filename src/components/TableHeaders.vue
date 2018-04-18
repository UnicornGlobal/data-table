<template>
    <div class="header-bar border-top">
        <div class="headers">
            <div v-for="(field) in fields" v-if="field.header" class="header-cell" :style="styler(field)"
                 :secondary="field.secondary === true" @click="sort(field)">
                <div>
                    {{ field.name }}
                </div>
                <div v-if="field.field === config.sorting.field">
                    <b v-if="config.sorting.ascending">
                        <arrow-down></arrow-down>
                    </b>
                    <b v-else>
                        <arrow-up></arrow-up>
                    </b>
                </div>
                <div class="arrow-spacer" v-else></div>
            </div>
            <div v-else class="empty-header-cell" :style="styler(field)" :secondary="field.secondary"></div>
            <div v-if="controls && controls.length" class="header-cell" :secondary="false" style="flex: 1 1 0%">
                <div>
                    Options
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../sass/styles";

    .header-bar {
        min-width: 100%;
        right: 0;
        left: 0;

        @media (max-width: 480px) {
            padding: 1em 0;
        }
    }

    .arrow-spacer {
        width: 20px;
    }

    .headers {
        display: flex;
        justify-content: space-between;
        border-bottom: 3px solid $tabbs-gray-4;
        background-color: $white;
        min-height: 55px;
        padding-left: 1em;

        @media(max-width: 480px) {
            padding-right: 7px;
            padding-left: 0.5em;
            min-height: 55px;
        }

        .header-cell {
            display: flex;

            div {
                font-family: 'NunitoSans-Bold';
                align-self: center;
                color: $black;
                display: flex;

                b {
                    color: $black;
                }
            }

            svg {
                padding-left: 2px;
                margin-left: 5px;
                margin-top: 8px;
                height: 20px;
                width: 15px;
                fill: #6C758C;
            }
        }

        .header-cell:last-child {
            margin-left: 1em;
            justify-content: flex-end;
        }
    }
</style>

<script>
  import ArrowUp from './Icons/arrow-up.svg'
  import ArrowDown from './Icons/arrow-down.svg'

  export default {
    components: {
      ArrowUp,
      ArrowDown
    },
    props: {
      config: {
        type: Object,
        required: true
      },
      fields: {
        type: Array,
        required: true
      },
      styler: {
        type: Function,
        required: true
      },
      controls: {
        type: Array,
        required: false
      }
    },
    methods: {
      sort(field) {
        if (this.config.sorting.field === field.field) {
          this.config.sorting.ascending = !this.config.sorting.ascending
        }

        this.config.sorting.field = field.field
      }
    }
  }
</script>

