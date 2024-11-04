<template>
    <Dialog v-bind:open="isViewDialogOpen">
        <DialogContent class="">
            <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>{{ selectedOrder.task.task_name }}</DialogDescription>
            </DialogHeader>
            <div>
                <Tabs default-value="order" class="w-full">
                <TabsList>
                    <TabsTrigger value="order">
                        Order
                    </TabsTrigger>
                    <TabsTrigger value="feedback">
                        Feedback
                    </TabsTrigger>
                    <TabsTrigger value="supplier">
                        Supplier
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="order" class="h-[400px] overflow-y-auto">
                    <div class="flex justify-between items-center gap-2">
                        <div class="text-sm text-gray-500">
                           {{ new Date(selectedOrder.task.task_date).toLocaleDateString() }}
                        </div>
                        <div>
                        </div>
                    </div>
                    <div>
                        <p class="flex flex-col gap-2 my-2">
                            <Label class="font-bold">Address:</Label>
                            <a :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(selectedOrder.task.task_address)" target="_blank">{{ selectedOrder.task.task_address }}</a>
                        </p>
                        <p class="flex flex-col gap-2 py-4">
                            <Label class="font-bold">Description:</Label>
                            {{ selectedOrder.task.task_description }}
                        </p>
                    </div>
                </TabsContent>
                <TabsContent value="feedback" class="h-[400px] overflow-y-auto">
                    <Card class="my-4 p-2" v-for="feedback in selectedOrder.taskFeedback" :key="feedback.feedback_uuid">
                        <CardHeader class="flex flex-row justify-between items-center p-0">
                            <p class="text-sm text-gray-500">
                                {{ new Date(feedback.task_feedback_date).toLocaleDateString() }} {{ new Date(feedback.task_feedback_date).toLocaleTimeString() }}
                            </p>
                            <Badge class="text-sm">{{ feedback.task_feedback_status }}</Badge>
                        </CardHeader>
                        <CardContent class="p-0">
                            {{ feedback.task_feedback_notation }}
                        </CardContent>
                    </Card>
                </TabsContent>
                    <TabsContent value="supplier" class="h-[400px] overflow-y-auto">
                        <Card class="p-2" v-if="selectedOrder.supplier">
                            <CardHeader class="p-2">
                                <CardTitle>
                                    {{ selectedOrder.supplier.supplier_name }}
                                </CardTitle>
                            </CardHeader>
                            <CardContent class="p-2">
                                <div class="text-sm text-gray-500">
                                    {{ selectedOrder.supplier.supplier_phone}}
                                </div>
                                <div class="text-sm text-gray-500">
                                    <a :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(selectedOrder.supplier.supplier_address)" target="_blank">{{ selectedOrder.supplier.supplier_address }}</a>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DialogContent>
    </Dialog>
</template>
<script>
export default {
    props: {
        isViewDialogOpen: Boolean,
        selectedOrder: Object
    }
}
</script>