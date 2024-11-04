<template>
    <Dialog v-bind:open="isOrderFeedbackDialogOpen">
        <DialogContent>
            <div class="flex flex-col gap-2 w-full">
                <label for="feedback"><span class="font-bold">{{ selectedOrder.task_name }}</span> Feedback</label>
                <Textarea id="feedback" placeholder="Feedback" v-model="form.feedback"/>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <Label>Attachment</Label>
                <Input type="file" @change="handleFileChange" v-model="form.attachment"/>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <Label>Status</Label>
                <Select v-model="form.status">
                    <SelectTrigger>
                        <SelectValue placeholder="Select order status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="collected">Collected</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div class="flex justify-end">
                <Button @click="addFeedback">Add Feedback</Button>
            </div>
        </DialogContent>
    </Dialog>
</template>
<script>
export default {
    props: {
        isOrderFeedbackDialogOpen: {
            type: Boolean,
            required: true
        },
        selectedOrder: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            form: {
                feedback: '',
                attachment: null,
                status: ''
            }
        }
    },
    methods: {
        addFeedback
    }
}

async function addFeedback() {
    const api = useApi()
    const feedback = {
        task_feedback_task_uuid: this.selectedOrder.task_uuid,
        task_feedback_notation: this.form.feedback,
        task_feedback_status: this.form.status,
        //task_feedback_attachment: this.form.attachment
    }
    console.log(feedback)
    await api.post('task/create_feedback', feedback)
    .then(response => {
        console.log(response)
        this.$emit('success')
        this.form = {
            feedback: '',
            attachment: null,
            status: ''
        }
    })
    .catch(error => {
        throw new Error(error)
    })
}
</script>