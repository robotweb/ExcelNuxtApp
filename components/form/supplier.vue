<template>
    <DialogHeader>
        <DialogTitle>Supplier</DialogTitle>
    </DialogHeader>
    <Button @click="activeTab = 'general'" v-if="activeTab === 'paymentMethod'" variant="outline">Supplier Details</Button>
    <div v-if="activeTab === 'general'"> <!-- Card -->
    <div class="flex flex-col gap-2 w-full">
        <Label>Name</Label>
        <Input v-model="name" placeholder="Name" />
    </div>
    <div class="flex gap-2 w-full">
        <div class="flex flex-col gap-2 w-1/2">
            <Label>First Name</Label>
            <Input v-model="first_name" placeholder="First Name" />
        </div>
        <div class="flex flex-col gap-2 w-1/2">
            <Label>Last Name</Label>
            <Input v-model="last_name" placeholder="Last Name" />
        </div>
        </div>
        <div class="flex gap-2 w-full">
        <div class="flex flex-col gap-2 w-1/2">
            <Label>Phone</Label>
            <Input v-model="phone" placeholder="Phone" />
        </div>
        <div class="flex flex-col gap-2 w-1/2">
            <Label>Email</Label>
            <Input v-model="email" placeholder="Email" />
        </div>
        </div>
        <div class="flex flex-col gap-2 w-full">
            <Label>Address</Label>
            <Textarea v-model="address" placeholder="Address" />
        </div>
    </div>
    <div v-if="activeTab === 'paymentMethod'" class="flex flex-col gap-2 max-h-[500px] overflow-y-auto p-2">
        <div v-for="(payment, index) in paymentMethods" :key="index">
            <div class="flex flex-col gap-2 w-full">
                <Label>Payment Method</Label>
                <Input v-model="payment.payment_method_name" placeholder="Payment Method" />
            </div>
            <div class="flex flex-col gap-2 w-full">
                <Label>Description</Label>
                <Textarea v-model="payment.payment_method_description" placeholder="Description" />
            </div>
            <div class="flex flex-col gap-2 w-full">
                <Label>File</Label>
                <Input v-model="payment.payment_method_file" placeholder="File" type="file" />
            </div>
            <Button class="w-full mt-2" @click="removePaymentMethod(index)" variant="destructive">Remove Payment Method</Button>
        </div>
        <Button class="w-full mt-2" @click="addPaymentMethod">Add Payment Method</Button>
    </div>
    <Button @click="activeTab = 'paymentMethod'" v-if="activeTab === 'general'" variant="outline">Payment Method</Button>
    <DialogFooter>
        <Button @click="save">Save</Button>
    </DialogFooter>
</template>
<script>
export default {
    name: 'FormSupplier',
    data() {
        return {
            name: '',
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            address: '',
            activeTab: 'general',
            paymentMethods: []
        }
    },
    created() {
        if (this.$store.dialogContent) {
            this.name = this.$store.dialogContent.supplier_name
            this.first_name = this.$store.dialogContent.supplier_first_name
            this.last_name = this.$store.dialogContent.supplier_last_name
            this.phone = this.$store.dialogContent.supplier_phone
            this.email = this.$store.dialogContent.supplier_email
            this.address = this.$store.dialogContent.supplier_address
            this.paymentMethods = this.$store.dialogContent.payment_methods
        }
    },
    methods: {
        addPaymentMethod() {
            this.paymentMethods.push({
                payment_method_name: '',
                payment_method_description: '',
                payment_method_file: ''
            })
        },
        async removePaymentMethod(index) {
            try{
                if(this.paymentMethods[index].payment_method_uuid){
                    const response = await useApi()._delete('supplier/' + this.paymentMethods[index].payment_method_uuid + '/delete_payment_method/' + this.paymentMethods[index].payment_method_uuid)
                    this.paymentMethods.splice(index, 1)
                    this.$toast({
                        title: 'Success',
                        description: response.message,
                        variant: 'default'
                    })
                }else{
                    this.paymentMethods.splice(index, 1)
                }
            }catch(error){
                console.log(error)
            }
        },
        async save() {
            const supplier = {
                supplier_name: this.name,
                supplier_first_name: this.first_name,
                supplier_last_name: this.last_name,
                supplier_phone: this.phone,
                supplier_email: this.email,
                supplier_address: this.address,
                supplier_payment_methods: this.paymentMethods,
                supplier_company_uuid: this.$route.params.id
            }
            console.log(supplier)
            let response, message
            try{
                if (this.$store.dialogContent) {
                    response = await useApi().put('/supplier/' + this.$route.params.id + '/update/' + this.$store.dialogContent.supplier_uuid, supplier)
                } else {
                    response = await useApi().post('/supplier/' + this.$route.params.id + '/create', supplier)
                }
                message = response.message
                this.$toast({
                        title: 'Success',
                        description: message,
                        variant: 'default'
                    }
                )
            } catch (error) {
                message = error.message
                console.log(message)
                this.$toast({
                        title: 'Error',
                        description: message,
                        variant: 'destructive'
                    }
                )
            }

        }
    }
}
</script>
