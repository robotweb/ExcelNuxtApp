<template>
    <Card class="min-w-[400px] max-w-full">
        <CardContent class="flex flex-col gap-2 p-8" v-if="!phoneResponse">
            <Label>Phone</Label>
            <Input type="phone" placeholder="Phone" v-model="phone"/>
            <Button @click="checkPhone">Sign in</Button>
            <Button variant="outline" @click="trackOrder">Track Order</Button>
        </CardContent>
        <CardContent class="flex flex-col gap-2 p-8" v-else>
            <label>OTP</label>
            <Input type="phone" v-model="otp"/>
            <Button @click="validateOtp">Validate</Button>
            <Button variant="outline" @click="backtophone">Back</Button>
        </CardContent>
    </Card>
</template>
<script>
export default{
    data(){
        return {
            phone: null,
            phoneResponse: false,
            otp: null
        }
    },
    methods : {
        async checkPhone(){
            const config = useRuntimeConfig()
            const baseUrl = config.public.apiBase
            try{
                const response = await $fetch(`${baseUrl}/user/login`,{
                    method: "POST",
                    body: {
                        phone : this.phone
                    }
                })
                this.phoneResponse = true
            }catch(error){
                console.log(error);
                this.$toast({
                    title: 'Error',
                    description: error,
                    variant: 'destructive',
                })
            }

        },
        backtophone(){
            this.phone = null;
            this.phoneResponse = false;
        },
        async validateOtp(){
            try{
                const config = useRuntimeConfig()
                const baseUrl = config.public.apiBase
                const response  = await $fetch(`${baseUrl}/user/verify-otp`,{
                    method: "POST",
                    body:{
                        phone: this.phone,
                        otp: this.otp
                    }
                })
                console.log(response);
                const cookie = useCookie('jwt')
                cookie.value = response.token;
                this.$toast({
                    title: 'Success',
                })
                navigateTo('/logged-in')
            }catch(error){
                console.log(error)
                this.$toast({
                    title: 'Error',
                    description: 'Otp invalid',
                    variant: 'destructive',
                })
            }
        },
        trackOrder() {
            navigateTo('/track-order')
        }
    }
}
</script>