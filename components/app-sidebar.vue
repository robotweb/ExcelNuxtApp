<template>
  <Sidebar defaultOpen="true">
    <SidebarHeader> </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel></SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuButton asChild>
              <a :href="`/${$route.params.id}/orders`">
                <Icon name="lucide:package" size="24" />
                <span>Orders</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a :href="`/${$route.params.id}/drivers`">
                <Icon name="lucide:truck" size="24" />
                <span>Drivers</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a :href="`/${$route.params.id}/customers`">
                <Icon name="lucide:users" size="24" />
                <span>Customers</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a :href="`/${$route.params.id}/suppliers`">
                <Icon name="lucide:store" size="24" />
                <span>Suppliers</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu class="w-full">
            <DropdownMenuTrigger class="w-full">
              <SidebarMenuButton class="flex items-center justify-between w-full">
                <span>{{ username }}</span>
                <Icon name="i-heroicons-chevron-up" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-[--radix-popper-anchor-width]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <!-- <DropdownMenuItem>Profile</DropdownMenuItem> -->
              <DropdownMenuItem asChild>
                <a :href="`/${$route.params.id}/team`">Team</a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="logout">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      username: null
    }
  },
  mounted() {
    this.username = this.getUsername()
  },
  methods: {
    getUsername() {
      const userStore = useUserStore()
      return userStore.username
    },
    logout() {
      const userStore = useUserStore()
      userStore.$reset()
      localStorage.removeItem('token')
      navigateTo('/')
    }
  },
}

</script>
