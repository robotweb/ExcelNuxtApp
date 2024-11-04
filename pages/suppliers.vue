<template>
    <div>
        <div class="flex justify-end gap-2 w-full">
            <Button @click="supplierData=null; isSupplierDialogOpen=true">Add Supplier</Button>
        </div>
        <DialogAddSupplier v-model:open="isSupplierDialogOpen" :supplierData="supplierData" @close="supplierData=null" @success="isSupplierDialogOpen=false; getSuppliers()" />
        <DialogAddSupplierPayment v-model:open="isAddSupplierPaymentDialogOpen" :supplierData="supplierData" />
        <div class="my-4">
        </div>
        <DataTable :data="data" :columns="columns" :actions="actions"/>
    </div>
</template>
<script>
definePageMeta({
  layout: 'loggedin'
})
export default {
    data() {
        return {
            isSupplierDialogOpen: false,
            isAddSupplierPaymentDialogOpen: false,
            data: [],
            supplierData: null,
            columns: [
                {
                    label: 'Supplier Name',
                    key: 'supplier_name'
                }
            ],
            actions: [
                {
                    label: 'Edit',
                    onClick: (row) => {
                        console.log('edit', row)
                        this.supplierData = row
                        this.isSupplierDialogOpen = true
                    },
                    icon: 'lucide:pencil'
                },
                {
                    label: 'Delete',
                    onClick: (row) => {
                        console.log(row)
                        this.deleteSupplier(row.supplier_uuid)
                    },
                    icon: 'lucide:trash'
                },{
                    label: 'Payment Methods',
                    onClick: (row) => {
                        console.log(row)
                        this.supplierData = row
                        this.isAddSupplierPaymentDialogOpen = true
                    },
                    icon: 'lucide:credit-card'
                }
            ]
        }
    },
    methods: {
        getSuppliers,
        deleteSupplier
    },
    mounted() {
        this.getSuppliers()
    }
}

async function getSuppliers() {
    const api = useApi()
    const {suppliers} = await api.get('supplier/get')
    this.data = suppliers
    console.log(suppliers)
}

async function deleteSupplier(id) {
    const api = useApi()
    await api._delete(`supplier/delete/${id}`).then(res => {
        console.log(res)
        this.getSuppliers();
    }).catch(err => {
        throw new Error(err)
    })
}
</script>
