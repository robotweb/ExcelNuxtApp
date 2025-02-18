<template>
  <Toaster />
  <div>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <ClerkProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ClerkProvider>
  </div>
</template>