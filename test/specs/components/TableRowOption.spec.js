import TableRowOption from '../../../src/components/TableRowOption.vue'
import { createLocalVue, shallow } from '@vue/test-utils'

describe('TableRowOption', () => {
  it('has props and computed props', () => {
    expect(TableRowOption.props).to.be.an('array').that.has.members(['config', 'data'])
    expect(TableRowOption.computed).to.be.an('object').that.has.all.keys('componentName', 'componentProps', 'componentEvents')
  })

  it('computes component props when its an object', () => {
    let localVue = createLocalVue()
    let option = shallow(TableRowOption, {
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
    expect(option.vm.componentProps).to.be.an('object')
    expect(option.vm.componentProps).to.deep.equal({prop1: '1', prop2: '2'})
  })

  it('computes component props when its a function', () => {
    let localVue = createLocalVue()
    let option = shallow(TableRowOption, {
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
    expect(option.vm.componentName).to.equal('div')
    expect(option.vm.componentProps).to.be.an('object')
    expect(option.vm.componentProps).to.deep.equal({prop1: 'name', prop2: 'description'})
  })

  it('computes component name when its a function', () => {
    let localVue = createLocalVue()
    let option = shallow(TableRowOption, {
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
    expect(option.vm.componentName).to.equal('div')
  })

  it('computes component events', () => {
    let localVue = createLocalVue()
    let option = shallow(TableRowOption, {
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
    expect(option.vm.componentName).to.equal('div')
    expect(option.vm.componentEvents).to.be.an('object').that.has.all.keys('click')
  })
})
