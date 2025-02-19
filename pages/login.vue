<template>
  <div class="flex justify-center items-center h-screen w-screen p-4">
    <SignIn :SignUp="false" redirect-url="/"/>
  </div>
</template>
<script>
export default {
  methods: {
    trackOrder() {
      navigateTo('/track-order')
    }
  },
  mounted(){
    const { isSignedIn } = useAuth();
    if(isSignedIn){
      navigateTo('/');
    }
  }
}
</script>
<style>
.cl-headerTitle{
  display: none;
}
</style>