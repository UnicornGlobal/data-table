import LinkedRow from '../../../src/components/TableLinkRow.vue'
import { createLocalVue, shallow } from '@vue/test-utils'

describe('TableLinkRow.vue', () => {
  it('computes link', () => {
    let localVue = createLocalVue()
    let table = shallow(LinkedRow, {
      localVue,
      stubs: ['router-link'],
      propsData: {
        data: {name: 'me'},
        fields: [],
        styler: () => {},
        linking: {
          enabled: true,
          param: 'name',
          field: 'name',
          route: {
            name: 'route',
          }
        }
      }
    })

    expect(table.vm.link({name: 'me'})).toMatchObject({
      name: 'route',
      params: {name: 'me'}
    })
  })
})