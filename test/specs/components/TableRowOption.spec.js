import TableRowOption from '../../../src/components/TableRowOption.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import sinon from 'sinon'

describe('TableRowOption', () => {
  it('has props and computed props', () => {
    expect(TableRowOption.props).toMatchObject({
      config: { type: null },
      data: { type: null }
    }
    )
    expect(Object.keys(TableRowOption.computed)).toEqual(expect.arrayContaining(['componentName', 'componentProps', 'componentEvents']))
  })

  it('computes component props when its an object', () => {
    const localVue = createLocalVue()
    const option = shallowMount(TableRowOption, {
      localVue,
      propsData: {
        config: {
          type: 'component',
          component: 'div',
          props: {
            prop1: '1',
            prop2: '2'
          }
        }
      }
    })
    expect(option.vm.componentProps).toMatchObject({ prop1: '1', prop2: '2' })
  })

  it('computes component props when its a function', () => {
    const localVue = createLocalVue()
    const option = shallowMount(TableRowOption, {
      localVue,
      propsData: {
        config: {
          type: 'component',
          component: 'div',
          props: (data) => {
            return {
              prop1: data.name,
              prop2: data.desc
            }
          }
        },
        data: {
          name: 'name',
          desc: 'description'
        }
      }
    })
    expect(option.vm.componentName).toBe('div')
    expect(option.vm.componentProps).toMatchObject({ prop1: 'name', prop2: 'description' })
  })

  it('computes component name when its a function', () => {
    const localVue = createLocalVue()
    const option = shallowMount(TableRowOption, {
      localVue,
      propsData: {
        config: {
          type: 'component',
          component: (data) => {
            return 'div'
          }
        }
      }
    })
    expect(option.vm.componentName).toBe('div')
  })

  it('computes component events', () => {
    const localVue = createLocalVue()
    const option = shallowMount(TableRowOption, {
      localVue,
      propsData: {
        config: {
          type: 'component',
          component: 'div',
          events: {
            click: () => {}
          }
        }
      }
    })
    expect(option.vm.componentName).toBe('div')
    expect(option.vm.componentEvents).toHaveProperty('click')
  })

  it('invokes onClick callback from control of type "link"', function () {
    const localVue = createLocalVue()
    const handleClick = sinon.spy()
    const option = shallowMount(TableRowOption, {
      localVue,
      stubs: ['router-link'],
      propsData: {
        config: {
          type: 'link',
          href: '#',
          label: 'Link',
          onClick: handleClick
        },
        data: [1, 2]
      }
    })
    option.trigger('click')
    expect(handleClick.called).toBe(true)
  })
})
