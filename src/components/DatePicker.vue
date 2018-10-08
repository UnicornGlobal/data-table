<template>
    <input type="text" :value="value" class="input__udt">
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
        border: solid 1px rgb(216, 218, 225);

        &.is-today {
          background: rgb(84, 129, 255);
          color: rgb(255, 255, 255);
        }

        &.is-selected {
          background: rgb(255, 43, 104);
          color: rgb(255, 255, 255);

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

  .input__udt:not([type=checkbox]):not([type=radio]) {
    height: 38px;
    background-color: rgb(245, 246, 247);
    border: solid 1px rgb(216, 218, 225);
    color: rgb(0, 0, 0);
    padding-left: 10px;
    padding-right: 10px;


    &:not([type=file]) {
      width: 100%;
    }

    &::placeholder {
      color: lighten(rgb(0, 0, 0), 60%);
    }

    &:focus {
      border-color: rgb(84, 129, 255);
      outline: none;
    }

    &[aria-invalid=true] {
      border-color: rgb(255, 43, 104);
      color: rgb(255, 43, 104);
      background-image: url(data:image/png;base64,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);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: right 30px center;
    }

    &[disabled] {
      cursor: not-allowed;
    }
  }
</style>
