<template>
  <Sidebar defaultOpen="true" class="h-full bg-gray-50">
    <SidebarHeader> </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel></SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuButton asChild>
              <a :href="`/admin/${$route.params.id}/orders`">
                <Icon name="lucide:package" size="24" />
                <span>Orders</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a :href="`/admin/${$route.params.id}/drivers`">
                <Icon name="lucide:truck" size="24" />
                <span>Drivers</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a :href="`/admin/${$route.params.id}/customers`">
                <Icon name="lucide:users" size="24" />
                <span>Customers</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a :href="`/admin/${$route.params.id}/suppliers`">
                <Icon name="lucide:store" size="24" />
                <span>Suppliers</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a :href="`/admin/${$route.params.id}/team`">
                <Icon name="lucide:circle-user" size="24" />
                <span>Team</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton class="flex items-center justify-between w-full"  @click="logout">
              <span>Sign out</span>
              <Icon name="lucide:log-out" />
            </SidebarMenuButton>
          <!--<DropdownMenu class="w-full">
            <DropdownMenuTrigger class="w-full">
              <SidebarMenuButton class="flex items-center justify-between w-full">
                <span>{{ username }}</span>
                <Icon name="i-heroicons-chevron-up" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-[--radix-popper-anchor-width]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a :href="`/${$route.params.id}/team`">Team</a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="logout">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>-->
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
  },
  methods: {
    logout(){
      const cookie = useCookie('jwt');
      cookie.value = null;
      navigateTo('/login')
    }
  },
}

</script>
<style>
.cl-userButtonBox{
    width: 100%;
    justify-content: space-between;
}

.cl-rootBox, .cl-userButtonTrigger{
    width: 100%;
}
</style>
