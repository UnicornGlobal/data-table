<template>
  <div class="header-bar">
    <div class="headers">
      <div
        v-if="field.header"
        v-for="(field) in fields"
        class="header-cell"
        :style="styler(field)"
        :secondary="field.secondary === true"
        @click="sort(field)">
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
        <div v-else class="arrow-spacer"></div>
      </div>
      <div
        v-else
        class="empty-header-cell"
        :style="styler(field)"
        :secondary="field.secondary">
        <div></div>
      </div>
      <div
        v-if="controls && controls.length"
        class="header-cell"
        :secondary="false"
        style="styler(field)">
        <div>
          {{ config && config.headers && config.headers.optionsHeader ? 'Options' : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .header-bar {
    min-width: 100%;
    right: 0;
    left: 0;
    background-color: var(--headers);

    @media (max-width: 480px) {
      padding: var(--padding) 0;
    }

    .headers {
      display: flex;
      justify-content: space-between;
      border-bottom: var(--divider);
      min-height: var(--rowHeight);
      padding-right: 20px;
      padding-left: 20px;

      @media(max-width: 480px) {
        padding-right: 7px;
        min-height: var(--rowHeight);
      }

      @media(max-width: 680px) {
        padding-left: 7px !important;
      }

      .header-cell {
        padding: 0px 3px;
        display: flex;

        div {
          align-self: center;
          color: var(--secondaryText);
          display: flex;
          font-family: var(--headerFont);
          font-size: 14px;
          font-weight: bold;

          b {
            color: var(--seondaryText);
          }
        }

        svg {
          padding-left: 2px;
          margin-left: 5px;
          margin-top: 8px;
          height: 20px;
          width: 15px;
          fill: var(--secondaryText);
        }

        .arrow-spacer {
          width: 20px;
        }
      }

      .header-cell:first-child {
        justify-content: flex-start;

        .arrow-spacer {
          display: none;
        }
      }

      .header-cell:last-child {
        justify-content: flex-end;

        .arrow-spacer {
          display: none;
        }
      }

      .empty-header-cell[secondary="true"] {
        @media(max-width: 1023px) {
          display: none !important;
        }
      }

      .header-cell[secondary="true"] {
        @media(max-width: 1023px) {
          display: none !important;
        }
      }

      .empty-header-cell {
        padding: 0 3px;

        div {
          width: 35px;
        }
      }
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
        // Allow custom field sort configuration
        if (field.sort) {
          field.field = field.sort
        }

        if (this.config.sorting.field === field.field) {
          this.config.sorting.ascending = !this.config.sorting.ascending
        }

        this.config.sorting.field = field.field
      }
    }
  }
</script>
