import TableRow from '../../../src/components/TableRow.vue'
import { createLocalVue, shallow } from '@vue/test-utils'

describe('TableRow', () => {
  it('computes screen size', () => {
    let localVue = createLocalVue()
    let row  = shallow(TableRow, {
      propsData: {
        data: {},
        fields: [],
        styler: function(){},
        controls: []
      }
    })

    expect(row.vm.smallScreen).toMatchObject({w: window.innerWidth, h: window.innerHeight})
  })
})