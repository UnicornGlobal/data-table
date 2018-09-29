import TableBody from '../../../src/components/TableBody.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('TableBody.vue', () => {
  it('computes must link', () => {
    let localVue = createLocalVue()
    let table = shallowMount(TableBody, {
      localVue,
      propsData: {
        dataset: [],
        fields: [],
        styler: () => {},
        linking: {
          enabled: true
        }
      }
    })

    expect(table.vm.mustLink()).toBe(true)
  })
})
