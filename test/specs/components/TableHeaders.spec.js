import TableHeaders from '../../../src/components/TableHeaders.vue'
import { createLocalVue, shallow } from '@vue/test-utils'

describe('TableHeaders', () => {
  let localVue = createLocalVue()

  it('sorts data', () => {
    let headers = shallow(TableHeaders, {
      localVue,
      propsData: {
        config: {
          sorting: {
            field: 'index',
            ascending: true
          }
        },
        fields: [],
        styler: () => {},
        controls: []
      }
    })

    headers.vm.sort({field: 'name'})
    expect(headers.vm.config.sorting.ascending).toBe(true)
    expect(headers.vm.config.sorting.field).toBe('name')

    headers.vm.sort({field: 'name'})
    expect(headers.vm.config.sorting.ascending).toBe(false)
    expect(headers.vm.config.sorting.field).toBe('name')
  })
})