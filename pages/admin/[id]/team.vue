<template>
    <div class="flex justify-between items-center w-full mb-4">
        <div>
            <p>Team</p>
        </div>
        <div class="flex gap-2">
            <Button @click="openAddTeamMemberDialog"><Icon name="lucide:plus" class="mr-2" />Add</Button>
        </div>
    </div>
    <DataTable :columns="columns" :data="team" @row-click="onRowClick" />
    <Popup>
        <FormTeam />
    </Popup>
</template>
<script>
definePageMeta({
    layout: 'loggedin'
})
export default {
    name: 'CompanyTeamPage',
    data() {
        return {
            team: [],
            columns: [
                {
                    label: 'Name',
                    key: 'user_first_name'
                },
                {
                    label: 'Surname',
                    key: 'user_last_name'
                },
                {
                    label: 'Email',
                    key: 'user_email'
                },
                {
                    label: 'Phone',
                    key: 'user_phone'
                }
            ]
        }
    },
    methods: {
        openAddTeamMemberDialog() {
            this.$store.dialogOpen = true;
        },
        async getTeam() {
            try{
                const response = await useApi().get(`user/${this.$route.params.id}/get`);
                console.log(response);
                this.team = response.users;
            }catch(error){
                console.log(error);
                this.$toast({
                    title: 'Error',
                    description: 'Failed to get team',
                    variant: 'destructive',
                })
            }
        },
        onRowClick(row) {
            //console.log(row);
            this.$store.dialogContent = row;
            this.$store.dialogOpen = true;
        }
    },
    async mounted() {
        await this.getTeam();
    }
}
</script>
