<template>
    <input type="text" class="form-control" :value="value">
</template>
<script type="text/javascript">
  import Pickaday from 'pikaday'

  export default {
    props: ['value', 'format', 'name'],
    data() {
      return {
        picker: null,
        inputName: this.name || 'date'
      }
    },
    watch: {
      value(value){
        this.picker.setDate(value)
      }
    },
    mounted() {
      const getDate = this.getDate
      this.picker = new Pickaday({
        field: this.$el,
        bound: true,
        defaultDate: this.value,
        format: 'YYYY-MM-DD',
        onSelect: function (date) {
          getDate(this.getMoment(date).format('YYYY-MM-DD'))
        }
      })
      this.picker.setDate(this.value)
    },
    methods: {
      getDate(date) {
        this.$emit(this.inputName, {date, field: this.inputName})
        this.$emit('input', date)
      }
    }
  }
</script>
<style lang="scss">
    @import "../sass/styles";
    @import '~pikaday/scss/pikaday';

    .pika-lendar {
        button {
            &.pika-next {
                background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI2OC44MzIgMjY4LjgzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjY4LjgzMiAyNjguODMyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTI2NS4xNzEsMTI1LjU3N2wtODAtODBjLTQuODgxLTQuODgxLTEyLjc5Ny00Ljg4MS0xNy42NzgsMGMtNC44ODIsNC44ODItNC44ODIsMTIuNzk2LDAsMTcuNjc4bDU4LjY2MSw1OC42NjFIMTIuNSAgIGMtNi45MDMsMC0xMi41LDUuNTk3LTEyLjUsMTIuNWMwLDYuOTAyLDUuNTk3LDEyLjUsMTIuNSwxMi41aDIxMy42NTRsLTU4LjY1OSw1OC42NjFjLTQuODgyLDQuODgyLTQuODgyLDEyLjc5NiwwLDE3LjY3OCAgIGMyLjQ0LDIuNDM5LDUuNjQsMy42NjEsOC44MzksMy42NjFzNi4zOTgtMS4yMjIsOC44MzktMy42NjFsNzkuOTk4LTgwQzI3MC4wNTMsMTM4LjM3MywyNzAuMDUzLDEzMC40NTksMjY1LjE3MSwxMjUuNTc3eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);
            }
            &.pika-prev {
                background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQwMC4wMDQgNDAwLjAwNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDAwLjAwNCA0MDAuMDA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTM4Mi42ODgsMTgyLjY4Nkg1OS4xMTZsNzcuMjA5LTc3LjIxNGM2Ljc2NC02Ljc2LDYuNzY0LTE3LjcyNiwwLTI0LjQ4NWMtNi43NjQtNi43NjQtMTcuNzMtNi43NjQtMjQuNDg0LDBMNS4wNzMsMTg3Ljc1NyAgIGMtNi43NjQsNi43Ni02Ljc2NCwxNy43MjcsMCwyNC40ODVsMTA2Ljc2OCwxMDYuNzc1YzMuMzgxLDMuMzgzLDcuODEyLDUuMDcyLDEyLjI0Miw1LjA3MmM0LjQzLDAsOC44NjEtMS42ODksMTIuMjQyLTUuMDcyICAgYzYuNzY0LTYuNzYsNi43NjQtMTcuNzI2LDAtMjQuNDg0bC03Ny4yMDktNzcuMjE4aDMyMy41NzJjOS41NjIsMCwxNy4zMTYtNy43NTMsMTcuMzE2LTE3LjMxNSAgIEM0MDAuMDA0LDE5MC40MzgsMzkyLjI1MSwxODIuNjg2LDM4Mi42ODgsMTgyLjY4NnoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
            }
        }
        table.pika-table {
            th abbr {
                text-decoration: none;
            }
            .pika-row td {
                border: solid 1px $tabbs-gray-4;
                &.is-today {
                    background: $blue-4;
                    color: $white
                }
                &.is-selected {
                    background: $tabbs-pink;
                    color: $white;
                    .pika-button {
                        box-shadow: none;
                        border-radius: 0;
                    }
                }
                .pika-button {
                    text-align: center;
                    color: inherit;
                    background: inherit;
                }
            }
        }
    }
</style>
