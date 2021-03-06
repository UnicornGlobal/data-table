import DataTable from './DataTable.vue'

DataTable.install = async function(Vue, options) {
  Vue.prototype.$theme = await options.theme

  if (!options.theme.primary) {
    options.theme.primary = '#000'
  }

  Vue.prototype.$assets = {
    dropdown: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="${encodeURI(options.theme.primary)}" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"/></svg>')`,
    checkbox: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" fill="${encodeURI(options.theme.primaryText)}"/></svg>')`,
    checkmark: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" fill="lightgreen"/></svg>')`,
    crossmark: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path stroke="red" stroke-width="3.4" d="m2.4,2.4 15.2,15.2m0-15.2-15.2,15.2"/></svg>')`,
    close: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path stroke="${encodeURI(options.theme.primary)}" stroke-width="3.4" d="m2.4,2.4 15.2,15.2m0-15.2-15.2,15.2"/></svg>')`
  }

  if (options.assets && options.assets.dropdown) {
    Vue.prototype.$assets.dropdown = options.assets.dropdown
  }

  if (options.assets && options.assets.checkbox) {
    Vue.prototype.$assets.checkbox = options.assets.checkbox
  }

  if (options.assets && options.assets.checkmark) {
    Vue.prototype.$assets.checkmark = options.assets.checkmark
  }

  if (options.assets && options.assets.crossmark) {
    Vue.prototype.$assets.crossmark = options.assets.crossmark
  }

  if (options.assets && options.assets.close) {
    Vue.prototype.$assets.close = options.assets.close
  }
}

export default DataTable
