<template>
    <DialogHeader>
        <DialogTitle>Team Member</DialogTitle>
    </DialogHeader>
    <div>
        <div class="flex gap-2 mb-4">
            <div class="w-1/2">
                <Label>Name</Label>
                <Input type="text" placeholder="Name" v-model="name" />
            </div>
            <div class="w-1/2">
                <Label>Surname</Label>
                <Input type="text" placeholder="Surname" v-model="surname" />
            </div>
        </div>
        <div class="flex gap-2 mb-4">
            <div class="w-1/2">
                <Label>Phone</Label>
                <Input type="text" placeholder="Phone" v-model="phone" />
            </div>
            <div class="w-1/2">
                <Label>Email</Label>
                <Input type="text" placeholder="Email" v-model="email" />
            </div>
        </div>
    </div>
    <DialogFooter>
        <Button @click="save">Save</Button>
    </DialogFooter>
</template>
<script>
export default {
    name: 'TeamNew',
    data() {
        return {
            name: '',
            surname: '',
            phone: '',
            email: ''
        }
    },
    watch: {
        user() {
            console.log('watch',this.$store.selectedUser);
            
        }
    },
    created() {
        console.log('created',this.$store.dialogContent);
        if(this.$store.dialogContent){
            this.name = this.$store.dialogContent.user_first_name;
            this.surname = this.$store.dialogContent.user_last_name;
            this.phone = this.$store.dialogContent.user_phone;
            this.email = this.$store.dialogContent.user_email;
        }
    },
    methods: {
        async save() {
            const user = {
                user_first_name: this.name,
                user_last_name: this.surname,
                user_phone: this.phone,
                user_email: this.email
            }
            try{
                let response, description;
                if(this.$store.dialogContent){
                    response = await useApi().put(`/user/${this.$route.params.id}/update/${this.$store.dialogContent.user_uuid}`, user);
                    description = 'Team member updated';
                }else{
                    response = await useApi().post(`/user/${this.$route.params.id}/create`, user);
                    description = 'Team member added';
                }
                console.log(response);
                this.$toast({
                    title: 'Success',
                    description: description,
                    variant: 'default',
                })
            }catch(error){
                console.log(error);
                this.$toast({
                    title: 'Error',
                    description: 'Failed to add team member',
                    variant: 'destructive',
                })
            }
        },
    }
}
</script>