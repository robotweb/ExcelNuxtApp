<template>
    <Dialog v-bind:open="isSupplierDialogOpen" @close="closeDialog">
        <DialogContent class="overflow-y-auto"> 
        <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription> </DialogDescription>
        </DialogHeader>
        <DialogBody>
            <div class="flex flex-col gap-2 my-2">
                <label for="supplier-name">Supplier Name</label>
                <Input label="Supplier Name" v-model="form.supplierName"/>
            </div>
            <div class="flex flex-col gap-2 my-2">
                <label for="supplier-address">Supplier Address</label>
                <Input label="Supplier Address" v-model="form.supplierAddress" />
            </div>
            <div class="flex flex-col gap-2 my-2">
                <label for="supplier-phone">Supplier Phone</label>
                <Input label="Supplier Phone" v-model="form.supplierPhone" />
            </div>
        </DialogBody>
            <DialogFooter>
                <Button v-if="!supplierData" @click="addSupplier">Add</Button>
                <Button v-if="supplierData" @click="updateSupplier">Update</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
<script>

export default {
    props: {
        isSupplierDialogOpen: {
            type: Boolean,
            default: false,
            required: true
        },
        supplierData : {
            type: Object,
            required: false
        }
    },
    watch: {
        supplierData(newVal, oldVal) {
            console.log('supplierData', newVal)
            if (newVal) {
                this.form.supplierName = newVal.supplier_name;
                this.form.supplierAddress = newVal.supplier_address;
                this.form.supplierPhone = newVal.supplier_phone;
            } else {
                this.form.supplierName = '';
                this.form.supplierAddress = '';
                this.form.supplierPhone = '';
            }
        }
    },
    data() {
        console.log('supplierData', this.supplierData)
        return {
            form: {
                supplierName: this.supplierData ? this.supplierData.supplier_name : '',
                supplierAddress: this.supplierData ? this.supplierData.supplier_address : '',
                supplierPhone: this.supplierData ? this.supplierData.supplier_phone : ''
            }
        }
    },
    methods: {
        addSupplier,
        updateSupplier,
    },
}

async function addSupplier() {
    console.log(this.form)
    const api = useApi()
    const supplier = {
        supplier_name  : this.form.supplierName,
        supplier_address : this.form.supplierAddress,
        supplier_phone : this.form.supplierPhone
    }
    try{
        await api.post('supplier/create', supplier).then(res => {
            console.log(res)
            this.$emit('success')
        }).catch(err => {
            throw new Error(err)
        })
    } catch (error) {
        console.log(error)
    }

}

async function updateSupplier() {
    console.log(this.form)
    const api = useApi()
    const supplier = {
        supplier_name : this.form.supplierName,
        supplier_address : this.form.supplierAddress,
        supplier_phone : this.form.supplierPhone
    }
    try{
        await api.put(`supplier/update/${this.supplierData.supplier_uuid}`, supplier).then(res => {
            console.log(res)
            this.$emit('success')
        }).catch(err => {
            throw new Error(err)
        })
    } catch (error) {
        console.log(error)
    }
}


</script>
