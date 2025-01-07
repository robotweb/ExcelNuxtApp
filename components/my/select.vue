<template>
    <Select>
        <SelectTrigger>
            <SelectValue placeholder="Select" :value="value"/>
        </SelectTrigger>
        <SelectContent>
            <SelectItem v-if="dataKey && dataLabel" v-for="option in options" :key="option[dataKey]" :value="option[dataKey]">
                {{ option[dataLabel] }}
            </SelectItem>
            <SelectItem v-else v-for="option in options" :key="option" :value="option">{{ option }}</SelectItem>
        </SelectContent>
    </Select>
</template>

<script>
export default {
    name: 'MySelect',
    props: {
        options: {
            type: Array, Object,
            required: true
        },
        dataKey: {
            type: String,
            required: false,
        },
        dataLabel: {
            type: String,
            required: false,
        }
    }
}
</script>