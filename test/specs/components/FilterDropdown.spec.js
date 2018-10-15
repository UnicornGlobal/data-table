import FilterDropdown from '../../../src/components/FilterDropdown.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('FilterDropdown.vue', () => {
  it('it is an object', () => {
    expect(typeof FilterDropdown).toBe('object')
  })

  it('get value and label', () => {
    let localVue = createLocalVue()
    let filter = shallowMount(FilterDropdown, {
      localVue,
      mocks: {
        $assets: {
          dropdown: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path stroke="#123" stroke-width="3.4" d="m2.4,2.4 15.2,15.2m0-15.2-15.2,15.2"/></svg>')`
        }
      },
      propsData: {
        filter: {
          type: 'dropdown'
        },
        options: []
      }
    })

    expect(filter.vm.value('value')).toBe('value')
    expect(filter.vm.value({
      value: 'value1'
    })).toBe('value1')

    expect(filter.vm.label('label')).toBe('label')
    expect(filter.vm.label({
      label: 'label1'
    })).toBe('label1')
  })

  it('loads the right options', () => {
    let localVue = createLocalVue()
    let filter = shallowMount(FilterDropdown, {
      localVue,
      mocks: {
        $assets: {
          dropdown: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path stroke="#123" stroke-width="3.4" d="m2.4,2.4 15.2,15.2m0-15.2-15.2,15.2"/></svg>')`
        }
      },
      propsData: {
        filter: {
          type: 'dropdown',
          filter: 'filter',
          text: 'texty',
          placeholder: 'placeholder'
        },
        options: [
          'One',
          'Two'
        ]
      }
    })

    let label = filter.find('label')
    expect(label.is('label')).toBe(true)
    expect(label.text()).toBe('texty')

    let select = filter.find('select')
    expect(select.is('select')).toBe(true)
    expect(select.attributes('name')).toBe('filter')
    expect(select.contains('option')).toBe(true)

    let options = filter.findAll('option')
    expect(options.at(0).attributes('value')).toBe('')
    expect(options.at(0).text()).toBe('placeholder')
    expect(options.at(1).attributes('value')).toBe('One')
    expect(options.at(1).text()).toBe('One')
    expect(options.at(2).attributes('value')).toBe('Two')
    expect(options.at(2).text()).toBe('Two')
  })
})
