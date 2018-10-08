<template>
    <div class="header-bar__udt">
        <div class="headers__udt">
            <div v-for="(field) in fields" v-if="field.header" class="header-cell__udt" :style="styler(field)"
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
                <div class="arrow-spacer__udt" v-else></div>
            </div>
            <div v-else class="empty-header-cell__udt" :style="styler(field)" :secondary="field.secondary"><div class="empty-header-cell-inner__udt"></div></div>
            <div v-if="controls && controls.length" class="header-cell__udt" :secondary="false" style="flex: 1 1 0%">
                <div>
                    Options
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
  .header-bar__udt {
    min-width: 100%;
    right: 0;
    left: 0;

    @media (max-width: 480px) {
      padding: 1em 0;
    }
  }

  .arrow-spacer__udt {
    width: 20px;
  }

  .headers__udt {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid rgb(216, 218, 225);
    background-color: rgb(255, 255, 255);
    min-height: 55px;
    padding: 0 1em;

    @media(max-width: 480px) {
      padding-right: 7px;
      padding-left: 0.5em;
      min-height: 55px;
    }

    .header-cell__udt {
      padding: 0px 3px;
      display: flex;

      div {
        align-self: center;
        color: rgb(0, 0, 0);
        display: flex;

        b {
          color: rgb(0, 0, 0);
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

    .header-cell__udt:last-child {
      justify-content: flex-end;

      .arrow-spacer__udt {
        display: none;
      }
    }

    .empty-header-cell-inner__udt {
      width: 35px;
    }

    .empty-header-cell__udt {
      padding: 0 3px;
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

