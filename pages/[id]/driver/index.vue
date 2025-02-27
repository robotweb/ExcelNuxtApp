<template>
    <div class="driver">
        <div class="header">
            <DriverDateSelector v-bind:selectedDate="selectedDate"/>
            <div class="hidden">
                <div class="flex flex-col flex-col mb-2">
                <div class="flex gap-2 items-center">
                    <Button variant="outline"><Icon name="lucide:search"/></Button>
                    <Input type="text" placeholder="Search" v-model="search" />
                    <Button variant="secondary"><Icon name="lucide:x"/></Button>
                    <Button variant="secondary"><Icon name="lucide:filter"/></Button>
                </div>
                </div>
            </div>
        </div>
        <div class="order-cards">
            <div v-if="isLoading" class="py-2 flex flex-col gap-4">
                <Card class="p-4 flex flex-col gap-2" v-for="card in [0,0,0]">
                    <div class="flex justify-between">
                        <Skeleton class="w-[150px] h-5 rounded-full" />
                        <Skeleton class="w-[50px] h-5 rounded-full" />
                    </div>
                        <Skeleton class="w-[100px] h-5 rounded-full" />
                        <Skeleton class="w-full h-5 rounded-full" />
                        <Skeleton class="w-2/3 h-5 rounded-full" />
                </Card>
            </div>
            <div v-else>
                <DriverOrderCards v-bind:orders="data"/>
            </div>
        </div>
    </div>
</template>
<script>
definePageMeta({
    layout: 'driver',
})
export default{
    data(){
        return {
            selectedDate: null,
            isLoading: true,
            data: [],
            pagination: {
                page: 1,
                limit: 10,
                totalPages: 1
            },
            search: null,
            status: null
        }
    },
    methods:{
        async getOrders(){
            this.isLoading = true;
            const localDate = this.selectedDate.toISOString().split('T')[0]
            console.log(formattedDate);
            const response = await useApi().get(`/order/${this.$route.params.id}/get`,{
                    pagination: this.pagination,
                    filter: {
                        scheduled_date: {
                            start : formattedDate,
                            end: formattedDate
                        },
                        search: this.search,
                        driver: "me"
                    },
            })
            //console.log(response)
            this.data = response.orders
            console.log(this.data)
            this.isLoading = false;
        }
    },
    mounted(){
        if(this.selectedDate == null){
            this.selectedDate = new Date();
        }
        //this.getOrders();
    },
    provide(){
        return {
            setSelectedDate: (date) => {
                //console.log("provide emitted")
                this.selectedDate = date;
            },
            getSelectedDate: () => this.selectedDate
        }
    },
    watch:{
        async selectedDate(newVal,oldVal){
            //console.log("Date changed:", oldVal, "➡", newVal);
            await this.getOrders()
        }
    }
}
</script>
<style>
.driver{
    display: grid;
    grid-template-rows: auto 1fr; /* 1/4 and 3/4 columns */
    overflow: hidden;
    height: 100vh; /* Full viewport height */
}
.order-cards{
    overflow-y: scroll;
}
</style>