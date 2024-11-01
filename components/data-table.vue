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
            <TableRow v-for="row in data" :key="row.id">
                <TableCell v-for="column in columns" :key="column.key">
                    <FlexRender>{{ row[column.key] }}</FlexRender>
                </TableCell>
                <TableCell v-if="actions">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm"><Icon name="lucide:ellipsis"/></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
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

    }
}
</script>