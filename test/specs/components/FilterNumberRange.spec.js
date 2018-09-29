import FilterNumberRange from '../../../src/components/FilterNumberRange.vue'
import { createLocalVue, mount } from '@vue/test-utils'

describe('FilterNumberRange.vue', () => {
  it('it is an object', () => {
    expect(typeof FilterNumberRange).toBe('object')
  })

  it('closes filter', () => {
    let localVue = createLocalVue()
    let filter = mount(FilterNumberRange, {localVue, propsData: {filter: {from: 3, to: 9}}})
    let close = filter.find('div.close-tab')
    expect(close.text()).toBe('x')
    close.trigger('click')
    expect(filter.emitted()).toHaveProperty('close')
  })

  it('clears values', () => {
    let localVue = createLocalVue()
    let filter = mount(FilterNumberRange, {localVue, propsData: {filter: {from: 3, to: 10}}})

    expect(filter.vm.$refs.amountFrom.value).toBe('3')
    expect(filter.vm.$refs.amountTo.value).toBe('10')

    filter.vm.clearAmountFrom()
    expect(filter.vm.$refs.amountFrom.value).toBe('')

    filter.vm.clearAmountTo()
    expect(filter.vm.$refs.amountTo.value).toBe('')
  })
})