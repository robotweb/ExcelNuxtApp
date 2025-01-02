<template>
    <DialogHeader>
        <DialogTitle>Import Orders</DialogTitle>
    </DialogHeader>
    <div>
        <Input type="file" accept=".xlsx" @change="handleFileChange"/>
    </div>
    <DialogFooter>
        <Button @click="uploadFile" :disabled="isLoading">Import</Button>
    </DialogFooter>
</template>
<script>
export default {
    name: 'FormOrderImport',
    data() {
        return {
            selectedFile: null,
            isLoading: false,
        }
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            if(file){
                this.selectedFile = file;
            }
        },
        async uploadFile() {
            this.isLoading = true;
            try{
                if(!this.selectedFile){
                    return;
                }
                const formData = new FormData();
                formData.append('file', this.selectedFile);
                const headers = {}
                const response = await useApi().post(`order/${this.$route.params.id}/import`, formData, headers);
                console.log(response);
                this.$store.dialogOpen = false;
                this.$emit('refreshOrders');
                this.$toast({
                    title: 'Success',
                    description: 'Orders imported',
                    variant: 'default',
                })
            }catch(error){
                console.log(error);
                this.$toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                })
            }finally{
                this.isLoading = false;
            }
        }
    }
}
</script>