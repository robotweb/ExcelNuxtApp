<template>
    <div class="flex justify-between items-center mb-4">
        <h1>Drivers</h1>
        <Button @click="openAddDriverDialog"><Icon name="heroicons:plus" class="mr-2"/> New</Button>
    </div>
    <DataTable :data="drivers" :columns="columns" @row-click="onRowClick" />
    <Popup>
        <FormDriver />
    </Popup>
</template>
<script>
definePageMeta({
    layout: 'loggedin'
})
export default {
    name: 'CompanyDriversPage',
    data() {
        return {
            dialogContent: null,
            drivers: [],
            columns: [
                { label: 'Name', key: 'user_first_name' },
                { label: 'Surname', key: 'user_last_name' },
                { label: 'Email', key: 'user_email' },
                { label: 'Phone', key: 'user_phone' },
            ]
        }
    },
    methods: {
        openAddDriverDialog() {
            this.$store.dialogOpen = true;
        },
        async getDrivers() {
            try{
                const response = await useApi().get(`driver/${this.$route.params.id}/get`);
                this.drivers = response.drivers;
            }catch(error){
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
        this.getDrivers();
    }
}
</script>