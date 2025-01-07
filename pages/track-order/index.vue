<template>
    <div class="flex flex-col gap-2 w-full h-[100vh] justify-center items-center">
        <Button @click="navigateTo('/')" class="absolute top-4 left-4">
            <Icon name="lucide:arrow-left" class="mr-2"/> Back
        </Button>
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle>Enter your tracking number:</CardTitle>
            </CardHeader>
            <CardContent>
                <Input v-model="orderId" placeholder="Order ID" />
            </CardContent>
            <CardFooter>
                <Button @click="trackOrder">Lookup order</Button>
            </CardFooter>
        </Card>
        <OrderActivity :activity="activity" class="w-full max-w-md" v-if="activity.length > 0"/>
    </div>
</template>

<script>
export default {
    name: 'TrackOrder',
    data() {
        return {
            orderId: '',
            activity: []
        }
    },
    methods: {
        async trackOrder() {
            try {
                const response = await useApi().get(`order/activity/${this.orderId}`)
                this.activity = response.orderActivity
            } catch (error) {
                this.activity = []
                this.$toast({
                    title: 'Error',
                    description: '404: Order not found',
                    variant: 'destructive',
                })
            }
        }
    }
}
</script>