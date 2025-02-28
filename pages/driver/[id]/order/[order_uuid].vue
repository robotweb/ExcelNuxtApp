<template>
    <div class="page-grid">
    <div class="flex p-2 mb-4 justify-between">
        <div class="flex items-center">
            <Button variant="secondary" @click="handleBack()"><Icon name="lucide:arrow-left"/></Button>
            <Skeleton v-if="isloading" class="w-[150px]"/>
            <p v-else class="pl-2 font-semibold">
                {{ order.order_reference }}
            </p>
        </div>
        <Skeleton v-if="isloading"/>
        <Badge variant="order.order_status" v-else>
            {{ status }}
        </Badge>
    </div>
    <div class="overflow flex flex-col gap-4" v-if="order">
    <Card>
        <CardHeader>
            <p class="font-semibold">Details</p>
        </CardHeader>
        <CardContent class="flex flex-col gap-2">
            <div class="details-card-row">
                <span class="text-semibold">
                    Order Date
                </span>
                <span>
                    {{ order_date }}
                </span>
            </div>
            <div class="details-card-row">
                <span class="text-semibold">
                    Pickup
                </span>
                <span>
                    {{ order.routes.route_pickup_address}}
                </span>
            </div>
            <div class="details-card-row">
                <span class="text-semibold">
                    Dropoff
                </span>
                <span>
                    {{ order.routes.route_dropoff_address}}
                </span>
            </div>
        </CardContent>
    </Card>
    <Card v-if="order">
        <CardHeader class="font-semibold">
            Notes
        </CardHeader>
        <CardContent>
            <p>
                {{ order.order_note }}
            </p>
        </CardContent>
    </Card>
    <Card>
        <CardHeader class="font-semibold">
            Pickup Instructions
        </CardHeader>
        <CardContent>
            {{ order.order_pickup_instructions }}
        </CardContent>
    </Card>
    <Card>
        <CardHeader class="font-semibold">
            Dropoff Instructions
        </CardHeader>
        <CardContent>
            {{ order.order_dropoff_instructions }}
        </CardContent>
    </Card>
    <Card>
        <CardHeader>
            <CardTitle>Proof of Delivery</CardTitle>
        </CardHeader>
        <CardContent>
            <FilePondUploader :company="$route.params.id" :order="$route.params.order_uuid"/>
            <div class="flex flex-row gap-2">
            </div>
            <MyDocumentList :documents="proofOfDeliveryFiles" @refresh="getProofOfDelivery(this.$store.orderSheetData.order_uuid)" @download="downloadProofOfDelivery"/>
        </CardContent>
    </Card>
    <Card>
        <CardHeader class="font-semibold">
            Status
        </CardHeader>
        <CardContent class="flex flex-col gap-2">
            <MySelect v-model="status" :options="statusOptions" />
        </CardContent>
    </Card>
    </div>
</div>

</template>
<script>
definePageMeta({
    layout: 'driver',
})
export default{
    data(){
        return{
            isloading: true,
            order: null,
            order_date: "",
            selectedProofOfDeliveryFiles: [],
            status: null,
            statusOptions: [
               'Collected',
               'On Route',
               'Delivered',
            ],
            apiOrderStatus: "",
        }
    },
    methods:{
        async handleBack(){
            this.$router.go(-1)
        },
        async getOrder(){
            const response = await useApi().get(`/order/${this.$route.params.id}/get/${this.$route.params.order_uuid}`)
            console.log(response)
            this.order = response.order
            this.isloading = false
            this.dateFormat(this.order.order_scheduled_date)
            this.apiOrderStatus = this.order.order_status
            this.status = this.order.order_status;
        },
        async dateFormat(date){
            const format = await date.split('T')[0]
            this.order_date = format;
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
            if(files.length == 0){
                return
            }
            try{
                const formData = new FormData();
                 // Log each file being added
                Array.from(files).forEach((file, index) => {
                    console.log(`Adding file ${index}:`, file.name, file.type, file.size);
                    formData.append('files', file);
                });
                const response = await useApi().post('/order/' + this.$route.params.id + '/proof/' + this.$route.order_uuid, formData, {
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
                const response = await useApi().post('/order/' + this.$route.params.id + '/document/' + this.$store.orderSheetData.order_uuid, formData, {
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
                const documents = await useApi().get(`/order/${this.$route.params.id}/proof/${order_uuid}`);
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
                const response = await useApi().get(`/order/${this.$route.params.id}/proof/${document_uuid}/download`);
                window.open(response.proof_signed_url, '_blank');
            }catch(error){
                console.log(error)
            }
        },
        async getDocuments(order_uuid) {
            this.documents = []
            try{
                const response = await useApi().get(`/order/${this.$route.params.id}/document/${order_uuid}`);
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
                const response = await useApi().get(`/order/${this.$route.params.id}/document/${document_uuid}/download`);
                window.open(response.document_signed_url, '_blank');
            }catch(error){
                console.log(error)
            }
        },

    },
    mounted(){
        this.getOrder()
    },
    watch:{
        async status(newValue){
            if(newValue != this.apiOrderStatus){
                try{
                    console.log('update')
                    const response = await useApi().put(`/order/${this.$route.params.id}/update/${this.$route.params.order_uuid}`,{
                        order_status : newValue
                    })
                    console.log(response)
                    this.status = newValue;
                    this.$toast({
                        title: 'Success'
                    })
                }catch(e){
                    console.log(e)
                    this.$toast({
                        title: 'Error',
                        variant: 'destructive'
                    })
                }

            }
        }
    }
}

</script>
<style>
.details-card-row{
    display: grid;
    grid-template-columns: 2fr 4fr;
}
.page-grid{
    display: grid;
    grid-template-rows: auto 1fr; /* 1/4 and 3/4 columns */
    height: 100vh;
}
.overflow{
    overflow-y: scroll;
}
</style>