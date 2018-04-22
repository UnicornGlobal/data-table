import Filtering from '../../../src/components/Filtering.vue'
import { createLocalVue, shallow } from '@vue/test-utils'

describe('Filtering.vue', () => {
  it('sets dropdown data', () => {
    let localVue = createLocalVue()
    let filtering = shallow(Filtering, {localVue, propsData: {filters: [], dataset: []}})

    expect(filtering.vm.dropdownDataSet({field: 'name'}, [{name: 'Me'}])).toContain('Me')
  })
})