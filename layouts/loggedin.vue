<template>
  <div class="">
    <SidebarProvider :default-open="true">
      <AppSidebar />
      <main class="p-4 mt-1">
        <SidebarTrigger />
      </main>
      <main class="p-4 w-full">
        <slot />
      </main>
    </SidebarProvider>
  </div>
</template>