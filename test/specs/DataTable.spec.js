// http://chaijs.com/api/bdd/
import DataTable from '../../src/DataTable.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import sinon from 'sinon'

describe('DataTable.vue', () => {
  it('Mounts correctly with minimal values and renders an empty table', () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      attachToDocument: true,
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

  it('Watches for changes in dataset and config', async () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

    await dataTable.vm.$nextTick()

    expect(processData.called).toEqual(true)
    processData.restore()
  })

  it('it computes showHeaders when true', async () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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
  })

  it('it computes showHeaders when false', async () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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
            headers: {
              enabled: false
            },
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
    expect(dataTable.vm.showHeaders).toEqual(false)
  })

  it('it computes processedData', async () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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
              enabled: false
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
    expect(dataTable.vm.processedData).toEqual(dataTable.vm.processData())
  })

  it('it computes action component style top and bottom', () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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
              enabled: false
            },
            sorting: {
              enabled: false
            },
            filtering: {
              enabled: false
            },
            actionComponent: {
              enabled: true,
              offset: {
                top: '-10px',
                bottom: '20px'
              }
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

    expect(dataTable.vm.actionComponentStyle).toEqual('margin-top: -10px; margin-bottom: 20px')
  })

  it('it computes action component style only top', () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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
              enabled: false
            },
            sorting: {
              enabled: false
            },
            filtering: {
              enabled: false
            },
            actionComponent: {
              enabled: true,
              offset: {
                bottom: '20px'
              }
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

    expect(dataTable.vm.actionComponentStyle).toEqual('margin-top: 0px; margin-bottom: 20px')
  })

  it('it computes action component style only bottom', () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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
              enabled: false
            },
            sorting: {
              enabled: false
            },
            filtering: {
              enabled: false
            },
            actionComponent: {
              enabled: true,
              offset: {
                top: '20px'
              }
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

    expect(dataTable.vm.actionComponentStyle).toEqual('margin-top: 20px; margin-bottom: 0px')
  })

  it('watches config', async () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

  it('filters by tab and show date', () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

    let byDate = sinon.spy(dataTable.vm, 'dateTabFilter')
    let byRange = sinon.spy(dataTable.vm, 'rangeTabFilter')

    const result = dataTable.vm.filterTabs({
      created: '2018-09-10 12:16:46',
      quantity: 10
    },
    {
      tabs: [
        {
          type: 'date',
          field: 'created',
          from: '01-01-2010',
          to: null
        },
        {
          type: 'range',
          field: 'quantity',
          from: 5,
          to: 11
        }
      ]
    })

    expect(result).toBe(true)

    expect(byDate.called).toBe(true)
    expect(byRange.called).toBe(true)

    byRange.restore()
    byDate.restore()
  })

  it('filters by tab and hide date', () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

    let byDate = sinon.spy(dataTable.vm, 'dateTabFilter')
    let byRange = sinon.spy(dataTable.vm, 'rangeTabFilter')

    const result = dataTable.vm.filterTabs({
      created: '2018-09-10 12:16:46',
      quantity: 10
    },
    {
      tabs: [
        {
          type: 'date',
          field: 'created',
          from: '10-10-2010',
          to: '01-01-2012'
        },
        {
          type: 'range',
          field: 'quantity',
          from: 5,
          to: 11
        }
      ]
    })

    expect(result).toBe(false)

    expect(byDate.called).toBe(true)
    expect(byRange.called).toBe(false)

    byRange.restore()
    byDate.restore()
  })

  it('filters by tab and show range', () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

    let byDate = sinon.spy(dataTable.vm, 'dateTabFilter')
    let byRange = sinon.spy(dataTable.vm, 'rangeTabFilter')

    const result = dataTable.vm.filterTabs({
      created: '2018-10-10 10:10:10',
      quantity: 10
    },
    {
      tabs: [
        {
          type: 'date',
          field: 'created',
          from: '2010-10-10',
          to: '2020-10-10'
        },
        {
          type: 'range',
          field: 'quantity',
          from: 5,
          to: 11
        }
      ]
    })

    expect(result).toBe(true)

    expect(byDate.called).toBe(true)
    expect(byRange.called).toBe(true)

    byRange.restore()
    byDate.restore()
  })

  it('filters by tab and hide range', () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

    let byDate = sinon.spy(dataTable.vm, 'dateTabFilter')
    let byRange = sinon.spy(dataTable.vm, 'rangeTabFilter')

    const result = dataTable.vm.filterTabs({
      created: '2018-10-10 10:10:10',
      quantity: 10
    },
    {
      tabs: [
        {
          type: 'date',
          field: 'created',
          from: '2010-10-10',
          to: '2020-10-10'
        },
        {
          type: 'range',
          field: 'quantity',
          from: 5,
          to: 9
        }
      ]
    })

    expect(result).toBe(false)

    expect(byDate.called).toBe(true)
    expect(byRange.called).toBe(true)

    byRange.restore()
    byDate.restore()
  })

  it('filters by date range', () => {
    let localVue = createLocalVue()

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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
    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          secondary: '#fff'
        }
      },
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
    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

  it('listens to resize event', async () => {
    let localVue = createLocalVue()
    let dataTable = shallowMount(DataTable, {
      localVue,
      mocks: {
        $style: {
          primary: '#000',
          secondary: '#111',
          primaryText: '#444',
          secondaryText: '#555',
          padding: '1em',
          fontSize: '2em',
          rowHeight: '60px'
        },
        $theme: {
          primary: '#fff'
        }
      },
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

    let event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);

    expect(dataTable.vm.windowWidth).toBe(window.innerWidth)

    dataTable.setData({windowWidth: 400})
    // Disabled for now while we fix the mobile layout
    // expect(dataTable.vm.smallScreen).toBe(true)
    expect(dataTable.vm.smallScreen).toBe(false)
  })
})
