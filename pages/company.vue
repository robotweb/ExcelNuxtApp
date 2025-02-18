<template>

</template>
<script setup>
onMounted(async () => {
  const { getToken } = useAuth(); // Get the getToken method from useAuth()
  const config = useRuntimeConfig();
  try {
    // Get the JWT token
    const myjwt = await getToken.value();
    if (myjwt) {
      // Decode the JWT token
      const decodedJwt = decodeJWT(myjwt);
      const public_metadata = decodedJwt.public_metadata;
      const company = public_metadata.company[0];
      const app_mode = config.public.appMode
      
      if(app_mode == "DRIVER"){
        return navigateTo(`${company}/driver`);
      }

      return navigateTo(`${company}`)
//      console.log(public_metadata);
    } else {
      console.log('No token found');
    }
  } catch (error) {
    console.error('Error decoding JWT:', error);
  }
});

function decodeJWT(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedData = JSON.parse(atob(base64));
  return decodedData;
}

</script>