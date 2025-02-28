<template>
    <div class="flex justify-between items-center w-full mb-4">
        <div>
            <p>Customers</p>
        </div>
        <div class="flex gap-2">
            <Button @click="openAddCustomerDialog"><Icon name="heroicons:plus" class="mr-2"/> New</Button>
        </div>
    </div>
    <DataTable :data="customers" :columns="columns" @row-click="onRowClick" />
    <Popup>
        <FormCustomer @refresh="getCustomers" />
    </Popup>
</template>
<script>
definePageMeta({
    layout: 'loggedin'
})
export default {
    name: 'CompanyCustomersPage',
    data() {
        return {
            customers: [],
            columns: [
                {
                    label: 'Name',
                    key: 'customer_name'
                },
                {
                    label: 'First Name',
                    key: 'customer_first_name'
                },
                {
                    label: 'Last Name',
                    key: 'customer_last_name'
                },
                {
                    label: 'Phone',
                    key: 'customer_phone'
                },
                {
                    label: 'Email',
                    key: 'customer_email'
                },
                {
                    label: 'Address',
                    key: 'customer_address'
                },
            ]
        }
    },
    methods: {
        async openAddCustomerDialog() {
            this.$store.dialogOpen = true;
        },
        async getCustomers() {
            try{
                const response = await useApi().get(`customer/${this.$route.params.id}/get`);
                this.customers = response.customers;
                console.log(response);
            }catch(error){
                console.error(error);
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive'
                })
            }
        },
        onRowClick(row) {
            this.$store.dialogContent = row;
            this.$store.dialogOpen = true;
        }
    },
    mounted() {
        this.getCustomers();
    }
}
</script>