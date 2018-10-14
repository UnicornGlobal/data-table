import FilterDateRange from '../../../src/components/FilterDateRange.vue'
import { createLocalVue, shallowMount, mount } from '@vue/test-utils'

describe('FilterDateRange.vue', () => {
  it('it is an object', () => {
    expect(typeof FilterDateRange).toBe('object')
  })

  it('closes filter', () => {
    let localVue = createLocalVue()
    let filter = mount(FilterDateRange, {
      localVue,
      mocks: {
        $assets: {
          close: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path stroke="#123" stroke-width="3.4" d="m2.4,2.4 15.2,15.2m0-15.2-15.2,15.2"/></svg>')`
        }
      },
      propsData: {
        filter: {
          from: '',
          to: ''
        }
      }
    })

    let close = filter.find('div[title="Close"]')
    close.trigger('click')
    expect(filter.emitted()).toHaveProperty('close')
  })

  it('sets dates', () => {
    let localVue = createLocalVue()
    let filter = mount(FilterDateRange, {
      localVue,
      mocks: {
        $assets: {
          close: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path stroke="#123" stroke-width="3.4" d="m2.4,2.4 15.2,15.2m0-15.2-15.2,15.2"/></svg>')`
        }
      },
      propsData: {
        filter: {
          from: '',
          to: ''
        }
      }
    })

    expect(filter.vm.$refs.dateFrom.$refs.dateInput.$refs.inputArea.value).toBe('')

    filter.vm.setDateFrom('12-12-1900')
    expect(filter.vm.$refs.from.value).toBe('12-12-1900')

    filter.vm.setDateTo('13-12-1901')
    expect(filter.vm.$refs.to.value).toBe('13-12-1901')
  })

  it('does not focus if there is a value', () => {
    let localVue = createLocalVue()
    let filter = mount(FilterDateRange, {
      localVue,
      mocks: {
        $assets: {
          close: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path stroke="#123" stroke-width="3.4" d="m2.4,2.4 15.2,15.2m0-15.2-15.2,15.2"/></svg>')`
        }
      },
      propsData: {
        filter: {
          from: '12-12-1999',
          to: '11-11-2000'
        }
      }
    })

    expect(filter.vm.$refs.dateFrom.$refs.dateInput.$refs.inputArea.value).toBe('1999-12-12')
  })
})
