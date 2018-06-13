import FilterDateRange from '../../../src/components/FilterDateRange.vue'
import { createLocalVue, shallow } from '@vue/test-utils'

describe('FilterDateRange.vue', () => {
  it('it is an object', () => {
    expect(typeof FilterDateRange).toBe('object')
  })

  it('closes filter', () => {
    let localVue = createLocalVue()
    let filter = shallow(FilterDateRange, {localVue, propsData: {filter: {from: '', to: ''}}})
    let close = filter.find('div.close-tab')
    expect(close.text()).toBe('x')
    close.trigger('click')
    expect(filter.emitted()).toHaveProperty('close')
  })

  it('sets dates', () => {
    let localVue = createLocalVue()
    let filter = shallow(FilterDateRange, {localVue, propsData: {filter: {from: '', to: ''}}})

    filter.vm.setDateFrom({date: '12-12-1900'})
    expect(filter.vm.$refs.from.value).toBe('12-12-1900')

    filter.vm.setDateTo({date: '13-12-1900'})
    expect(filter.vm.$refs.to.value).toBe('13-12-1900')
  })
})