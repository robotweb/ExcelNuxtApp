<template>
    <div v-if="orders && orders.length == 0">
        <Card class="p-2">
            No data
        </Card>
    </div>
    <div v-else>
        <Card v-for="order in orders" class="p-4" @click="handlePress(order.order_uuid)">
            <div class="flex justify-between mb-4">
                <span class="font-bold">
                    {{ order.order_reference }}
                </span>
                <Badge variant="order.order_status">
                    {{ order.order_status }}
                </Badge>
            </div>
            <div class="flex address-grid">
                <p class="font-semibold">
                    Pikcup
                </p>
                <p class="truncate">
                    {{ order.route_pickup_address }}
                </p>
            </div>
            <div class="flex address-grid">
                <p class="font-semibold">
                    Dropoff
                </p>
                <p class="truncate">
                    {{ order.route_dropoff_address }}
                </p>
            </div>

        </Card>
    </div>

</template>
<script>
import { Route } from 'lucide-vue-next';

export default{
    props: {
        orders: {
            type: []
        }
    },
    mounted(){
        console.log(this.orders);
    },
    methods:{
        async handlePress(order_uid){
            const company = this.$route.params['id'];
            navigateTo(`/${company}/driver/order/${order_uid}`);
        }
    }

}
</script>
<style>
.address-grid{
    display: grid;
    grid-template-columns: 1fr 3fr;

}
</style>