import DataTable from './DataTable.vue'

DataTable.install = function(Vue, options) {
  console.log(options)
  Vue.prototype.$theme = options.theme
}

export default DataTable
