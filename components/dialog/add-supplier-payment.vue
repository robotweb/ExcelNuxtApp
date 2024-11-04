<template>
    <Dialog v-bind:open="isAddSupplierPaymentDialogOpen">
        <DialogContent class="min-h-[50vh] max-h-[50vh] flex flex-col overflow-y-auto">
            <DialogHeader></DialogHeader>
                <div>
                    <Button class="w-full" @click="togglePaymentForm">Add Payment Method</Button>
                    <Card v-if="paymentFormActive" class="p-4 my-4">
                        <div class="flex flex-col gap-4 my-2">
                            <Label>Payment Method</Label>
                            <Input v-model="paymentMethodName"/>
                        </div>
                        <div class="flex flex-col gap-4 my-2">
                            <Label>Payment Terms</Label>
                            <Textarea v-model="paymentMethodDescription"/>
                        </div>
                        <div class="flex flex-col gap-4 my-2">
                            <Label>Attachment</Label>
                            <Input type="file" @change="handleFileChange"/>
                        </div>
                        <Button class="w-full mt-4" @click="addPaymentMethod">Add</Button>
                    </Card>
                </div>
                <div>
                    <div class="flex flex-col gap-4 my-2">
                        <div v-for="paymentMethod in supplierPayments" :key="paymentMethod.payment_method_uuid">
                            <Card class="p-4 my-2 flex flex-row justify-between items-center">
                                <div>{{ paymentMethod.payment_method_name }}</div>
                                <div class="flex gap-2">
                                    <Button variant="ghost" class="items-center justify-center"><Icon name="lucide:eye"/></Button>
                                    <Button variant="ghost" class="items-center justify-center" @click="editPaymentMethod(paymentMethod.payment_method_uuid)"><Icon name="lucide:pencil" /></Button>
                                    <Button variant="ghost" class="items-center justify-center" @click="deletePaymentMethod(paymentMethod.payment_method_uuid)"><Icon name="lucide:trash" /></Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
        </DialogContent>
    </Dialog>
</template>

<script>
export default {
    props: {
        supplierData: {
            type: Object,
            required: true
        },
        isAddSupplierPaymentDialogOpen: {
            type: Boolean,
            required: false
        }
    },
    watch: {
        supplierData(newVal, oldVal) {
            console.log('watch','newVal', newVal)
            this.getSupplierPayments()
        }
    },
    data() {
        return {
            paymentFormActive: false,
            paymentMethod: [],
            paymentMethodName: '',
            paymentMethodDescription: '',
            paymentMethodAttachment: null,
            supplierPayments: []
        }
    },
    methods:{
        togglePaymentForm,
        addPaymentMethod,
        handleFileChange,
        getSupplierPayments
    }
}

async function addPaymentMethod() {
    console.log(this.paymentMethodName, this.paymentMethodDescription, this.paymentMethodAttachment, this.supplierData.supplier_uuid)
    this.paymentFormActive = false
    const api = useApi()
    try{
        const {paymentMethod} = await api.post('supplier/create_payment_method', {
            supplier_uuid: this.supplierData.supplier_uuid,
            payment_method_name: this.paymentMethodName,
            payment_method_description: this.paymentMethodDescription,
            //attachment: this.paymentMethodAttachment
        })
        console.log(paymentMethod)
        this.paymentMethodName = ''
        this.paymentMethodDescription = ''
        this.paymentMethodAttachment = null
        this.isAddSupplierPaymentDialogOpen = false
        this.getSupplierPayments()
    }catch(error){
        console.log(error)
    }
}

async function getSupplierPayments() {
    const api = useApi()
    const {paymentMethods} = await api.get(`supplier/get_payment_methods/${this.supplierData.supplier_uuid}`)
    console.log('respone', paymentMethods)
    this.supplierPayments = paymentMethods
}

function togglePaymentForm() {
    this.paymentFormActive = !this.paymentFormActive
}

function handleFileChange(event) {
    this.paymentMethodAttachment = event.target.files[0]
}
</script>
