import TableRow from '../../../src/components/TableRow.vue'
import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import TableRowOption from '../../../src/components/TableRowOption.vue'

describe('TableRow', () => {
  it('computes screen size', () => {
    let localVue = createLocalVue()
    let row = shallowMount(TableRow, {
      localVue,
      propsData: {
        data: {},
        fields: [],
        styler: function () {},
        controls: []
      }
    })

    expect(row.vm.smallScreen).toBe(false)
  })

  it('it computes values', () => {
    let localVue = createLocalVue()
    let row = shallowMount(TableRow, {
      localVue,
      propsData: {
        data: {},
        fields: [],
        styler: function () {},
        controls: []
      }
    })

    const fields = [
      {
        field: 'image'
      },
      {
        displayRightOnMobile: true
      },
      {
        field: 'something'
      }]

    row.setProps({fields})
    expect(row.vm.imageField).toMatchObject({field: 'image'})
    expect(row.vm.displayRight).toMatchObject([{displayRightOnMobile: true}])
    expect(typeof row.vm.filteredFields).toBe('object')

    row.setProps({fields: []})
    expect(row.vm.filteredFields.length).toBe(0)

    row.setProps({fields})
    expect(row.vm.firstField).toMatchObject({field: 'image'})
    expect(row.vm.rest.length).toBe(2)
  })

  it('gets style', () => {
    let localVue = createLocalVue()
    let table = shallowMount(TableRow, {
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

    field = {value: (data) => 'value', styledBackground: {enabled: true, config: {value: 'Name'}}, field: 'user.name'}
    expect(table.vm.getStyle(field)).toBe('background-color: Name')
  })

  it('mounts controls when "show" option is undefined', () => {
    let localVue = createLocalVue()
    let row = shallowMount(TableRow, {
      stubs: {
        RouterLink: RouterLinkStub
      },
      propsData: {
        data: {name: 'name'},
        fields: [{field: 'name', type: 'text'}],
        styler: function () {},
        controls: [{type: 'link', href: '#', label: 'Sample link'}]
      }
    })

    let link = row.find(TableRowOption)
    expect(link.exists()).toBe(true)
  })

  it('does not mount controls when "show" option is false', () => {
    let localVue = createLocalVue()
    let row = shallowMount(TableRow, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub
      },
      propsData: {
        data: {name: 'name'},
        fields: [{field: 'name', type: 'text'}],
        styler: function () {},
        controls: [{type: 'link', href: '#', label: 'Sample link', show: false}]
      }
    })

    let link = row.find(TableRowOption)
    expect(link.exists()).toBe(false)
  })

  it('does not mount controls when "show" option is a callback returning false', () => {
    let localVue = createLocalVue()
    let row = shallowMount(TableRow, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub
      },
      propsData: {
        data: {name: 'name'},
        fields: [{field: 'name', type: 'text'}],
        styler: function () {},
        controls: [{type: 'link', href: '#', label: 'Sample link', show: (data) => false}]
      }
    })

    let link = row.find(TableRowOption)
    expect(link.exists()).toBe(false)
  })

  it('mounts controls when "show" option is a callback returning true', () => {
    let localVue = createLocalVue()
    let row = shallowMount(TableRow, {
      localVue,
      stubs: {
        RouterLink: RouterLinkStub
      },
      propsData: {
        data: {name: 'name'},
        fields: [{field: 'name', type: 'text'}],
        styler: function () {},
        controls: [{type: 'link', href: '#', label: 'Sample link', show: (data) => true}]
      }
    })

    let link = row.find(TableRowOption)
    expect(link.exists()).toBe(true)
  })
})
