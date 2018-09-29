## About this package
This is a vue2 datatable with support for sortable columns, filtering and searching. It is purely implemented with `divs`(no tables) and is mobile-first.

#### Installation
```
npm install unicorn-vue-datatable --save
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
    import DataTable from 'unicorn-vue-datatable'
    
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
The options prop is an object with the following props
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

- `config` - Has the following properties
    - `search` - search configuration
        - `enabled` - true or false. Disable or enable search
        - `placeholder` - Search box placeholder
        - `term` - search v-model