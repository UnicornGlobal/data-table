import DataTable from './DataTable.vue'

DataTable.install = function(Vue, options) {
  Vue.prototype.$theme = options.theme
}

export default DataTable
