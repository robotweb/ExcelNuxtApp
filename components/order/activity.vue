<template>
    <Card class="mt-6" v-if="activity.length > 0">
        <CardHeader>
            <CardTitle>Activity</CardTitle>
        </CardHeader>
        <CardContent>
            <div v-for="(item, index) in activity" :key="item.order_activity_uuid" class="flex flex-col gap-2">
                <div class="flex items-center gap-2 mt-2">
                    <div class="flex items-center gap-2 p-2 rounded-full bg-gray-100 w-fit">
                    <Icon name="lucide:package" size="24"/>
                </div>
                <div class="flex flex-col">
                    <span class="text-sm font-medium">{{ item.order_activity_status }}</span>
                    <span class="text-sm">{{ formatDateTime(item.order_activity_created_at) }}</span>
                </div>
                </div>

                <Separator orientation="vertical" v-if="index !== activity.length - 1" class="h-[20px] bg-border bg-gray-200 ml-5" />
            </div>
        </CardContent>
    </Card>
</template>
<script>
export default {
   props: {
    activity: {
            type: Array,
            required: true
        }
    },
    methods: {
        formatDateTime(date) {
            return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
        }
    }
}
</script>
