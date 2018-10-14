import FilterCheckbox from '../../../src/components/FilterCheckbox.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('FilterCheckbox.vue', () => {
  it('it is an object', () => {
    expect(typeof FilterCheckbox).toBe('object')
  })

  it('mounts correctly', () => {
    let localVue = createLocalVue()
    let filter = shallowMount(FilterCheckbox, {
      localVue,
      mocks: {
        $assets: {
          checkbox: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path stroke="#123" stroke-width="3.4" d="m2.4,2.4 15.2,15.2m0-15.2-15.2,15.2"/></svg>')`
        }
      },
      propsData: {
        filter: {
          type: 'checkbox',
          field: 'fieldy',
          text: 'text1'
        }
      }
    })

    let label = filter.find('label')
    expect(label.is('label')).toBe(true)
    expect(label.text()).toBe('text1')
    expect(label.attributes('for')).toBe('filter-fieldy')

    let input = filter.find('input')
    expect(input.is('input')).toBe(true)
    expect(input.attributes('id')).toBe('filter-fieldy')
  })
})
