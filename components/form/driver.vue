<template>
    <DialogHeader>
        <DialogTitle>Driver</DialogTitle>
    </DialogHeader>
    <div>
        <Label>User</Label>
        <Select @update:open="handleOpenChange" v-model="user_uuid">
            <SelectTrigger>
                <SelectValue placeholder="Select User"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="user in users" :key="user.user_uuid" :value="user.user_uuid">{{ user.user_first_name }} {{ user.user_last_name }}</SelectItem>
            </SelectContent>
        </Select>
    </div>
    <DialogFooter>
        <Button @click="save">Save</Button>
    </DialogFooter>
</template>
<script>
export default {
    name: 'FormDriver',
    data() {
        return {
            users: [],
            user_uuid: null
        }
    },
    created() {
        if(this.$store.dialogContent){
            this.getUsers();
            this.user_uuid = this.$store.dialogContent.user_uuid;
        }
    },
    methods: {
        handleOpenChange(open) {
            if(open) {
                this.getUsers();
            }
        },
        async getUsers() {
            try{
                const response = await useApi().get(`/user/${this.$route.params.id}/get`);
                console.log(response);
                this.users = response.users;
            }catch(error){
                this.$toast({
                    title: 'Error',
                    description: 'Failed to get users',
                    variant: 'destructive',
                })
            }
        },
        async save() {
            console.log('save');
            console.log(this.$store.dialogContent);
            try{
                let response, message;
                if(this.$store.dialogContent){
                    console.log('update');
                    let driver = {
                        driver_user_uuid: this.user_uuid,
                    }
                    response = await useApi().put(`/driver/${this.$route.params.id}/update/${this.$store.dialogContent.driver_uuid}`, driver);
                    message = 'Driver updated';
                }else{
                    let driver = {
                        driver_user_uuid: this.user_uuid,
                    }
                    response = await useApi().post(`/driver/${this.$route.params.id}/create`, driver);
                    message = 'Driver created';
                }
                this.$toast({
                    title: 'Success',
                    description: message,
                    variant: 'default',
                })
            }catch(error){
                console.log(error);
                this.$toast({
                    title: 'Error',
                    description: 'Failed to save',
                    variant: 'destructive',
                })
            }
        }
    },
}
</script>