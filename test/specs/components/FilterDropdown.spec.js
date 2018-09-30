import FilterDropdown from '../../../src/components/FilterDropdown.vue'
import { createLocalVue, shallow } from '@vue/test-utils'

describe('FilterDropdown.vue', () => {
  it('it is an object', () => {
    expect(typeof FilterDropdown).toBe('object')
  })

  it('get value and label', () => {
    let localVue = createLocalVue()
    let filter = shallow(FilterDropdown, {
      localVue,
      propsData: {
        filter: {
          type: 'dropdown',
          options: []
        }
      }
    })

    expect(filter.vm.value('value')).toBe('value')
    expect(filter.vm.value({value: 'value1'})).toBe('value1')

    expect(filter.vm.label('label')).toBe('label')
    expect(filter.vm.label({label: 'label1'})).toBe('label1')
  })
})