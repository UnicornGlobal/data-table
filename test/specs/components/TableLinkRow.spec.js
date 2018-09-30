import LinkedRow from '../../../src/components/TableLinkRow.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('TableLinkRow.vue', () => {
  it('computes values', () => {
    let localVue = createLocalVue()
    let table = shallowMount(LinkedRow, {
      localVue,
      stubs: ['router-link'],
      propsData: {
        data: {name: 'me'},
        fields: [
          {field: 'image'},
          {displayRightOnMobile: true}
        ],
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

    expect(table.vm.imageField).toMatchObject({field: 'image'})
    expect(table.vm.displayRight).toMatchObject([{displayRightOnMobile: true}])
    expect(typeof table.vm.filteredFields).toBe('object')

    table.setProps({fields: [
      {type: 'text'},
      {type: 'number'}
    ]})
    expect(typeof table.vm.filteredFields).toBe('object')
    expect(table.vm.firstField).toMatchObject({type: 'text'})
    expect(table.vm.rest[0]).toMatchObject({type: 'number'})
  })
  it('gets style', () => {
    let localVue = createLocalVue()
    let table = shallowMount(LinkedRow, {
      localVue,
      stubs: ['router-link'],
      propsData: {
        data: {name: 'me'},
        fields: [
          {field: 'image'},
          {displayRightOnMobile: true},
        ],
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

    let field = {styledBackground: {enabled: true, config: {Name: 'Name'}}, field: 'user.name'}
    let data = {user: {name: 'Name'}}

    expect(table.vm.getStyle(field, data)).toBe('background-color: Name')
    expect(table.vm.getStyle(field)).toBe('background-color: undefined')

    field = {styledBackground: {enabled: false, config: {Name: 'Name'}}, field: 'user.name'}
    expect(table.vm.getStyle(field)).toBe('')
  })
})
