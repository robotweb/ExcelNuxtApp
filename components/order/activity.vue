<template>
    <Card class="mt-6" v-if="activity.length > 0">
        <CardHeader>
            <CardTitle>Activity</CardTitle>
        </CardHeader>
        <CardContent>
            <Stepper orientation="vertical" class="flex flex-col gap-4">
                <StepperItem
                    v-for="(item, index) in activity"
                    :key="item.order_activity_uuid"
                    :step="index + 1">
                    <StepperTrigger>
                        <StepperIndicator>
                            <Icon name="lucide:package" class="w-4 h-4" />
                        </StepperIndicator>
                        <div class="flex flex-col">
                            <StepperTitle class="text-sm font-medium">
                                    {{ item.order_activity_status }}
                            </StepperTitle>
                            <StepperDescription class="text-sm">
                                {{ formatDateTime(item.order_activity_created_at) }}
                            </StepperDescription>
                        </div>
                    </StepperTrigger>
                    <StepperSeparator v-if="index !== activity.length - 1" />
                </StepperItem>
            </Stepper>
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
