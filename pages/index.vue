<template>
  <div class="flex justify-center items-center h-screen">
    <Card class="w-96 p-4">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <Input type="phone" placeholder="Phone" />
        <Button class="w-full" @click="login">Login</Button>
      </CardContent>
    </Card>
  </div>
</template>
<script>
export default {
  methods: {
    login
  }
}
function login() {
  navigateTo('/orders')
}
</script>
