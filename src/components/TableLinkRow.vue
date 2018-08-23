<template>
    <router-link v-if="!smallScreen" :to="link(data)" class="list-row">
        <div v-for="(field, index) in fields" class="list-row-field" :style="styler(field)"
             :secondary="field.secondary === true">
            <table-data :data="data" :field="field"></table-data>
        </div>
    </router-link>
    <router-link v-else :to="link(data)" style="text-decoration: none">
        <div v-if="mobileType === 'withImage'" class="mobile-screen">
            <div v-if="imageField" class="thumbnail">
                <div class="list-row-field">
                    <table-data v-if="imageField" :data="data" :field="imageField"></table-data>
                </div>
            </div>
            <div class="rest">
                <div v-for="(field, index) in filteredFields" class="list-row-field" :style="styler(field)"
                    :secondary="field.secondary === true">
                    <table-data v-if="field.field !== 'image' && !field.displayRightOnMobile" :data="data" :field="field"></table-data>
                </div>
            </div>
            <div v-if="displayRight" class="mobile-right">
                <div :style="getStyle(displayRight, data)" class="list-row-field">
                    <table-data v-if="displayRight" :data="data" :field="displayRight"></table-data>
                </div>
            </div>
        </div>
        <div v-else-if="mobileType === 'scroll'" class="mobile-scroll" :style="`display: grid; grid-template-columns: 100px ${fields.length - 1}fr;`">
            <div class="first-child">
                <div class="list-row-field" :style="styler(firstChild)" style="white-space: nowrap">
                    <table-data :data="data" :field="firstChild"></table-data>
                </div>
            </div>
            <div class="remaining-data" :style="`display: grid; grid-template-columns: repeat(${fields.length - 1}, 1fr); overflow: auto;`">
                <div v-for="(field, index) in rest" class="list-row-field" style="white-space: nowrap"
                    :secondary="field.secondary === true">
                    <table-data :data="data" :field="field"></table-data>
                </div>
            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
    @import "../sass/styles";

    div[secondary="true"] {
        @media(max-width: 1023px) {
            display: none !important;
        }
    }

    .list-row {
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid $gray-4;
        height: 55px;
        color: $black;

        &:hover {
            background-color: #f7f8f9;
        }

        @media(max-width: 480px) {
            height: 65px;
            padding-left: 0.5em;
        }

        .list-row-field {
            flex: 1;
            padding-left: 5px;
            padding-right: 5px;
        }

        .list-row-field:first-child {
            flex: 0;
        }

        .list-row-field:last-child {
            padding-right: 0.5em;

            @media(max-width: 1023px) and (min-width: 481px) {
                padding-right: 20px;
            }

            @media(max-width: 480px) {
                padding-right: 20px;
            }

            div {
                text-align: right;
            }
        }
    }

    .list-row:last-child {
        @media(max-width: 480px) {
            margin-bottom: 65px;
        }
    }
    .mobile-screen {
        display: grid;
        grid-template-columns: 1fr 4fr 2fr;
        align-items: center;
        text-decoration: none;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid $gray-4;
        color: $black;

        &:hover {
            background-color: #f7f8f9;
        }

        .list-row-field {
            padding-left: 3px;
            padding-right: 3px;
        }

        .rest {
            .list-row-field:nth-of-type(1) {
                font-weight: 900 !important;
                font-size: 15px !important;
                padding-bottom: 5px;
            }
            .list-row-field:nth-of-type(2) {
                color: rgba(0,0,0, 0.6)
            }
        }

        .mobile-right {
            text-align: right;
            .list-row-field {
                display: inline-block;
                background-color: green;
                padding: 5px;
                border-radius: 4px;
                color: white;
            }
        }
    }

    .mobile-scroll {
        .list-row-field {
            padding: 3px;
        }
    }
</style>

<script>
  import TableData from './TableData.vue'
// withImage
  export default {
    components: {
      TableData
    },
    data() {
        return {
            windowWidth: null
        }
    },
    props: {
      data: {
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
      linking: {
        type: Object,
        required: true
      },
      mobileType: {
        type: String,
        required: false
      }
    },
    mounted() {
        this.windowWidth = window.innerWidth
        this.$nextTick(() => {
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth
            });
        })
        var scrollers = document.getElementsByClassName('remaining-data');

        var scrollerDivs = Array.prototype.filter.call(scrollers, function(testElement) {
        return testElement.nodeName === 'DIV';
        });

        function scrollAll(scrollLeft) {
        scrollerDivs.forEach(function(element, index, array) {
            element.scrollLeft = scrollLeft;
        });
        }

        scrollerDivs.forEach(function(element, index, array) {
        element.addEventListener('scroll', function(e) {
            scrollAll(e.target.scrollLeft);
        });
        });
    },
    computed: {
        smallScreen() {
            return this.windowWidth && this.windowWidth <= 500 ? true : false
        },
        imageField() {
            return this.fields.find(field => field.field === 'image')
        },
        displayRight() {
            return this.fields.find(field => field.displayRightOnMobile === true)
        },
        filteredFields() {
            const copied = [...this.fields]
            const image = copied.findIndex(field => field.field === 'image');
            if (image >= 0) {
                copied.splice(image, 1)
            }
            const displayRight = copied.findIndex(field => field.displayRightOnMobile === true)
            if (displayRight >= 0) {
                copied.splice(displayRight, 1)
            }
            console.log(displayRight)

            return copied
        },
        firstChild() {
            return this.fields[0]
        },
        rest() {
            const fields = [...this.fields]
            fields.splice(0, 1)
            return fields
        }
    },
    methods: {
      link(rowData) {
        return {
          name: this.linking.route.name,
          params: {
            [this.linking.param]: rowData[this.linking.field]
          }
        }
      },
      getStyle(field, data){
          if (field.styledBackground && field.styledBackground.enabled) {
              const value = field.field.split('.').reduce((prev, curr) => {
                return prev ? prev[curr] : null
            }, data || self)
            return `background-color: ${field.styledBackground.config[value]}`
          }
      }
    }
  }
</script>
