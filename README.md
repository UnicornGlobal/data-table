## About this package

This is a vue2 datatable with support for sortable columns, filtering and searching. It is purely implemented with `divs`(no tables) and is mobile-first.

#### Installation

```
npm install @unicorns/datatable --save
```

#### Usage

```
// In your vue component
<template>
    <div>
        <data-table :options="tableOptions" :dataset="dataset"></data-table>
    </div>
</template>
<script>
    import DataTable from '@unicorns/data-table'
    
    export default {
        components: {
            DataTable
        },
        data(){
            return {
                tableOptions: {...},
                dataset: [{...}, {...}, {...}, ...]
            }
        }
    }
</script>
```

#### Setup

The component accepts only two props
- `options` - A configuration options object, described in details in the next section
- `dataset` - An array of data items to be rendered. The data table expects each item in the array to be an object, with each key representing a table column. If your data set consists of simple values like strings and numbers, you can use a mapping function to convert them to objects. 

#### Configuration Options 

The `options` prop is an object with the following props
- `fields` - an array of configs for each table column. Each config has the following properties
    - `header` - Boolean. Determines if the column has a header or not
    - `field` - The value key for this field in the data sets. Use dot syntax to denote nested properties
    - `name` -  Table header label
    - `type` - Possible values are `text`, `currency`, `number`, `boolean`, `component`, `count`(count of array items), `image`, `datetime`, `date`, `time` or `custom`. Additional options maybe required depending on the type selected here
    - `image` - Image url if type is `image`
    - `no` - What to render if `type` is boolean and field value is `false`
    - `yes` - What to render if `type` is boolean and field value is `true`
    - `component` - component if type is component. It can be an object, a string or function that returns a component. The function is called with the data object
    - `props` - props for field type component. It is a function which receives the row data and returns an object
    - `events` - an object with event names and handlers. Only required if field type is component
    - `symbol` - Currency symbol if type is currency
    - `value` - value if type is custom. Can be a function that returns a value or a literal value
    - `secondary` - boolean value determines if column is shown on small screens or not
    - `grow` - flex grow css property

- `config` - Has the following properties
    - `search` - search configuration
        - `enabled` - true or false. Disable or enable search
        - `placeholder` - Search box placeholder
        - `term` - search v-model
    - `filtering` - Configuration for filtering
        - `enabled` - Boolean, whether filtering is enabled or not
        - `filters` - An array of filters
            - `type` - Filter type. Can be `tabbed`, `checkbox`, or `dropdown`
            - `tabs` - An array of tab filters. Only required if `type` is `tabbed`
                - `type` - Tabbed filter type. Can be `date` or `range`
            - `field` - Field to filter
            - `value` - Initial value of checkbox or dropdown filter
            - `placeholder` - Dropdown filter placeholder
            - `options` - An array of options for dropdown filters. Can be strings or objects with `label` and `value` keys
    - `linking` - Configuration for converting a whole table row into a link
        - `enabled` - True or false to enable/disable linking
        - `link` - A function called with row data and returns a router-link `:to` prop value
- `controls` - An array of configurations for call-to-actions for each row.
    - `type` - Can be `link` or `component`
    - `href` - a callback function to return link configuration if type is link. Its called with the data for that row
    - `label` - label if type is link
    - `props` - Either a callback function or object if type is `component`
    - `events` - Events config if type is component

#### Example setup

```
    dataset: [
        {
            id: 1,
            name: 'Jon Doe',
            date_of_birth: '01-01-1970',
            role: 'admin',
            active: true
        },
        {
            id: 2,
            name: 'Jane Doe',
            date_of_birth: '01-01-1971',
            role: 'editor',
            active: false
          
        },
        {
           id: 3,
           name: 'Jane Doe',
           date_of_birth: '01-01-1971',
           role: 'manager',
           active: true
        },
    ],
    options: {
        fields: [
            {
                field: 'name',
                name: 'Name',
                type: 'text',
                header: true
            },
            {
                field: 'date_of_birth',
                name: 'Birthday',
                type: 'date',
                header: true
            },
            {
                field: 'role',
                name: 'Role',
                type: 'text',
                header: true
            },
            {
                field: 'active',
                name: 'Status',
                type: 'boolean',
                header: true,
                yes: 'Active',
                no: 'Disabled'
            }
        ],
        config: {
            filtering: {
                enabled: true,
                filters: [
                    {
                        type: 'dropdown',
                        field: 'role'
                        options: [
                            {label: 'Admin', value: 'admin'},
                            {label: 'Manager', value: 'manager'},
                            {label: 'Editor', value: 'editor'}
                        ]
                    },
                    {
                        type: 'checkbox',
                        field: 'active',
                        value: true
                    },
                    {
                        type: 'tabbed',
                        tabs: [
                            {type: 'date'}
                        ]
                    }
                ]
            },
            controls: [
                {
                    type: 'link',
                    label: 'View',
                    href: (user) => {
                       return {name: 'ViewUserProfile', props: {userId: user.id}} 
                    }
                },
                {
                    type: 'component',
                    component: 'DeleteUserDialog',
                    props: (user) => {
                        return {
                            userId: user.id,
                            name: user.name
                        }
                    },
                    events: {
                        success: () => {
                            //code to reload users list go here
                        },
                        error: () => {
                            //show an error message here
                        }
                    }
                }
            ]
        }
    }
```

#### Basic Theme Support

You can set a basic theme on the datatable.

It uses CSS modules _and_ variables and a little bit of upfront processing to override the included defaults.

To pass in the theme you now need to `Vue.use(DataTable)`

You can also add custom assets for dropdowns, checkboxes, etc.

##### Example

```
// In the host application
import DataTable from '@unicorns/datatable'

// This example will override these theme variables.
Vue.use(DataTable, {
  theme: {
    primary: '#DAB',
    secondary: '#343',
    padding: '1em',
    gap: true, // adds a gap between the filtering and the table
    rowHeight: '65px'
  },
  // you can also add custom assets
  assets: {
    dropdown: 'url(data:image/svg+xml;utf8,<svg><path stroke="#000" d="m2,2 15,15m0-15-15,15"/></svg>)'
  }
})
```
