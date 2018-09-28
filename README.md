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
    - `header` - Boolean. Determines is the field has a header or not
    - `field` - The value key for this field in the data sets
    - `name` -  Table header label
    - `type` - Possible values are `text`, `currency`, `number`, `boolean`, `component`, `count`, `image`, `property`, `datetime`, `date`, `time` or `custom`. Additional options for are required depending on the type selected here