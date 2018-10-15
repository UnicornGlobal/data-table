import TabbedFilters from '../../../src/components/TabbedFilters.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('TabbedFilters', () => {
  it('sets active tab', () => {
    let localVue = createLocalVue()

    let tabs = shallowMount(TabbedFilters, {
      localVue,
      propsData: {
        filter: {
          tabs: []
        }
      }
    })
    tabs.vm.setActive({ name: 'me' })
    expect(tabs.vm.activeTab).toMatchObject({ name: 'me' })
  })

  it('gets the correct title', () => {
    let localVue = createLocalVue()

    let tabs = shallowMount(TabbedFilters, {
      localVue,
      propsData: {
        filter: {
          tabs: []
        }
      }
    })

    expect(tabs.vm.getTitle({
      name: 'General Tab',
      type: 'null'
    })).toBe('General Tab')

    expect(tabs.vm.getTitle({
      type: 'date',
      name: 'Date'
    })).toBe('Date (All)')

    expect(tabs.vm.getTitle({
      type: 'date'
    })).toBe('Date (All)')

    expect(tabs.vm.getTitle({
      type: 'date',
      from: '12-12-1900',
      name: 'Dates'
    })).toBe('Dates (Since 12-12-1900)')

    expect(tabs.vm.getTitle({
      type: 'date',
      from: '12-12-1900'
    })).toBe('(Since 12-12-1900)')

    expect(tabs.vm.getTitle({
      type: 'date',
      to: '12-12-1900',
      name: 'Dates'
    })).toBe('Dates (Before 12-12-1900)')

    expect(tabs.vm.getTitle({
      type: 'date',
      to: '12-12-1900'
    })).toBe('(Before 12-12-1900)')

    expect(tabs.vm.getTitle({
      type: 'xx',
      from: '10',
      to: '20',
      name: 'xx'
    })).toBe('xx (10 to 20)')

    expect(tabs.vm.getTitle({
      from: '1',
      to: '10'
    })).toBe('From (1 to 10)')

    expect(tabs.vm.getTitle({
      name: 'aaa',
      from: '10',
      to: '100'
    })).toBe('aaa (10 to 100)')

    expect(tabs.vm.getTitle({
      name: 'aaadd',
      to: '100'
    })).toBe('Error')

    expect(tabs.vm.getTitle({
      name: 'aaad',
      from: '10'
    })).toBe('Error')

    expect(tabs.vm.getTitle({
      type: 'date',
      from: '10-12-1900',
      to: '12-12-1900',
      name: 'Date'
    })).toBe('Date (10-12-1900 to 12-12-1900)')

    expect(tabs.vm.getTitle({
      type: 'range'
    })).toBe('Range (All)')

    expect(tabs.vm.getTitle({
      type: 'range',
      name: 'Age'
    })).toBe('Age (All)')

    expect(tabs.vm.getTitle({
      type: 'range',
      from: 10,
      name: 'Age'
    })).toBe('Age (Above 10)')

    expect(tabs.vm.getTitle({
      type: 'range',
      from: 13
    })).toBe('(Above 13)')

    expect(tabs.vm.getTitle({
      type: 'range',
      to: 20,
      name: 'Ages'
    })).toBe('Ages (Below 20)')

    expect(tabs.vm.getTitle({
      type: 'range',
      to: 20
    })).toBe('(Below 20)')

    expect(tabs.vm.getTitle({
      type: 'range',
      from: 10,
      to: 20,
      name: 'Age'
    })).toBe('Age (10 to 20)')

    expect(tabs.vm.getTitle({
      name: 'Age',
      from: 2,
      to: 5
    })).toBe('Age (2 to 5)')

    expect(tabs.vm.getTitle({
      type: 'null',
      name: 'Name'
    })).toBe('Name')

    expect(tabs.vm.getTitle({
      type: 'null',
      name: 'Age'
    })).toBe('Age')
  })
})
