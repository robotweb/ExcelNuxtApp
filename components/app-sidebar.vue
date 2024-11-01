<template>
  <Sidebar defaultOpen="true">
    <SidebarHeader> </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel></SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuButton asChild>
              <a href="/orders">
                <Icon name="lucide:package" size="24" />
                <span>Orders</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a href="/suppliers">
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
                <span>Username</span>
                <Icon name="i-heroicons-chevron-up" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-[--radix-popper-anchor-width]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
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
      items: []
    }
  },
  methods: {
    logout
  }
}

function logout() {
  navigateTo('/')
}
</script>
