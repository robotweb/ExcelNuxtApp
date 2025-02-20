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
                        <Label>Date</Label>
                        <div class="flex gap-2">
                            <MyDatePicker :value="filter.date" @update="updateDate" /> 
                        </div>
                        <div class="flex gap-2 justify-end mt-4">
                            <Button @click="applyFilter">Apply</Button>
                            <Button variant="outline" @click="clearFilter">Clear</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div class="flex gap-2">
                <Button @click="openAddOrderSheet"><Icon name="lucide:plus" class="mr-2" />New</Button>
                <Button @click="importOrders"><Icon name="lucide:upload" class="mr-2"/>Import</Button>
                <Button @click="getOrders(true)"><Icon name="lucide:download" class="mr-2"/>Export</Button>
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
        async getOrders(download = false) {
            console.log(this.filter)
            let formatedFilterDate = {
                start : null,
                end : null
            }
            function formatCalendarDate(calendarObj) {
                const year = calendarObj.year.toString()
                const month = calendarObj.month.toString().padStart(2, '0')
                const day = calendarObj.day.toString().padStart(2, '0')
                
                return `${year}-${month}-${day}`
            }
            try{
                if(this.filter.date.start && this.filter.date.end) {
                    formatedFilterDate.start = formatCalendarDate(this.filter.date.start)
                    formatedFilterDate.end = formatCalendarDate(this.filter.date.end)
                }
            }catch(error){
                console.log(error)
            }
            try{
                const response = await useApi().get(`/order/${this.$route.params.id}/get`, {
                    pagination: this.pagination,
                    filter: {
                        ...this.filter,
                        scheduled_date: formatedFilterDate,
                    },
                    search: this.search,
                    download: download
                });
                if(download) {
                    console.log(response)
                    // stream blob response to download file
                    const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    const url = await window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `orders_${new Date().toISOString().split('T')[0]}.xlsx`;
                    a.click();
                }else{
                    this.orders = response.orders;
                    this.pagination = response.pagination
                }
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
                const response = await useApi().get(`/driver/${this.$route.params.id}/get`);
                this.drivers = response.drivers;
            }catch(error){
                console.log(error)
            }
        },
        updateDate(date) {
            console.log('emitted date',date)
            this.filter.date = date;
            console.log('filter date',this.filter.date)
        }
    },
    mounted() {
        this.getOrders();
        this.getDrivers();
    }
}
</script>