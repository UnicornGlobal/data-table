import DatePicker from '../../../src/components/DatePicker.vue'
import { createLocalVue, shallow, mount } from '@vue/test-utils'
import Pickaday from 'pikaday'
import sinon from 'sinon'

describe('DatePicker.vue', () => {
  it('initializes', () => {
    let localVue = createLocalVue()
    let picker = mount(DatePicker, {localVue, propsData: {name: 'date', value: '12-12-1900', format: 'DD-MM-YYYY'}})
    expect(picker.vm.picker).toBeInstanceOf(Pickaday)
    expect(picker.vm.inputName).toEqual('date')
    expect(picker.vm.format).toEqual('DD-MM-YYYY')
    expect(picker.vm.value).toEqual('12-12-1900')
  })

  it('sets default input-name', () => {
    let localVue = createLocalVue()
    let picker = mount(DatePicker, {localVue, propsData: {value: '12-12-1900', format: 'DD-MM-YYYY'}})
    expect(picker.vm.inputName).toEqual('date')
  })

  it('sets new date', async () => {
    let localVue = createLocalVue()
    let picker = mount(DatePicker, {localVue, propsData: {name: 'date', value: '12-12-1900', format: 'DD-MM-YYYY'}})
    expect(picker.vm.value).toEqual('12-12-1900')

    let setDate = sinon.spy(picker.vm.picker, 'setDate')
    picker.setProps({value: '14-12-1900'})
    await picker.vm.$nextTick()
    expect(setDate.called).toEqual(true)
    setDate.restore()
  })
})