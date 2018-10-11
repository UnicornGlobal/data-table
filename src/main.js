// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import DataTable from './DataTable.vue'

DataTable.install = function(Vue, options) {
  console.log(options)
  Vue.prototype.$theme = options.theme
}

export default DataTable
