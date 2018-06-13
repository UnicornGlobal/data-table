import TableData from '../../../src/components/TableData.vue'
import { createLocalVue, shallow } from '@vue/test-utils'

describe('TableData.vue', () => {
  it('it gets nested property value', () => {
    let localVue = createLocalVue()
    let tableData = shallow(TableData, {
      localVue,
      propsData: {
        field: {},
        data: {}
      }
    })

    expect(tableData.vm.getProperty({order: {amount: 1234}}, 'order.amount')).toBe('1,234.00')
    expect(tableData.vm.getProperty({address: {zip: '100110'}}, 'address.zip')).toBe('100110')
  })

  it('counts length of array-fields', () => {
    let localVue = createLocalVue()
    let tableData = shallow(TableData, {
      localVue,
      propsData: {
        field: {},
        data: {}
      }
    })

    expect(tableData.vm.count([1,1,1])).toBe(3)
  })

  it('gets sum total', () => {
    let localVue = createLocalVue()
    let tableData = shallow(TableData, {
      localVue,
      propsData: {
        field: {},
        data: {}
      }
    })

    expect(tableData.vm.getSumTotal({amount: 1223}, {field: 'amount'})).toBe('1,223.00')
    expect(tableData.vm.getSumTotal({amount: 0}, {field: 'amount'})).toBe(0)
  })

  it('computes component props when its an object', () => {
    let localVue = createLocalVue()
    let option = shallow(TableData, {
      localVue,
      propsData: {
        field: {
          type: 'component',
          component: 'div',
          requireProps: {
            propsFromData: {
              enabled: true,
              propFields: [{field: 'name'}]
            },
            status: true,
            defaultProps: {
              prop1: '1',
              prop2: '2'
            }
          }
        },
        data: {
          name: 'fakeName'
        }
      }
    })
    expect(option.vm.getProps()).toMatchObject({field: 'fakeName'})
  })

  it('gets component default props', () => {
    let localVue = createLocalVue()
    let option = shallow(TableData, {
      localVue,
      propsData: {
        field: {
          type: 'component',
          component: 'div',
          name: 'fakeName',
          requireProps: {
            propsFromData: {
              enabled: false,
              propFields: [{field: 'name'}]
            },
            status: true,
            defaultProps: {
              prop1: '1',
              prop2: '2'
            }
          }
        },
        data: {}
      }
    })
    expect(option.vm.getProps()).toMatchObject({prop1: '1', prop2: '2'})
  })

  it('computes component name when its a function', () => {
    let localVue = createLocalVue()
    let option = shallow(TableData, {
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
            status: true,
            defaultProps: {
              prop1: '1',
              prop2: '2'
            }
          }
        },
        data: {}
      }
    })
    expect(option.vm.getComponentName()).toBe('div')
  })

  it('computes component name when its a string', () => {
    let localVue = createLocalVue()
    let option = shallow(TableData, {
      localVue,
      propsData: {
        field: {
          type: 'component',
          component: 'span',
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
    expect(option.vm.getComponentName()).toBe('span')
  })

  it('computes component events', () => {
    let localVue = createLocalVue()
    let option = shallow(TableData, {
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

  it('its gets custom content value', () => {
    let localVue = createLocalVue()
    let option = shallow(TableData, {
      localVue,
      propsData: {
        field: {
          type: 'custom'
        },
        data: {name: 'sweet name'}
      }
    })

    expect(option.vm.getCustomContent()).toBe('')

    option.setProps({field: {type: 'custom', value: (data) => {return data.name}}})
    expect(option.vm.getCustomContent()).toBe('sweet name')

    option.setProps({field: {type: 'custom', value: 'sweeter name'}})
    expect(option.vm.getCustomContent()).toBe('sweeter name')
  })


  it('formats dates', () => {
    let localVue = createLocalVue()
    let option = shallow(TableData, {
      localVue,
      propsData: {
        field: {
          type: 'custom'
        },
        data: {}
      }
    })

    expect(option.vm.formatDate('1900-12-12 23:34:23')).toMatchObject({date: '1900-12-12', time: '11:34 PM'})
  })

  it('formats the price/amount', () => {
    let localVue = createLocalVue()
    let tableData = shallow(TableData, {
      localVue,
      propsData: {
        data: {
          '_id': '2',
          'is_active': 0,
          'is_deleted': 0,
          'menu_items': [],
          'amount': 20.00,
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
    expect(tableData.find('.field-contents').text()).toBe('R 20.00')
  })
})
