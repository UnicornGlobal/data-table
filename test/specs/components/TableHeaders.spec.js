import TableHeaders from '../../../src/components/TableHeaders.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('TableHeaders', () => {
  let localVue = createLocalVue()

  it('sorts data', () => {
    let headers = shallowMount(TableHeaders, {
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

  it('sorts custom fields', () => {
    let headers = shallowMount(TableHeaders, {
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

    expect(headers.vm.config.sorting.ascending).toBe(true)
    expect(headers.vm.config.sorting.field).toBe('index')

    headers.vm.sort({field: 'name', sort: 'xx'})
    expect(headers.vm.config.sorting.ascending).toBe(true)
    expect(headers.vm.config.sorting.field).toBe('xx')

    headers.vm.sort({field: 'name', sort: 'xx'})
    expect(headers.vm.config.sorting.ascending).toBe(false)
    expect(headers.vm.config.sorting.field).toBe('xx')
  })
})
