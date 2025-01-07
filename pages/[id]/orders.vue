<template>
    <div>
        <div class="flex justify-between mb-4 w-full">
            <div class="flex gap-2 items-center">
                <p>Orders</p>
                <Input type="text" placeholder="Search" v-model="search" />
                <Popover>
                    <PopoverTrigger>
                        <Button variant="outline">
                            <Icon name="lucide:filter" class="mr-2"/>
                            Filter
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent class="w-80">
                        <Label>Status</Label>
                        <MySelect v-model="filter.status" :options="statusOptions" />
                        <Label>Driver</Label>
                        <MySelect v-model="filter.driver" :options="drivers" dataKey="driver_uuid" dataLabel="user_first_name"/>
                        <!--<Label>Date</Label>
                        <div class="flex gap-2">
                            <MyDatePicker v-model="filter.date" @update="updateDate" /> 
                        </div>-->
                        <div class="flex gap-2 justify-end mt-4">
                            <Button @click="applyFilter">Apply</Button>
                            <Button variant="outline" @click="clearFilter">Clear</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div class="flex gap-2">
                <Button @click="importOrders"><Icon name="lucide:upload" class="mr-2"/>Import</Button>
                <Button @click="openAddOrderSheet"><Icon name="lucide:plus" class="mr-2" />New</Button>
            </div>
        </div>
        <DataTable :data="orders" :columns="columns" @row-click="onRowClick" />
        <div class="flex items-center justify-between mt-4">
            <div>
                <p>Page {{ pagination.page }} of {{ pagination.totalPages }}</p>
            </div>
            <div class="flex gap-2">
                <Button variant="outline" @click="pageChange(pagination.page - 1)">Previous</Button>
                <Button variant="outline" @click="pageChange(pagination.page + 1)">Next</Button>
            </div>
        </div>
        <Slideover >
            <FormOrder @refreshOrders="getOrders"/>
        </Slideover>
        <Popup>
            <FormOrderImport @refreshOrders="getOrders"/>
        </Popup>
    </div>
</template>
<script>
definePageMeta({
    layout: 'loggedin'
})
export default {
    name: 'CompanyOrdersPage',
    data() {
        return {
            orders: [],
            columns: [
                { label: 'Order', key: 'order_reference', width: 'w-1/6' },
                { label: 'Status', key: 'order_status', width: 'w-1/6', component : 'StatusBadge'},
                { label: 'Date', key: 'order_scheduled_date', width: 'w-1/6' },
                { label: 'Driver', key: 'driver_name', width: 'w-1/6' },
                { label: 'Pickup', key: 'route_pickup_formatted_address', width: 'w-1/6' },
                { label: 'Dropoff', key: 'route_dropoff_formatted_address', width: 'w-1/6' },
                { label: 'Created At', key: 'created_at', width: 'w-1/6',  },
            ],
            slideoverContent: null,
            pagination: {
                page: 1,
                limit: 15,
                totalPages: 1
            },
            search: '',
            filter: {
                status: '',
                driver: '',
                date: {
                    start: null,
                    end: null
                }
            },
            statusOptions: [ 'Draft',
               'Dispatched',
               'Collected',
               'On Route',
               'Delivered',
               'Cancelled',
               'Re-Delivered',
               'Postponed',
               'Rejected'
            ],
            drivers: []
        }
    },
    watch: {
        search: function() {
            // debounce
            setTimeout(() => {
                this.pagination.search = this.search
                this.getOrders()
            }, 1000)
        }
    },
    methods: {
        async getOrders() {
            console.log(this.filter)
            try{
                const response = await useApi().get(`order/${this.$route.params.id}/get`, {
                    pagination: this.pagination,
                    filter: this.filter,
                    search: this.search
                });
                this.orders = response.orders;
                this.pagination = response.pagination
            }catch(error){
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                })
            }
        },
        openAddOrderSheet() {
            this.$store.sheetOpen = true;
        },
        importOrders() {
            this.$store.dialogOpen = true;
        },
        onRowClick(row) {
            this.$store.sheetOpen = true;
            this.$store.orderSheetData = row;
        },
        pageChange(page) {
            if(page < 1 || page > this.pagination.totalPages) return;
            this.pagination.page = page;
            this.getOrders();
        },
        applyFilter() {
            this.pagination.page = 1;
            this.getOrders();
        },
        clearFilter() {
            this.pagination.page = 1;
            this.filter = {
                status: '',
                driver: '',
                date: null
            }
            this.getOrders();
        },
        async getDrivers() {
            try{
                const response = await useApi().get(`driver/${this.$route.params.id}/get`);
                this.drivers = response.drivers;
            }catch(error){
                console.log(error)
            }
        },
        updateDate(date) {
            console.log(date)
            this.filter.date = date;
        }
    },
    mounted() {
        this.getOrders();
        this.getDrivers();
    }
}
</script>