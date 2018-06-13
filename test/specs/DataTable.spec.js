// http://chaijs.com/api/bdd/
import DataTable from '../../src/DataTable.vue'
import { createLocalVue, shallow } from '@vue/test-utils'
import sinon from 'sinon'

describe('DataTable.vue', () => {
  it('Mounts correctly with minimal values and renders an empty table', () => {
    let localVue = createLocalVue()

    let dataTable = shallow(DataTable, {
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

    expect(dataTable.contains('div')).toEqual(true)
    const element = dataTable.find('.no-results')
    expect(element.is('div')).toEqual(true)
    expect(element.text()).toEqual('No Results. Please broaden your search parameters.')
  })

  it('Watches for changes in dataset and config', () => {
    let localVue = createLocalVue()

    let dataTable = shallow(DataTable, {
      localVue,
      propsData: {
        dataset: [
          {
            'is_active': true,
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
            filtering: {
              enabled: false
            }
          },
          fields: [
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

    let processData = sinon.spy(dataTable.vm, 'processData')
    dataTable.setProps({
      dataset: [
        {
          'is_active': false,
          'menu_items': [],
          'name': 'xx'
        },
        {
          'is_active': false,
          'menu_items': [],
          'name': 'xx'
        }
      ]
    })

    expect(processData.called).toEqual(true)
    processData.restore()
  })

  it('it computes showHeaders and processedData', async () => {
    let localVue = createLocalVue()

    let dataTable = shallow(DataTable, {
      localVue,
      propsData: {
        dataset: [
          {
            'is_active': true,
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
            filtering: {
              enabled: false
            }
          },
          fields: [
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

    await dataTable.vm.$nextTick()
    expect(dataTable.vm.showHeaders).toEqual(true)
    expect(dataTable.vm.processedData).toEqual(dataTable.vm.processData())
  })

  it('watches config', async () => {
    let localVue = createLocalVue()

    let dataTable = shallow(DataTable, {
      localVue,
      propsData: {
        dataset: [],
        options: {
          config: {
            sorting: {
              field: 'address.street',
              ascending: false
            },
            filtering: {},
            search: {
              enabled: true,
              field: 'name',
              term: 'xx'
            },
            linking: {}
          }
        }
      }
    })

    let spy = sinon.stub(dataTable.vm, 'processData').returns(true)
    dataTable.setProps({
      options: {
        config: {
          sorting: {
            field: 'address.name',
            ascending: true
          },
          filtering: {},
          search: {
            enabled: false,
            field: 'name',
            term: 'ddd'
          },
          linking: {}
        }
      }
    })

    await dataTable.vm.$nextTick()
    expect(spy.called).toBe(true)
    spy.restore()
  })

  it('processes data', () => {
    let localVue = createLocalVue()

    let dataTable = shallow(DataTable, {
      localVue,
      propsData: {
        dataset: [
          {
            'is_active': true,
            'closed_on': [1, 2],
            'menu_items': [],
            'name': 'jj',
            'created': '10-12-1992',
            'updated': '14-12-1992',
            'required': 15,
            'supplied': 10,
            'address': {'place': 'abc'}
          },
          {
            'is_active': true,
            'closed_on': [1, 2, 3],
            'menu_items': [],
            'name': 'kkk',
            'created': '10-12-1992',
            'updated': '14-12-1992',
            'required': 15,
            'supplied': 10,
            'address': {'place': 'fgh'}
          },
          {
            'is_active': true,
            'closed_on': [1, 2, 3, 4],
            'menu_items': [],
            'name': 'jggf',
            'created': '10-12-1992',
            'updated': '14-12-1992',
            'required': 15,
            'supplied': 13,
            'address': {'place': 'cde'}
          },
          {
            'is_active': true,
            'closed_on': [1, 2, 3, 4],
            'menu_items': [],
            'name': 'xx',
            'created': '10-12-1992',
            'updated': '14-12-1992',
            'required': 15,
            'supplied': 13,
            'address': {'place': 'cde'}
          }
        ],
        options: {
          config: {
            headers: {
              enabled: true
            },
            search: {
              enabled: true,
              field: 'name',
              term: 'x',
              placeholder: 'Search'
            },
            sorting: {
              enabled: true,
              field: 'address.place'
            },
            filtering: {
              enabled: true,
              filters: [
                {
                  enabled: false,
                  field: 'is_active',
                  value: true,
                  type: 'checkbox',
                  collection: false
                },
                {
                  enabled: true,
                  field: 'is_active',
                  value: true,
                  type: 'checkbox',
                  collection: false
                },
                {
                  enabled: true,
                  field: 'closed_on',
                  value: true,
                  type: 'checkbox',
                  collection: true
                },
                {
                  enabled: true,
                  field: 'name',
                  value: 'xx',
                  type: 'dropdown'
                },
                {
                  enabled: true,
                  field: 'name',
                  value: '',
                  type: 'dropdown'
                },
                {
                  enabled: true,
                  field: 'menu_items',
                  type: 'tabbed',
                  tabs: [
                    {
                      type: 'date',
                      field: 'created',
                      from: '11-12-1992',
                      to: '14-12-1992'
                    },
                    {
                      type: 'date',
                      field: 'updated',
                      from: '11-12-1992',
                      to: '13-12-1992'
                    },
                    {
                      type: 'range',
                      field: 'supplied',
                      from: 11,
                      to: 14
                    },
                    {
                      type: 'range',
                      field: 'required',
                      from: 11,
                      to: 16
                    }
                  ]
                }
              ]
            }
          },
          fields: [
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
              name: 'Closed',
              field: 'closed_on',
              header: true
            },
            {
              type: 'count',
              name: 'Menus',
              field: 'menu_items',
              header: true
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
              name: 'Created',
              type: 'date',
              field: 'created',
              header: true
            },
            {
              name: 'Updated',
              type: 'date',
              field: 'updated',
              header: true
            },
            {
              name: 'Required',
              type: 'number',
              field: 'required',
              header: true
            },
            {
              name: 'Supplied',
              type: 'number',
              field: 'supplied',
              header: true
            },
            {
              name: 'Address',
              type: 'property',
              field: 'address'
            }
          ]
        }
      }
    })

    dataTable.vm.processData()
    expect(typeof dataTable.vm.processedDataset).toEqual('object')
  })

  it('searches if searching is enabled', () => {
    let localVue = createLocalVue()

    let dataTable = shallow(DataTable, {
      localVue,
      propsData: {
        dataset: [],
        options: {
          config: {
            sorting: {
              field: 'address.street',
              ascending: false
            },
            filtering: {},
            search: {
              enabled: true,
              field: 'name',
              term: 'xx'
            },
            linking: {}
          }
        }
      }
    })

    expect(dataTable.vm.search([{name: 'xxxx'}, {name: 'yyyy'}])).toHaveLength(1)
  })

  it('filters by checkboxes', () => {
    let localVue = createLocalVue()

    let dataTable = shallow(DataTable, {
      localVue,
      propsData: {
        dataset: [],
        options: {
          config: {
            sorting: {
              field: 'address.street',
              ascending: false
            },
            filtering: {},
            search: {
              enabled: true,
              field: 'name',
              term: 'xx'
            },
            linking: {}
          }
        }
      }
    })

    expect(dataTable.vm.filterCheckbox({active: true}, {field: 'active', value: true})).toBe(true)
    expect(dataTable.vm.filterCheckbox({active: [1, 2]}, {field: 'active', value: true, collection: true})).toBe(true)
    expect(dataTable.vm.filterCheckbox({active: []}, {field: 'active', value: false, collection: true})).toBe(false)
  })

  it('filters by tabs', () => {
    let localVue = createLocalVue()

    let dataTable = shallow(DataTable, {
      localVue,
      propsData: {
        dataset: [],
        options: {
          config: {
            sorting: {
              field: 'address.street',
              ascending: false
            },
            filtering: {},
            search: {
              enabled: true,
              field: 'name',
              term: 'xx'
            },
            linking: {}
          }
        }
      }
    })

    let byDate = sinon.stub(dataTable.vm, 'dateTabFilter').returns(true)
    let byRange = sinon.stub(dataTable.vm, 'rangeTabFilter').returns(true)

    dataTable.vm.filterTabs({}, {tabs: [{type: 'date'}, {type: 'range'}]})
    expect(byDate.called).toBe(true)
    expect(byRange.called).toBe(true)
    byRange.restore()
    byDate.restore()
  })

  it('filters by date range', () => {
    let localVue = createLocalVue()

    let dataTable = shallow(DataTable, {
      localVue,
      propsData: {
        dataset: [],
        options: {
          config: {
            sorting: {
              field: 'address.street',
              ascending: false
            },
            filtering: {},
            search: {
              enabled: true,
              field: 'name',
              term: 'xx'
            },
            linking: {}
          }
        }
      }
    })

    expect(dataTable.vm.dateTabFilter({date: '12-12-1900'}, {field: 'date', from: '13-12-1900'})).toBe(false)
    expect(dataTable.vm.dateTabFilter({date: '12-12-1900'}, {field: 'date', to: '10-12-1900'})).toBe(false)
    expect(dataTable.vm.dateTabFilter({date: '12-12-1900'}, {field: 'date', to: '13-12-1900'})).toBe(true)
  })

  it('filters by number range', () => {
    let localVue = createLocalVue()

    let dataTable = shallow(DataTable, {
      localVue,
      propsData: {
        dataset: [],
        options: {
          config: {
            sorting: {
              field: 'address.street',
              ascending: false
            },
            filtering: {},
            search: {
              enabled: true,
              field: 'name',
              term: 'xx'
            },
            linking: {}
          }
        }
      }
    })

    expect(dataTable.vm.rangeTabFilter({count: 10}, {field: 'count', from: 11})).toBe(false)
    expect(dataTable.vm.rangeTabFilter({count: 10}, {field: 'count', to: 9})).toBe(false)
    expect(dataTable.vm.rangeTabFilter({count: 10}, {field: 'count', from: 9})).toBe(true)
    expect(dataTable.vm.rangeTabFilter({count: 10}, {field: 'count', to: 15})).toBe(true)
  })

  it('gets style', () => {
    let localVue = createLocalVue()

    let dataTable = shallow(DataTable, {
      localVue,
      propsData: {
        dataset: [
          {
            'is_active': true,
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
            filtering: {
              enabled: false
            }
          },
          fields: [
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

    expect(dataTable.vm.getStyle({grow: 1})).toEqual('flex: 1')
    expect(dataTable.vm.getStyle({type: 'image'})).toEqual('flex: 0; min-width: 50px;')
    expect(dataTable.vm.getStyle({type: 'component'})).toEqual('flex: 0;')
    expect(dataTable.vm.getStyle({type: 'text'})).toEqual('flex: 1')
  })

  it('compares values - ascending order', () => {
    let localVue = createLocalVue()
    let dataTable = shallow(DataTable, {
      localVue,
      propsData: {
        dataset: [],
        options: {
          config: {
            sorting: {
              field: 'address.street',
              ascending: false
            },
            filtering: {},
            search: {},
            linking: {}
          }
        }
      }
    })

    expect(dataTable.vm.compare({address: {street: 'abc'}}, {address: {street: 'def'}})).toBe(1)
    expect(dataTable.vm.compare({address: {street: 'def'}}, {address: {street: 'abc'}})).toBe(-1)
    expect(dataTable.vm.compare({address: {street: 'def'}}, {address: {street: 'def'}})).toBe(0)
  })

  it('compares values - descending order', () => {
    let localVue = createLocalVue()
    let dataTable = shallow(DataTable, {
      localVue,
      propsData: {
        dataset: [],
        options: {
          config: {
            sorting: {
              field: 'name',
              ascending: true
            },
            filtering: {},
            search: {},
            linking: {}
          }
        }
      }
    })

    expect(dataTable.vm.compare({name: 'abc'}, {name: 'def'})).toBe(-1)
    expect(dataTable.vm.compare({name: 'def'}, {name: 'abc'})).toBe(1)
    expect(dataTable.vm.compare({name: 'def'}, {name: 'def'})).toBe(0)
  })
})
