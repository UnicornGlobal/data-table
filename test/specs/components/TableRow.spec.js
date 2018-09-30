import TableRow from '../../../src/components/TableRow.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('TableRow', () => {
  it('computes screen size', () => {
    let localVue = createLocalVue()
    let row  = shallowMount(TableRow, {
      propsData: {
        data: {},
        fields: [],
        styler: function(){},
        controls: []
      }
    })

    expect(row.vm.smallScreen).toBe(false)
  })
})
