<template>
    <DialogHeader>
        <DialogTitle>Customer</DialogTitle>
    </DialogHeader>
    <div class="flex flex-col gap-2 w-full">
        <Label>Name</Label>
        <Input label="Name" v-model="name" placeholder="Name" />
    </div>
    <div class="flex gap-2 w-full">
        <div class="flex flex-col gap-2 w-1/2">
            <Label>First Name</Label>
            <Input label="First Name" v-model="first_name" placeholder="First Name" />
        </div>
        <div class="flex flex-col gap-2 w-1/2">
            <Label>Last Name</Label>
            <Input label="Last Name" v-model="last_name" placeholder="Last Name" />
        </div>
    </div>
    <div class="flex gap-2 w-full">
        <div class="flex flex-col gap-2 w-1/2">
            <Label>Phone</Label>
            <Input label="Phone" v-model="phone" placeholder="Phone" />
        </div>
        <div class="flex flex-col gap-2 w-1/2">
            <Label>Email</Label>
            <Input label="Email" v-model="email" placeholder="Email" />
        </div>
    </div>
    <div class="flex flex-col gap-2 w-full">
        <Label>Address</Label>
        <Textarea label="Address" v-model="address" placeholder="Address"/>
    </div>
    <DialogFooter>
        <Button @click="save">Save</Button>
    </DialogFooter>
</template>
<script>
export default {
    name: 'FormCustomer',
    data() {
        return {
            name: '',
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            address: ''
        }
    },
    created() {
        if(this.$store.dialogContent){
            this.name = this.$store.dialogContent.customer_name;
            this.first_name = this.$store.dialogContent.customer_first_name;
            this.last_name = this.$store.dialogContent.customer_last_name;
            this.phone = this.$store.dialogContent.customer_phone;
            this.email = this.$store.dialogContent.customer_email;
            this.address = this.$store.dialogContent.customer_address;
        }
    },
    methods: {
        async save() {
            const customer = {
                customer_name: this.name,
                customer_first_name: this.first_name,
                customer_last_name: this.last_name,
                customer_phone: this.phone,
                customer_email: this.email,
                customer_address: this.address
            }
            console.log(customer);
            try{
                let response, message;
                if(this.$store.dialogContent){
                    response = await useApi().put(`/customer/${this.$route.params.id}/update/${this.$store.dialogContent.customer_uuid}`, customer);
                    message = 'Customer updated';
                }else{
                    response = await useApi().post(`/customer/${this.$route.params.id}/create`, customer);
                    message = 'Customer created';
                }
                this.$toast({
                    title: 'Success',
                    description: message,
                    variant: 'default'
                })
                this.$store.dialogContent = null;
                this.$store.dialogOpen = false;
                this.$emit('refresh');
            }catch(error){
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive'
                })
            }
        },
    }
}
</script>