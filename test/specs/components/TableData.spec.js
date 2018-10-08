import TableData from '../../../src/components/TableData.vue'
import { createLocalVue, shallowMount, mount } from '@vue/test-utils'

describe('TableData.vue', () => {
  it('gets number property', () => {
    let localVue = createLocalVue()

    let tableData = shallowMount(TableData, {
      localVue,
      propsData: {
        data: {name: 'test', id: 3},
        field: {field: 'id', type: 'property'}
      }
    })

    expect(tableData.vm.getProperty({name: 'test', nested: {id: 3}}, 'nested.id')).toBe('3.00')
    expect(tableData.vm.getProperty({name: 'test', nested: {id: '3'}}, 'nested.id')).toBe('3')
    expect(tableData.vm.getProperty({
      name: 'test',
      nested: {id: '3', list: [9, 5, 7]}
    }, 'nested.list.1')).toBe('5.00')
    expect(tableData.vm.getProperty({name: 'test', nested: {id: '3', list: [9, 5, 7]}}, undefined)).toBe(null)
    expect(tableData.vm.count([1, 3])).toBe(2)
  })

  it('formats price/amount', () => {
    let localVue = createLocalVue()

    let tableData = mount(TableData, {
      localVue,
      propsData: {
        data: {
          '_id': '2',
          'is_active': 0,
          'is_deleted': 0,
          'menu_items': [],
          'amount': 70,
          'category': 'Cat B',
          'created_at': '2018-01-02',
          'name': 'yy'
        },
        field: {
          type: 'currency',
          symbol: 'R',
          name: 'Total',
          field: 'amount',
          header: true,
          isArray: false,
          selector: 'amount'
        }
      }
    })

    expect(tableData.find('.field-contents__udt').text()).toBe(tableData.vm.formatAsCurrency(70))

    tableData.setProps({
      data: {
        '_id': '2',
        'is_active': 0,
        'is_deleted': 0,
        'menu_items': [],
        'amount': 'NaN',
        'category': 'Cat B',
        'created_at': '2018-01-02',
        'name': 'yy'
      }
    })

    expect(tableData.find('.field-contents__udt').text()).toBe(tableData.vm.formatAsCurrency('NaN'))
  })

  it('formats 0 price/amount', () => {
    let localVue = createLocalVue()

    let tableData = mount(TableData, {
      localVue,
      propsData: {
        data: {
          '_id': '2',
          'is_active': 0,
          'is_deleted': 0,
          'menu_items': [],
          'amount': 0,
          'category': 'Cat B',
          'created_at': '2018-01-02',
          'name': 'yy'
        },
        field: {
          type: 'currency',
          symbol: 'R',
          name: 'Total',
          field: 'amount',
          header: true,
          isArray: false,
          selector: 'amount'
        }
      }
    })
    expect(tableData.find('.field-contents__udt').text()).toBe(tableData.vm.formatAsCurrency(0))
  })

  it('computes component props when its an object', () => {
    let localVue = createLocalVue()
    let option = shallowMount(TableData, {
      localVue,
      propsData: {
        field: {
          type: 'component',
          component: 'div',
          requireProps: {
            propsFromData: {
              enabled: true,
              propFields: [
                {name: 'Name'},
                {age: 'Age'}
              ]
            },
            status: true,
            defaultProps: {
              prop1: '1',
              prop2: '2'
            }
          }
        },
        data: {
          Name: 'RealName',
          Age: 'RealAge'
        }
      }
    })
    expect(typeof option.vm.getProps()).toBe('object')
    expect(option.vm.getProps()).toMatchObject({name: 'RealName', age: 'RealAge'})
  })

  it('computes component name when its a function', () => {
    let localVue = createLocalVue()
    let option = shallowMount(TableData, {
      localVue,
      propsData: {
        field: {
          type: 'component',
          component: (data) => {
            return 'div'
          },
          requireProps: {
            propsFromData: {
              enabled: false
            },
            status: true
          }
        },
        data: {}
      }
    })
    expect(option.vm.getComponentName()).toBe('div')
  })

  it('computes component events', () => {
    let localVue = createLocalVue()
    let option = shallowMount(TableData, {
      localVue,
      propsData: {
        field: {
          type: 'component',
          component: 'div',
          requireProps: {
            propsFromData: {
              enabled: false
            },
            status: true,
            defaultProps: {
              prop1: '1',
              prop2: '2'
            }
          },
          events: {
            click: () => {}
          }
        },
        data: {}
      }
    })
    expect(option.vm.getComponentName()).toBe('div')
    expect(option.vm.getComponentEvents()).toHaveProperty('click')
  })

  it('gets custom content', () => {
    let localVue = createLocalVue()
    let option = shallowMount(TableData, {
      localVue,
      propsData: {
        field: {
          type: 'custom'
        }
      }
    })

    expect(option.vm.getCustomContent()).toBe('')

    option.setProps({
      field: {
        type: 'custom',
        value: function () {
          return 'customFunctionValue'
        }
      }
    })

    expect(option.vm.getCustomContent()).toBe('customFunctionValue')

    option.setProps({
      field: {
        type: 'custom',
        value: 'customValue'
      }
    })
    expect(option.vm.getCustomContent()).toBe('customValue')
  })

  it('formats date', () => {
    let localVue = createLocalVue()
    let option = shallowMount(TableData, {
      localVue,
      propsData: {
        field: {
          type: 'datetime'
        }
      }
    })
    let date = option.vm.formatDate('2014-12-24 09:30:00')
    expect(date.year).toBe('2014-12-24')
    expect(date.time).toBe('9:30 AM')
  })
})
