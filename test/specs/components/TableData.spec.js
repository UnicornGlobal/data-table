// import TableData from '../../../src/components/TableData.vue'
// import { createLocalVue, shallow } from '@vue/test-utils'
//
// describe('TableData.vue', () => {
//   it('gets number property', () => {
//     let localVue = createLocalVue()
//     let tableData = shallow(TableData, {
//       localVue,
//       propsData: {
//         data: {name: 'test', id: 3},
//         field: {field: 'id', type: 'property'}
//       }
//     })
//
//     expect(tableData.vm.getProperty({name: 'test', nested: {id: 3}}, 'nested.id')).to.equal('3.00')
//     expect(tableData.vm.getProperty({name: 'test', nested: {id: '3'}}, 'nested.id')).to.equal('3')
//     expect(tableData.vm.count([1, 3])).to.equal(2)
//   })
//
//   it('formats the price/amount', () => {
//     let localVue = createLocalVue()
//     let tableData = shallow(TableData, {
//       localVue,
//       propsData: {
//         data: {
//           '_id': '2',
//           'is_active': 0,
//           'is_deleted': 0,
//           'menu_items': [],
//           'amount': 20.00,
//           'category': 'Cat B',
//           'created_at': '2018-01-02',
//           'name': 'yy'
//         },
//         field: {
//           type: 'currency',
//           symbol: 'R',
//           name: 'Total',
//           field: 'amount',
//           header: true,
//           isArray: false,
//           selector: 'amount'
//         }
//       }
//     })
//     expect(tableData.find('.field-contents').element.innerText).to.equal('\n  R 20.00\n')
//   })
//
//   it('computes component props when its an object', () => {
//     let localVue = createLocalVue()
//     let option = shallow(TableData, {
//       localVue,
//       propsData: {
//         field: {
//           type: 'component',
//           component: 'div',
//           requireProps: {
//             propsFromData: {
//               enabled: false
//             },
//             status: true,
//             defaultProps: {
//               prop1: '1',
//               prop2: '2'
//             }
//           }
//         },
//         data: {}
//       }
//     })
//     expect(option.vm.getProps()).to.be.an('object')
//     expect(option.vm.getProps()).to.deep.equal({prop1: '1', prop2: '2'})
//   })
//
//   it('computes component name when its a function', () => {
//     let localVue = createLocalVue()
//     let option = shallow(TableData, {
//       localVue,
//       propsData: {
//         field: {
//           type: 'component',
//           component: (data) => {
//             return 'div'
//           },
//           requireProps: {
//             propsFromData: {
//               enabled: false
//             },
//             status: true,
//             defaultProps: {
//               prop1: '1',
//               prop2: '2'
//             }
//           }
//         },
//         data: {}
//       }
//     })
//     expect(option.vm.getComponentName()).to.equal('div')
//   })
//
//   it('computes component events', () => {
//     let localVue = createLocalVue()
//     let option = shallow(TableData, {
//       localVue,
//       propsData: {
//         field: {
//           type: 'component',
//           component: 'div',
//           requireProps: {
//             propsFromData: {
//               enabled: false
//             },
//             status: true,
//             defaultProps: {
//               prop1: '1',
//               prop2: '2'
//             }
//           },
//           events: {
//             click: () => {}
//           }
//         },
//         data: {}
//       }
//     })
//     expect(option.vm.getComponentName()).to.equal('div')
//     expect(option.vm.getComponentEvents()).to.be.an('object').that.has.all.keys('click')
//   })
// })
