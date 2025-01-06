<template>
    <div class="flex flex-col gap-2 w-full mb-4">
        <div class="flex flex-row justify-between items-center">
            <p>Suppliers</p>
            <div class="flex flex-row gap-2">
                <Button @click="openAddSupplierDialog"><Icon name="lucide:plus" class="mr-2" />New</Button>
            </div>
        </div>
    </div>
    <DataTable :columns="columns" :data="suppliers" @row-click="onRowClick" />
    <Popup>
        <FormSupplier />
    </Popup>
</template>
<script>
definePageMeta({
    layout: 'loggedin'
})
export default {
    name: 'CompanySuppliersPage',
    data() {
        return {
            suppliers: [],
            columns: [
                {
                    label: 'Name',
                    key: 'supplier_name'
                },
                {
                    label: 'First Name',
                    key: 'supplier_first_name'
                },
                {
                    label: 'Last Name',
                    key: 'supplier_last_name'
                },
                {
                    label: 'Phone',
                    key: 'supplier_phone'
                },
                {
                    label: 'Email',
                    key: 'supplier_email'
                },
                {
                    label: 'Address',
                    key: 'supplier_address'
                }
            ]
        }
    },
    methods: {
        openAddSupplierDialog() {
            this.$store.dialogOpen = true;
        },
        async getSuppliers() {
            try {
                const response = await useApi().get('supplier/' + this.$route.params.id + '/get', {
                    limit: -1
                })
                console.log(response)
                this.suppliers = response.suppliers
            } catch (error) {
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive'
                })
            }
        },
        onRowClick(row) {
            this.$store.dialogOpen = true;
            this.$store.dialogContent = row;
        }
    },
    mounted() {
        this.getSuppliers()
    }
}
</script>
