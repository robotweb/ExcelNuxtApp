<template>
<div>
    <Table class="rounded-md border">
        <TableHeader>
            <TableHead v-for="column in columns" :key="column.key">
                <FlexRender>{{ column.label }}</FlexRender>
            </TableHead>
            <TableHead v-if="actions"></TableHead>
        </TableHeader>
        <TableBody>
            <TableRow v-for="row in data" :key="row.id" @click="rowClick(row)" class="cursor-pointer">
                <TableCell v-for="column in columns" :key="column.key" :class="[column.width, 'truncate max-w-[200px]']">
                    <FlexRender v-if="column.component">
                        <div v-if="column.component === 'StatusBadge'">
                            <StatusBadge :variant="row[column.key]">{{ row[column.key] }}</StatusBadge>
                        </div>
                    </FlexRender>
                    <FlexRender v-else>{{ row[column.key] }}</FlexRender>
                </TableCell>
                <TableCell v-if="actions" class="flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm"><Icon name="lucide:ellipsis"/></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem v-for="action in actions" :key="action.key" @click="action.onClick(row)">
                                    <Icon :name="action.icon" size="24"/>
                                    <span>{{ action.label }}</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</div>    
</template>
<script>
export default {
    props: {
        data: {
            type: Array,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
        actions: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            selectedRow: null,
            
        }
    },
    methods: {
        rowClick(row) {
            this.$emit('row-click', row)
        }
    }
}
</script>
<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>