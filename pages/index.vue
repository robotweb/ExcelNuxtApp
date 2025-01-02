<template>
  <div class="flex justify-center items-center h-screen">
    <Card class="w-96 p-4">
      <CardHeader>
        <CardTitle v-if="!isValidate">Login</CardTitle>
        <CardTitle v-else>OTP</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <Input type="phone" placeholder="Phone" v-model="phone" v-if="!isValidate"/>
        <Input type="text" placeholder="OTP" v-model="otp" v-else/>
      </CardContent>
      <CardFooter>
        <Button class="w-full" @click="login" v-if="!isValidate">Login</Button>
        <Button class="w-full" @click="validate" v-else>Validate OTP</Button>
      </CardFooter>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: '',
      otp: '',
      isValidate: false,
    }
  },
  methods: {
    async login() {
      try {
        const login = await useApi().post('user/login', { phone: this.phone })
        console.log(login)
        this.isValidate = true
      } catch (error) {
        console.error(error)
        this.$toast({
          title: 'Error',
          description: 'Something went wrong',
          variant: 'destructive',
        })
      }
    },
    async validate() {
      try {
        const userStore = useUserStore()
        const validate = await useApi().post('user/verify-otp', { phone: this.phone, otp: this.otp })
        const token = validate.token
        localStorage.setItem('token', token)
        const company = validate.company_uuid;
        const username = validate.username;
        userStore.username = username
        if (company.length == 1) {
          let company_uuid = company[0].company_user_company_uuid;
          navigateTo(`/${company_uuid}/orders`)
        } else {
          navigateTo('/companies')
        }
      } catch (error) {
        console.error(error)
        this.$toast({
          title: 'Error',
          description: 'Something went wrong',
          variant: 'destructive',
        })
      }
    },
  },
}
</script>
