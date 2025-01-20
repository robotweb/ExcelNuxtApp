<template>
    <div class="flex flex-col gap-2 w-full h-full overflow-y-auto">
    <OrderActivity v-if="this.$store.orderSheetData" :activity="activity"/>
    <Card class="mt-6">
        <CardHeader>
            <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="flex flex-col gap-2">
                <Label>Order Reference</Label>
                <Input type="text" v-model="orderReference" />
            </div>
            <div class="flex flex-row gap-2 w-full">
                <div class="flex flex-col gap-2 w-1/2">
                    <Label>Order Date</Label>
                    <Input type="date" v-model="orderDate" />
                </div>
                <div class="flex flex-col gap-2 w-1/2">
                    <Label>Order Time</Label>
                    <Input type="time" v-model="orderTime" />
                </div>
            </div>
            <div class="flex flex-row gap-2 w-full">
                <div class="flex flex-col gap-2 w-1/2">
                    <Label>Customer</Label>
                    <Select v-model="customer" @update:open="getCustomers">
                        <SelectTrigger>
                            <SelectValue placeholder="Select" :value="customer"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem v-for="customer in customers" :key="customer.customer_uuid" :value="customer.customer_uuid">
                                    {{ customer.customer_name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div class="flex flex-col gap-2 w-1/2">
                    <Label>Driver</Label>
                    <Select v-model="driver" @update:open="getDrivers">
                        <SelectTrigger>
                            <SelectValue placeholder="Select" :value="driver"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem v-for="driver in drivers" :key="driver.driver_uuid" :value="driver.driver_uuid">
                                    {{ driver.user_first_name }} {{ driver.user_last_name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div class="flex flex-row gap-2 w-full">
                <div class="flex flex-col gap-2 w-1/2">
                    <Label>Supplier</Label>
                    <Select v-model="supplier" @update:open="getSuppliers">
                        <SelectTrigger>
                            <SelectValue placeholder="Select" :value="supplier"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem v-for="supplier in suppliers" :key="supplier.supplier_uuid" :value="supplier.supplier_uuid">
                                    {{ supplier.supplier_name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div class="flex flex-col gap-2 w-1/2">
                    <Label>Payment Method</Label>
                    <Select v-model="paymentMethod">
                        <SelectTrigger>
                            <SelectValue placeholder="Select" :value="paymentMethod"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem v-for="paymentMethod in paymentMethods" :key="paymentMethod.paymentMethod_uuid" :value="paymentMethod.payment_method_uuid">
                                    {{ paymentMethod.payment_method_name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div class="flex flex-row gap-2 w-full">
                <div class="flex flex-col gap-2 w-1/2">
                    <Label>Order Status</Label>
                    <Select v-model="orderStatus" >
                        <SelectTrigger>
                            <SelectValue placeholder="Select" :value="orderStatus"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem v-for="orderStatus in orderStatuses" :key="orderStatus" :value="orderStatus">
                                    {{ orderStatus }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div class="flex flex-col gap-2 w-1/2">
                    <Label>Amount</Label>
                    <Input type="number" v-model="price" />
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <Button @click="updateOrderDetails" v-if="this.$store.orderSheetData">Update</Button>
        </CardFooter>
    </Card>
    <Card class="mt-6">
        <CardHeader>
            <CardTitle>Routes</CardTitle>
        </CardHeader>
        <CardContent>
                <div class="flex flex-col gap-2">
                    <Label>Pickup Location</Label>
                    <Input type="text" ref="pickupLocation" v-model="routes.pickupLocation"/>
                </div>
                <div class="flex flex-col gap-2">
                    <Label>Dropoff Location</Label>
                    <Input type="text" ref="dropoffLocation" v-model="routes.dropoffLocation"/>
                </div>
        </CardContent>
        <CardFooter>
            <Button @click="updateRoutes" v-if="this.$store.orderSheetData">Update</Button>
        </CardFooter>
    </Card>
    <Card class="mt-6">
        <CardHeader>
            <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="flex flex-col gap-2">
                <Label>Note</Label>
                <Textarea type="text" v-model="note"/>
            </div>
            <div class="flex flex-col gap-2">
                <Label>Pickup Instructions</Label>
                <Textarea type="text" v-model="pickupInstructions"/>
            </div>
            <div class="flex flex-col gap-2">
                <Label>Dropoff Instructions</Label>
                <Textarea type="text" v-model="dropoffInstructions"/>
            </div>
        </CardContent>
        <CardFooter>
            <Button @click="updateOrderNotes" v-if="this.$store.orderSheetData">Update</Button>
        </CardFooter>
    </Card>
    <!-- Documents 
    <Card class="mt-6">
        <CardHeader>
            <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="flex flex-row gap-2" @change="handleDocumentChange">
                <Input type="file" multiple/>
                <Button @click="uploadDocument" :disabled="!selectedDocuments">Upload</Button>
            </div>
            <MyDocumentList :documents="documents" @refresh="getDocuments" @download="downloadDocument"/>
        </CardContent>
    </Card>-->
    <Card class="mt-6">
        <CardHeader>
            <CardTitle>Proof of Delivery</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="flex flex-row gap-2">
                <Input type="file" multiple @change="handleProofOfDeliveryFileChange"/>
                <Button @click="uploadProofOfDelivery" :disabled="!selectedProofOfDeliveryFiles">Upload</Button>
            </div>
            <MyDocumentList :documents="proofOfDeliveryFiles" @refresh="getProofOfDelivery(this.$store.orderSheetData.order_uuid)" @download="downloadProofOfDelivery"/>
        </CardContent>
    </Card>
    <div class="flex flex-row gap-2 w-full mt-6">
        <Button @click="deleteOrder" variant="destructive" v-if="this.$store.orderSheetData">Delete</Button>
        <Button @click="save" v-else>Save</Button>
    </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            customer: null,
            customers: [],
            driver: null,
            drivers: [],
            supplier: null,
            suppliers: [],
            paymentMethod: null,
            paymentMethods: [],
            orderStatus: null,
            orderStatuses: [
               'Draft',
               'Dispatched',
               'Collected',
               'On Route',
               'Delivered',
               'Cancelled',
               'Re-Delivered',
               'Postponed',
               'Rejected'
            ],
            routes: {
                pickupLocation: null,
                dropoffLocation: null
            },
            note: null,
            pickupInstructions: null,
            dropoffInstructions: null,
            price: null,
            activity: [],
            proofOfDeliveryFiles: [],
            selectedProofOfDeliveryFiles: null,
            documents: [],
            selectedDocuments: null
        }
    },
    watch: {
        supplier(newVal) {
            this.getPaymentMethods()
        }
    },
    async created() {
        if(this.$store.orderSheetData){
            this.orderReference = this.$store.orderSheetData.order_reference
            this.orderStatus = this.$store.orderSheetData.order_status
            this.orderDate = this.$store.orderSheetData.order_scheduled_date
            this.orderTime = this.$store.orderSheetData.order_scheduled_time
            this.customer = this.$store.orderSheetData.order_customer_uuid
            this.driver = this.$store.orderSheetData.order_driver_uuid
            this.supplier = this.$store.orderSheetData.order_supplier_uuid
            this.paymentMethod = this.$store.orderSheetData.order_payment_method_uuid
            this.note = this.$store.orderSheetData.order_note
            this.pickupInstructions = this.$store.orderSheetData.order_pickup_instructions
            this.dropoffInstructions = this.$store.orderSheetData.order_dropoff_instructions
            this.price = this.$store.orderSheetData.order_price
            this.routes.pickupLocation = this.$store.orderSheetData.route_pickup_formatted_address
            this.routes.dropoffLocation = this.$store.orderSheetData.route_dropoff_formatted_address
            await this.getCustomers()
            this.customer = this.$store.orderSheetData.order_customer_uuid
            await this.getDrivers()
            this.driver = this.$store.orderSheetData.order_driver_uuid
            await this.getSuppliers()
            this.supplier = this.$store.orderSheetData.order_supplier_uuid
            await this.getPaymentMethods()
            this.paymentMethod = this.$store.orderSheetData.order_payment_method_uuid
            await this.getActivity(this.$store.orderSheetData.order_uuid)
            await this.getProofOfDelivery(this.$store.orderSheetData.order_uuid)
            await this.getDocuments(this.$store.orderSheetData.order_uuid)
        }
    },
    methods: {
        async getDrivers() {
            try{
                const response = await useApi().get(`driver/${this.$route.params.id}/get`);
                this.drivers = response.drivers;
            }catch(error){
                console.log(error)
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                })
            }
        },
        async getCustomers() {
            try{
                const response = await useApi().get(`customer/${this.$route.params.id}/get`);
                this.customers = response.customers;
            }catch(error){
                console.log(error)
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                })
            }
        },
        async getSuppliers() {
            try{
                const response = await useApi().get(`supplier/${this.$route.params.id}/get`, {
                    limit: -1
                });
                this.suppliers = response.suppliers;
            }catch(error){
                console.log(error)
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                })
            }
        },
        async getPaymentMethods() {
            this.paymentMethod = null
            try{
                const response = await useApi().get(`supplier/${this.$route.params.id}/get_payment_methods/${this.supplier}`);
                this.paymentMethods = response.paymentMethods;
            }catch(error){
                console.log(error)
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                })
            }
        },
        async save() {
            const order = {
                order_reference: this.orderReference,
                order_scheduled_date: this.orderDate,
                order_scheduled_time: this.orderTime,
                order_customer_uuid: this.customer,
                order_driver_uuid: this.driver,
                order_supplier_uuid: this.supplier,
                order_payment_method_uuid: this.paymentMethod,
                order_status: this.orderStatus,
                routes: this.routes,
                order_note: this.note,
                order_pickup_instructions: this.pickupInstructions,
                order_dropoff_instructions: this.dropoffInstructions,
                order_price: this.price,
                //documents: this.documents
            }
            console.log(order)
            try {
                const response = await useApi().post('order/' + this.$route.params.id + '/create', order);
                this.$toast({
                    title: 'Success',
                    description: 'Order created successfully',
                    variant: 'default',
                })
            } catch (error) {
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                })
            }
        },
        async deleteOrder() {
            try {
                const response = await useApi()._delete('order/' + this.$route.params.id + '/delete/' + this.$store.orderSheetData.order_uuid);
                this.$toast({
                    title: 'Success',
                    description: 'Order deleted successfully',
                    variant: 'default',
                })
                this.$store.sheetOpen = false;
                this.$store.orderSheetData = null;
                this.$emit('refreshOrders');
            } catch (error) {
                console.log(error)
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                })
            }
        },
        async updateOrderDetails() {
            //console.log(this.$store.orderSheetData.order_uuid)
            const order = {
                order_status: this.orderStatus,
                order_price: this.price,
                order_reference: this.orderReference,
                order_scheduled_date: this.orderDate,
                order_scheduled_time: this.orderTime,
                order_customer_uuid: this.customer,
                order_driver_uuid: this.driver,
                order_supplier_uuid: this.supplier,
                order_payment_method_uuid: this.paymentMethod,
            }
            this.update(order)
        },
        async updateOrderNotes() {
            const order = {
                order_note: this.note,
                order_pickup_instructions: this.pickupInstructions,
                order_dropoff_instructions: this.dropoffInstructions,
            }
            this.update(order)
        },
        async updateRoutes() {
            const order = {
                routes: {
                    pickupLocation: this.routes.pickupLocation,
                    dropoffLocation: this.routes.dropoffLocation,
                }
            }
            console.log(order)
            this.update(order)
        },
        async update(order) {
            console.log('update', order)
            console.log(this.$store.orderSheetData)
            try {
                const response = await useApi().put('order/' + this.$route.params.id + '/update/' + this.$store.orderSheetData.order_uuid, order);
                console.log(response)
                this.$toast({
                    title: 'Success',
                    description: 'Order updated successfully',
                    variant: 'default',
                })
                this.routes.pickupLocation = response.order.routes.route_pickup_formatted_address
                this.routes.dropoffLocation = response.order.routes.route_dropoff_formatted_address
                this.getActivity(response.order.order_uuid)
                this.$emit('refreshOrders');
            } catch (error) {
                console.log(error)
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                })
            }
        },
        async getActivity(order_uuid) {
            try {
                const activity = await useApi().get(`order/${this.$route.params.id}/get-order-activity/${order_uuid}`);
                this.activity = activity.orderActivity
            } catch (error) {
                console.log(error)
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                })
            }
        },
        handleProofOfDeliveryFileChange(event) {
            const files = event.target.files
            this.selectedProofOfDeliveryFiles = files
        },
        handleDocumentChange(event) {
            const files = event.target.files
            this.selectedDocuments = files
        },
        async uploadProofOfDelivery() {
            const files = this.selectedProofOfDeliveryFiles
            //console.log(files)
            try{
                const formData = new FormData();
                 // Log each file being added
                Array.from(files).forEach((file, index) => {
                    console.log(`Adding file ${index}:`, file.name, file.type, file.size);
                    formData.append('files', file);
                });
                const response = await useApi().post('order/' + this.$route.params.id + '/proof/' + this.$store.orderSheetData.order_uuid, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response)
                this.$toast({
                    title: 'Success',
                    description: 'Proof of delivery uploaded successfully',
                    variant: 'default',
                })
                this.selectedProofOfDeliveryFiles = null
                this.getProofOfDelivery(this.$store.orderSheetData.order_uuid)
            }catch(error){
                console.log(error)
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                })
            }
        },
        async uploadDocument() {
            const files = this.selectedDocuments
            try{
                const formData = new FormData();
                Array.from(files).forEach((file, index) => {
                    console.log(`Adding file ${index}:`, file.name, file.type, file.size);
                    formData.append('files', file);
                });
                const response = await useApi().post('order/' + this.$route.params.id + '/document/' + this.$store.orderSheetData.order_uuid, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response)
                this.$toast({
                    title: 'Success',
                    description: 'Document uploaded successfully',
                    variant: 'default',
                })
                this.selectedDocuments = null
                this.getDocuments(this.$store.orderSheetData.order_uuid)
            }catch(error){
                console.log(error)
                this.$toast({
                    title: 'Error',
                    description: 'Failed to upload document',
                    variant: 'destructive',
                })
            }
        },
        async getProofOfDelivery(order_uuid) {
            this.proofOfDeliveryFiles = []
            try{
                console.log('getProofOfDelivery', order_uuid)
                const documents = await useApi().get(`order/${this.$route.params.id}/proof/${order_uuid}`);
                //console.log(documents.proof)
                for(const document of documents.proof){
                    this.proofOfDeliveryFiles.push({
                    uuid: document.proof_uuid,
                    name: document.proof_file_name,
                    type: document.proof_file_type,
                    size: document.proof_file_size,
                    url: document.proof_file_url
                    })
                }
            }catch(error){
                console.log(error)
            }
        },
        async downloadProofOfDelivery(document_uuid) {
            try{
                const response = await useApi().get(`order/${this.$route.params.id}/proof/${document_uuid}/download`);
                window.open(response.proof_signed_url, '_blank');
            }catch(error){
                console.log(error)
            }
        },
        async getDocuments(order_uuid) {
            this.documents = []
            try{
                const response = await useApi().get(`order/${this.$route.params.id}/document/${order_uuid}`);
                //console.log(response)
                for(const document of response.order_documents){
                    this.documents.push({
                        uuid: document.document_uuid,
                        name: document.document_file_name,
                        type: document.document_file_type,
                        size: document.document_file_size,
                        url: document.document_file_url
                    })
                }
            }catch(error){
                console.log(error)
            }
        },
        async downloadDocument(document_uuid) {
            try{
                const response = await useApi().get(`order/${this.$route.params.id}/document/${document_uuid}/download`);
                window.open(response.document_signed_url, '_blank');
            }catch(error){
                console.log(error)
            }
        }
    }
}
</script>
<style scoped>
label {
    font-size: 12px;
    margin-top: 12px;
}
</style>