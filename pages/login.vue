<template>
  <div class="flex justify-center items-center h-screen w-screen p-4">
    <MyLogin />
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
    
  }
}
</script>
<style>
.cl-headerTitle{
  display: none;
}
</style>