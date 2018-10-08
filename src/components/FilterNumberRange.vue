<template>
    <div>
        <button @click="closeFilter" class="close-tab__udt"><close-button></close-button></button>
        <span class="custom-form-label__udt">Amount from:</span>
        <div class="value-input__udt">
            <input type="text" v-model="filter.from" ref="amountFrom" class="input__udt">
            <button tabindex="-1" @click="clearAmountFrom" class="button__udt"><close-button></close-button></button>
        </div>
        <span class="custom-form-label__udt">Amount to:</span>
        <div class="value-input__udt">
            <input type="text" v-model="filter.to" ref="amountTo" class="input__udt">
            <button tabindex="-1" @click="clearAmountTo" class="button__udt"><close-button></close-button></button>
        </div>
    </div>
</template>

<style lang="scss">
  .custom-form-label__udt {
    margin-bottom: 0.3em;
  }

  .close-tab__udt {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
    margin: 0;
    height: 30px;
    width: 30px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    svg {
      height: 22px;
      width: 22px;
    }
  }

  .value-input__udt {
    display: flex;
    flex-direction: row;
    margin-bottom: 1em;
  }

  .button__udt {
    border: 0;
    background-color: white;
    padding: 0;
    margin: 0;
    height: 38px;
    width: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    svg {
      height: 20px;
      width: 20px;
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
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABTVBMVEUAAAD/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j/K2j0UWihAAAAbnRSTlMAAQMFBgcICgsMDQ4QERQVFhcYGRobIiMkLS4vMDEyPkBCQ0RFRkdJSktOV1hZW1xdXmFibW9wcXN0dXd4eXt8fn+AgoiJi4yOj5GSlJeYmpuipbe5vMPFx8jKzNPV19na3uDi5Ojt7/Hz9ff7/cuonQEAAAQ2SURBVGjevVrrQ9owEE8BXUEFnSg6fCuy+cLXQJ3iAwUFnQN1Oh9zgi+K9P//OEBIk9LSXBt7n0i53q/JXe4ud0EISoKAPow8gYnV7HVekisk5a+zq+MBD0/5gjf0syhrUPEk5OUzr961F7kFvcQ+W0VoizzIhvQQabMAIW6WZSYqb4pmIQ5kAO1/MqPtuTcZRG+zYBvov5PBdNsPm0ZcNkVxwGTES20ZpYtMIrayEktkLkraHL+ZDWBI0tgO6TGfk2Ry+sbSGhuoGGTDiDS9mV/q0mbtWso3Mc+zYGyo3zrsa8XuT6n5141Vfqh6Zc/QDXr21F9loH4hS/PnmBQp5ui3sq1R6Hk8BlltJfhIvZhi18exg93qHceselmknF4Y5iO+Uc50QY9tmOR66oF6op4n8n2dlXaTe/DehO8W/5G7UlOAcEWwXLnMBAfXH9LDaJnYDonhMBeCHOSHxpv/D5Br5TIZ55DrnhDT5PkFIn48mY2lVb0Q2r9VL9g8YbvduiJmvtdpRt/GCEueVX0AEWun9b/zrMFzps/zlYjIdNxPKv9kkDUQROz9fWoiyvOCwyqIg/BjpHa3lMeDyCoICirSNok8UVFWFlkHQYrnL7dpOUaRBwix+hH8UAnU24gHCFJi5QMO0wqwmw+IR5HYyPnX8ZMk4gOClOwiVvcoSvrk5wWiLM7Lu2/xNS+gZRBCzd7aOKxhCpZBlrDQUG18ised/EC6sNCT2hhH3WfEDwRhRRerow62bAkKksZiqynoAB6N8gQZw2IDldGkyg44gSg2O14ZRfHIyRPEicWuki5TQjxBUIl07DeNwTlfkIsG73VlUGgM0nxBMvicRk5rly9IglQDVlCUL0gMC674YPx7mS/IChYs2ANiy3LZo3hbTBiyGRNndUoANyPErUCIcisQBwkg2kFOAVw9gBRXPwEMWgCigxYk/AKIDr+QRAJAdCIBSYnYSZ0SAZI7dlInd4A0lZ3Uaarwypxwi511Mjrp96kTbqLKleLlu5Ti3Jodh6BeO49zxMG0/HEH03Y7jtgobkOxALntKHsQp1WuBZwDO0pRov1FNXvKg7YUOu0p2XIpPpMiLgXDMvpfM2V0cq0kHQEjVEOg21pDYMg4ZlYtOQTDmKZaGy0i+Q+q05KBNGky7M2zI4q1MMiK8aVAt85aMqsbZ1m2xlkW1DhDwpGqn7ftNoJwbwNbgE16qWYXLXMYfxLezFTbWP1+gk5u2alxu4ExQxzRaDA/p0a9dIPZO5p6buaThlltxX2l3QiXztO70eXl6G76XNLmuHSzW72wY67pvwO7wRAwcX3hLgD1RMIC9CLGnJnLOGIKgpE0fXMlzno5ZstCxEbti3ljiPyilWs+71t647XlhaV1P+JBgi/8S3NfSKdhH9crZR0DU9HcTaFWzCgVbnLRyYEO9GFk4jrcf1epEH7P8yHYAAAAAElFTkSuQmCC);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: right 30px center;
    }

    &[disabled] {
      cursor: not-allowed;
    }
  }
</style>

<script>
  import CloseButton from './Icons/close-button.svg'

  export default {
    props: {
      filter: {
        type: Object,
        required: true
      }
    },
    components: {
      CloseButton
    },
    methods: {
      closeFilter() {
        this.$emit('close')
      },
      clearAmountFrom() {
        this.$refs.amountFrom.value = null
        this.$refs.amountFrom.dispatchEvent(new Event('input', {'bubbles': true}))
      },
      clearAmountTo() {
        this.$refs.amountTo.value = null
        this.$refs.amountTo.dispatchEvent(new Event('input', {'bubbles': true}))
      }
    }
  }
</script>
