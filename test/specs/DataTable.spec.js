// http://chaijs.com/api/bdd/
import DataTable from '../../src/DataTable.vue'
import { createLocalVue, mount } from '@vue/test-utils'

const localVue = createLocalVue()

const propsData = {
  dataset: [
    {
      '_id': '1',
      'is_active': 1,
      'is_deleted': 0,
      'created_at': '2018-01-02',
      'amount': 30.00,
      'category': 'Cat A',
      'menu_items': [
        {
          '_id': 1
        },
        {
          '_id': 2
        }
      ],
      'name': 'xx'
    },
    {
      '_id': '2',
      'is_active': 1,
      'is_deleted': 0,
      'menu_items': [],
      'amount': 20.00,
      'category': 'Cat B',
      'created_at': '2018-01-02',
      'name': 'yy'
    }
  ],
  options: {
    config: {
      search: {
        enabled: false
      },
      sorting: {
        enabled: true,
        field: 'name',
        ascending: false
      },
      actionComponent: {
        enabled: false
      },
      filtering: {
        enabled: true,
        filters: [
          {
            type: 'checkbox',
            field: 'is_active',
            text: 'Include Inactive',
            enabled: true,
            count: false
          },
          {
            type: 'tab',
            name: 'All transactions',
            field: '',
            filter: 'none',
            enabled: true,
            count: false,
            active: false
          },
          {
            type: 'tab',
            name: 'Filter Date',
            filter: 'date',
            parentField: '',
            field: 'created_at',
            enabled: true,
            count: false,
            active: true
          },
          {
            type: 'tab',
            name: 'Filter Amount',
            parentField: '',
            filter: 'range',
            field: 'amount',
            enabled: true,
            count: false,
            active: false
          },
          {
            type: 'dropdown',
            text: 'Filter Category',
            parentField: '',
            filter: 'category',
            field: 'category',
            count: false,
            base: '',
            enabled: true
          }
        ]
      }
    },
    fields: [
      {
        type: 'image',
        header: false,
        field: 'name'
      },
      {
        type: 'text',
        name: 'Name',
        field: 'name',
        header: true,
        sortable: true,
        grow: 2
      },
      {
        type: 'boolean',
        name: 'Status',
        field: 'is_active',
        yes: 'Active',
        no: 'Inactive',
        header: true
      },
      {
        type: 'count',
        name: 'Count',
        field: 'menu_items',
        header: true
      }
    ]
  }
}

describe('DataTable.vue', () => {
  it('Mounts correctly with minimal values and renders an empty table', () => {
    let dataTable = mount(DataTable, {
      attachToDocument: true,
      localVue,
      propsData: {
        dataset: [],
        options: {
          config: {
            search: {
              enabled: false
            },
            sorting: {
              enabled: false
            },
            actionComponent: {
              enabled: false
            },
            filtering: {
              enabled: false
            }
          },
          fields: []
        }
      }
    })

    expect(dataTable.contains('div')).to.equal(true)
    const element = dataTable.find('.no-results')
    expect(element.is('div')).to.equal(true)
    expect(element.text()).to.equal('No Results. Please broaden your search parameters.')
  })

  it('Renders one empty active item and renders a populated table', () => {
    let dataTable = mount(DataTable, {
      attachToDocument: true,
      localVue,
      propsData: {
        dataset: [
          {
            '_id': '10c7df1d-a15b-4d56-86eb-c1b5a8cd3d78',
            'is_active': true,
            'is_deleted': false,
            'menu_items': [],
            'name': 'xx'
          }
        ],
        options: {
          config: {
            search: {
              enabled: true,
              field: 'name',
              term: null,
              placeholder: 'Search'
            },
            sorting: {
              enabled: false
            },
            actionComponent: {
              enabled: false
            },
            filtering: {
              enabled: false
            }
          },
          fields: [
            {
              type: 'image',
              header: false,
              field: 'name',
              secondary: false
            },
            {
              type: 'text',
              name: 'Name',
              field: 'name',
              header: true,
              sortable: true,
              grow: 2
            },
            {
              type: 'boolean',
              name: 'Status',
              field: 'is_active',
              yes: 'Active',
              no: 'Inactive',
              header: true
            },
            {
              type: 'count',
              name: 'Count',
              field: 'menu_items',
              header: true
            }
          ]
        }
      }
    })

    return dataTable.vm.$nextTick(() => {
      expect(dataTable.contains('div')).to.equal(true)

      const element = dataTable.find('.avatar-initials')
      expect(element.is('img')).to.equal(false)
      expect(element.element.style.width).to.equal('35px')
      expect(element.element.style.borderRadius).to.equal('35px')
      expect(element.text()).to.equal('x')

      const active = dataTable.find('.field-contents.is_active')
      expect(active.is('div')).to.equal(true)
      expect(active.text()).to.equal('Active')

      const items = dataTable.find('.field-contents.menu_items')
      expect(items.is('div')).to.equal(true)
      expect(items.text()).to.equal('0')
    })
  })

  it('Renders a single item with a single child', () => {
    let dataTable = mount(DataTable, {
      attachToDocument: true,
      localVue,
      propsData: {
        dataset: [
          {
            '_id': '10c7df1d-a15b-4d56-86eb-c1b5a8cd3d78',
            'is_active': 1,
            'is_deleted': 0,
            'menu_items': [
              {
                '_id': 1
              }
            ],
            'name': 'xx'
          }
        ],
        options: {
          config: {
            search: {
              enabled: true,
              field: 'name',
              term: 'x',
              placeholder: 'Search'
            },
            sorting: {
              enabled: true,
              field: 'name',
              ascending: true
            },
            actionComponent: {
              enabled: false
            },
            filtering: {
              enabled: false
            },
            headers: {
              enabled: false
            }
          },
          fields: [
            {
              type: 'image',
              header: false,
              field: 'name'
            },
            {
              type: 'text',
              name: 'Name',
              field: 'name',
              header: true,
              sortable: true,
              grow: 2
            },
            {
              type: 'boolean',
              name: 'Status',
              field: 'is_active',
              yes: 'Active',
              no: 'Inactive',
              header: true
            },
            {
              type: 'count',
              name: 'Count',
              field: 'menu_items',
              header: true
            }
          ]
        }
      }
    })

    return dataTable.vm.$nextTick(() => {
      const items = dataTable.find('.field-contents.menu_items')
      expect(items.is('div')).to.equal(true)
      expect(items.text()).to.equal('1')
    })
  })

  it('Renders an empty search', () => {
    let dataTable = mount(DataTable, {
      attachToDocument: true,
      localVue,
      propsData: {
        dataset: [
          {
            '_id': '10c7df1d-a15b-4d56-86eb-c1b5a8cd3d78',
            'is_active': 1,
            'is_deleted': 0,
            'menu_items': [
              {
                '_id': 1
              }
            ],
            'name': 'xx'
          }
        ],
        options: {
          config: {
            search: {
              enabled: true,
              field: 'name',
              term: 'aaa',
              placeholder: 'Search'
            },
            sorting: {
              enabled: true,
              field: 'name',
              ascending: false
            },
            actionComponent: {
              enabled: false
            },
            filtering: {
              enabled: false
            }
          },
          fields: [
            {
              type: 'image',
              header: false,
              field: 'name'
            },
            {
              type: 'text',
              name: 'Name',
              field: 'name',
              header: true,
              sortable: true,
              grow: 2
            },
            {
              type: 'boolean',
              name: 'Status',
              field: 'is_active',
              yes: 'Active',
              no: 'Inactive',
              header: true
            },
            {
              type: 'count',
              name: 'Count',
              field: 'menu_items',
              header: true
            }
          ]
        }
      }
    })

    return dataTable.vm.$nextTick(() => {
      const items = dataTable.find('.no-results')
      expect(items.is('div')).to.equal(true)
      expect(items.text()).to.equal('No Results. Please broaden your search parameters.')
    })
  })

  it('Renders a single item with 2 children', () => {
    let dataTable = mount(DataTable, {
      attachToDocument: true,
      localVue,
      propsData: {
        dataset: [
          {
            '_id': '10c7df1d-a15b-4d56-86eb-c1b5a8cd3d78',
            'is_active': 1,
            'is_deleted': 0,
            'menu_items': [
              {
                '_id': 1
              },
              {
                '_id': 2
              }
            ],
            'name': 'xx'
          }
        ],
        options: {
          config: {
            search: {
              enabled: false
            },
            sorting: {
              enabled: true,
              field: 'name',
              ascending: false
            },
            actionComponent: {
              enabled: false
            },
            filtering: {
              enabled: true,
              filters: [
                {
                  type: 'checkbox',
                  field: 'is_active',
                  text: 'Include Inactive',
                  enabled: true,
                  count: false
                },
                {
                  type: 'checkbox',
                  field: 'menu_items',
                  text: 'Include Empty',
                  enabled: true,
                  count: true
                }
              ]
            }
          },
          fields: [
            {
              type: 'image',
              header: false,
              field: 'name'
            },
            {
              type: 'text',
              name: 'Name',
              field: 'name',
              header: true,
              sortable: true,
              grow: 2
            },
            {
              type: 'boolean',
              name: 'Status',
              field: 'is_active',
              yes: 'Active',
              no: 'Inactive',
              header: true
            },
            {
              type: 'count',
              name: 'Count',
              field: 'menu_items',
              header: true
            }
          ]
        }
      }
    })

    return dataTable.vm.$nextTick(() => {
      const items = dataTable.find('.field-contents.menu_items')
      expect(items.is('div')).to.equal(true)
      expect(items.text()).to.equal('2')
    })
  })

  it('Sorts its columns', () => {
    let dataTable = mount(DataTable, {
      attachToDocument: true,
      localVue,
      mocks: {
        $store: {
          state: {
            config: {}
          }
        }
      },
      propsData: {
        dataset: [
          {
            '_id': '1',
            'is_active': 1,
            'is_deleted': 0,
            'menu_items': [
              {
                '_id': 1
              },
              {
                '_id': 2
              }
            ],
            'name': 'xx'
          },
          {
            '_id': '2',
            'is_active': 0,
            'is_deleted': 0,
            'menu_items': [],
            'name': 'yy'
          }
        ],
        options: {
          config: {
            search: {
              enabled: false
            },
            sorting: {
              enabled: true,
              field: 'name',
              ascending: false
            },
            actionComponent: {
              enabled: false
            },
            filtering: {
              enabled: false
            }
          },
          fields: [
            {
              type: 'image',
              header: false,
              field: 'name'
            },
            {
              type: 'text',
              name: 'Name',
              field: 'name',
              header: true,
              sortable: true,
              grow: 2
            },
            {
              type: 'boolean',
              name: 'Status',
              field: 'is_active',
              yes: 'Active',
              no: 'Inactive',
              header: true
            },
            {
              type: 'count',
              name: 'Count',
              field: 'menu_items',
              header: true
            }
          ]
        }
      }
    })

    return dataTable.vm.$nextTick(() => {
      const items = dataTable.findAll('.field-contents.menu_items')
      expect(items.at(0).is('div')).to.equal(true)
      expect(items.at(0).text()).to.equal('0')
      expect(items.at(1).text()).to.equal('2')

      const active = dataTable.findAll('.field-contents.is_active')
      expect(active.at(0).is('div')).to.equal(true)
      expect(active.at(0).text()).to.equal('Inactive')
      expect(active.at(1).text()).to.equal('Active')

      const headerCell = dataTable.findAll('.header-cell')
      headerCell.at(1).trigger('click')

      expect(active.at(1).text()).to.equal('Inactive')
      expect(active.at(0).text()).to.equal('Active')

      headerCell.at(1).trigger('click')

      expect(active.at(0).text()).to.equal('Inactive')
      expect(active.at(1).text()).to.equal('Active')
    })
  })

  it('should sort data by date if enabled', () => {
    let dataTable = mount(DataTable, {
      attachToDocument: true,
      localVue,
      propsData
    })

    return dataTable.vm.$nextTick(() => {
      let items = dataTable.findAll('.list-row')
      expect(items.length).to.equal(2)
      // dataTable.setData({ dateFrom: '2018-02-01', dateTo: '2018-03-01' })
      // dataTable.update()
      // items = dataTable.findAll('.list-row')
      // expect(items.length).to.equal(0)
    })
  })

  it('should sort data by price if enabled', () => {
    let dataTable = mount(DataTable, {
      attachToDocument: true,
      localVue,
      propsData
    })

    return dataTable.vm.$nextTick(() => {
      let items = dataTable.findAll('.list-row')
      expect(items.length).to.equal(2)
      // dataTable.setData({ amountFrom: '30', amountTo: '100' })
      // dataTable.update()
      // items = dataTable.findAll('.list-row')
      // expect(items.length).to.equal(1)
    })
  })

  it('should sort data by category if enabled', () => {
    let dataTable = mount(DataTable, {
      attachToDocument: true,
      localVue,
      propsData
    })

    return dataTable.vm.$nextTick(() => {
      let items = dataTable.findAll('.list-row')
      expect(items.length).to.equal(2)
      // dataTable.setData({ filterField: 'Cat A', filterType: 'category' })
      // dataTable.update()
      // items = dataTable.findAll('.list-row')
      // expect(items.length).to.equal(1)
    })
  })

  it('should change filter tab on click', () => {
    // const selectedTab = {
    //   type: 'tab',
    //   name: 'All transactions',
    //   field: '',
    //   filter: 'none',
    //   enabled: true,
    //   count: false,
    //   active: false
    // }
    let dataTable = mount(DataTable, {
      attachToDocument: true,
      localVue,
      propsData
    })

    return dataTable.vm.$nextTick(() => {
      // let item = dataTable.find('#active')
      // expect(item.text()).to.equal('Filter Date')
      // dataTable.vm.setActive(selectedTab)
      // dataTable.update()
      // item = dataTable.find('#active')
      // expect(item.text()).to.equal('All transactions')
    })
  })

  it('should display all data when there is no filter', () => {
    // const selectedTab = {
    //   type: 'tab',
    //   name: 'All transactions',
    //   field: '',
    //   filter: 'none',
    //   enabled: true,
    //   count: false,
    //   active: false
    // }
    let dataTable = mount(DataTable, {
      attachToDocument: true,
      localVue,
      propsData
    })

    return dataTable.vm.$nextTick(() => {
      let items = dataTable.findAll('.list-row')
      expect(items.length).to.equal(2)
      // dataTable.setData({ filterField: 'Cat DF', filterType: 'category' })
      // dataTable.update()
      // items = dataTable.findAll('.list-row')
      // expect(items.length).to.equal(0)
      // dataTable.vm.clearInput(selectedTab)
      // dataTable.update()
      // items = dataTable.findAll('.list-row')
      // expect(items.length).to.equal(2)
    })
  })
})
