import FilterNumberRange from '../../../src/components/FilterNumberRange.vue'
import { createLocalVue, mount } from '@vue/test-utils'

describe('FilterNumberRange.vue', () => {
  it('it is an object', () => {
    expect(typeof FilterNumberRange).toBe('object')
  })

  it('closes filter', () => {
    let localVue = createLocalVue()
    let filter = mount(FilterNumberRange, {
      localVue,
      mocks: {
        $assets: {
          close: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path stroke="#123" stroke-width="3.4" d="m2.4,2.4 15.2,15.2m0-15.2-15.2,15.2"/></svg>')`
        }
      },
      propsData: {
        filter: {
          from: 3,
          to: 9
        }
      }
    })

    let close = filter.find('div[title="Close"]')
    close.trigger('click')
    expect(filter.emitted()).toHaveProperty('close')
  })

  it('clears values', () => {
    let localVue = createLocalVue()
    let filter = mount(FilterNumberRange, {
      localVue,
      mocks: {
        $assets: {
          close: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path stroke="#123" stroke-width="3.4" d="m2.4,2.4 15.2,15.2m0-15.2-15.2,15.2"/></svg>')`
        }
      },
      propsData: {
        filter: {
          from: 3,
          to: 10
        }
      }
    })

    expect(filter.vm.$refs.from.$refs.inputBox.value).toBe('3')
    expect(filter.vm.$refs.to.$refs.inputBox.value).toBe('10')

    filter.vm.$refs.from.clear()
    expect(filter.vm.$refs.from.$refs.inputBox.value).toBe('')

    filter.vm.$refs.to.clear()
    expect(filter.vm.$refs.to.$refs.inputBox.value).toBe('')
  })

  it('handles input', () => {
    let localVue = createLocalVue()
    let filter = mount(FilterNumberRange, {
      localVue,
      mocks: {
        $assets: {
          close: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path stroke="#123" stroke-width="3.4" d="m2.4,2.4 15.2,15.2m0-15.2-15.2,15.2"/></svg>')`
        }
      },
      propsData: {
        filter: {
          from: 30,
          to: 100
        }
      }
    })

    expect(filter.vm.$refs.from.$refs.inputBox.value).toBe('30')
    expect(filter.vm.$refs.to.$refs.inputBox.value).toBe('100')

    filter.vm.$refs.from.handleInput({ target: { value: 'x' } })
    expect(filter.vm.$refs.from.$refs.inputBox.value).toBe('x')

    filter.vm.$refs.from.handleInput({ target: { value: 'xxx' } })
    expect(filter.vm.$refs.from.$refs.inputBox.value).toBe('xxx')
  })
})
