<template>
    <div class="mt-4">
        <div v-for="document in documents" :key="document.id" class="flex flex-row gap-2 items-center justify-between border p-2 rounded-md">
            <div class="text-sm font-medium truncate">{{ document.name }}</div>
            <!--<div>{{ document.type }}</div>
            <div>{{ document.size }}</div> -->
            <div class="flex flex-row gap-2">
                <Button @click="downloadDocument(document.uuid)"><Icon name="lucide:download" class="w-4 h-4" /></Button>
                <Button @click="deleteDocument(document.uuid)" variant="destructive"><Icon name="lucide:trash" class="w-4 h-4"/></Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyDocumentList',
    props: {
        documents: {
            type: Array,
            required: true
        }
    },
    methods: {
        downloadDocument(uuid) {
            this.$emit('download', uuid)
        },
        async deleteDocument(uuid) {
            try{
                const response = await useApi()._delete(`order/${this.$route.params.id}/proof/${uuid}`);
                //console.log(response)
                this.$emit('refresh')
            }catch(error){
                console.log(error)
            }
        }
    }
}
</script>
