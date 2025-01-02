<template>
    <div class="flex flex-col gap-2 overflow-y-auto">
        <h1>New Order</h1>
        <div class="flex flex-col gap-2 p-1">
            <label for="order-no">Order No.</label>
            <Input id="order-no" placeholder="16000000000" v-model="orderNo"/>
        </div>
        <div class="flex flex-col gap-2 p-1">
            <label for="customer-name">Customer Name</label>
            <Input id="customer-name" placeholder="John Doe" v-model="customerName"/>
        </div>
        <div class="flex flex-col gap-2 p-1">
            <label for="customer-address">Customer Address</label>
            <Input id="customer-address" placeholder="123 Main St, Anytown, USA" v-model="customerAddress"/>
        </div>
        <div class="flex flex-col gap-2 p-1">
            <label for="customer-phone">Customer Phone</label>
            <Input id="customer-phone" placeholder="123-456-7890" v-model="customerPhone"/>
        </div>
        <div class="flex flex-col gap-2 p-1">
            <label for="supplier">Supplier</label>
            <Select v-model="supplier">
                <SelectTrigger>
                    <SelectValue placeholder="Select a supplier" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="supplier in suppliers" :key="supplier.supplier_uuid" :value="supplier">
                            {{ supplier.supplier_name }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        <div class="flex flex-col gap-2 p-1" v-if="supplier">
            <label for="amount">Payment Method</label>
            <Select v-model="paymentTerms">
                <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="paymentTerm in paymentTermsOptions" :key="paymentTerm.payment_method_uuid" :value="paymentTerm">
                            {{ paymentTerm.payment_method_name }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        <div class="flex flex-col gap-2 p-1">
            <label for="amount">Amount</label>
            <Input id="amount" placeholder="Amount" v-model="amount"/>
        </div>
        <div class="flex flex-col gap-2 p-1">
            <label for="description">Description</label>
            <Textarea id="description" placeholder="Description" v-model="description"/>
        </div>
        <Button @click="saveOrder">Save</Button>
    </div>
</template>
<script>
export default {
    name: 'AddOrder',
    data() {
        return {
            orderNo: '',
            customerName: '',
            customerAddress: '',
            customerPhone: '',
            supplier: null,
            suppliers: [],
            paymentTerms: '',
            paymentTermsOptions: [],
            amount: '',
            description: ''
        }
    },
    methods: {
        async saveOrder() {
            console.log(this.orderNo, this.customerName, this.customerAddress, this.customerPhone, this.supplier, this.paymentTerms, this.amount, this.description)
            const api = useApi()
            const response = await api.post('task/create', {
                task_name: this.orderNo,
                task_customer_name: this.customerName,
                task_address: this.customerAddress,
                task_phone: this.customerPhone,
                task_supplier_uuid: this.supplier.supplier_uuid,
                task_payment_method_uuid: this.paymentTerms.payment_method_uuid,
                task_amount: this.amount,
                task_description: this.description
            })
            console.log(response)
            this.$emit('new-order-success')
            this.$store.task = response.taskResponse
            this.$store.sheet = 'view-order'
        },
        async getSuppliers() {
            const api = useApi()
            const response = await api.get('supplier/get')
            this.suppliers = response.suppliers
        },
        setSupplier(supplier) {
            console.log(supplier)
            this.supplier = supplier.supplier_uuid
        },
        async getPaymentTerms(supplierUuid) {
            const api = useApi()
            const response = await api.get(`supplier/get_payment_methods/${supplierUuid}`)
            this.paymentTermsOptions = response.paymentMethods
            console.log(this.paymentTermsOptions)
        }
    },
    mounted() {
        this.getSuppliers()
    },
    watch: {
        supplier(newVal) {
            console.log('supplier changed')
            // get payment terms for supplier
            console.log(newVal)
            this.getPaymentTerms(newVal.supplier_uuid)
        }
    }
}
</script>
<style scoped>
    h1 {
        font-size: 1.2rem;
        font-weight: 600;
    }
    .overflow-y-auto {
        overflow-y: auto;
        max-height: 100%;
    }
</style>