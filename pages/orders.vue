<template>
  <div class="flex justify-end gap-2 w-full">
    <Button>Upload</Button><Button @click="openAddOrderSheet">Add Order</Button>
  </div>
  <DialogAddOrder v-model:open="isOrderDialogOpen" @success="addOrderSuccess" :selectedOrder="selectedOrder" />
  <DialogAddOrderFeedback v-model:open="isOrderFeedbackDialogOpen" @success="addOrderFeedbackSuccess" :selectedOrder="selectedOrder" />
  <DialogViewOrder v-model:open="isViewDialogOpen" :selectedOrder="selectedOrder" />
  <div class="my-4 flex items-center gap-2">
    <Button><Icon name="lucide:search" /></Button>
    <Input placeholder="Search" />
    <Button><Icon name="lucide:clock" /></Button>
    <Button><Icon name="lucide:filter" /></Button>
    <Button><Icon name="lucide:download" /></Button>
  </div>
  <DataTable :data="data" :columns="columns" :actions="actions" @row-click="handleRowClick" />
  <OrderSheet :order="selectedOrder" v-bind:open="isOrderSheetOpen" @update:open="updateOrderSheetOpen" @new-order-success="newOrderSuccess" />
</template>
<script>
definePageMeta({
  layout: 'loggedin'
})

export default {
  data() {
    return {
      isOrderDialogOpen: false,
      isOrderFeedbackDialogOpen: false,
      isViewDialogOpen: false,
      isOrderSheetOpen: false,
      selectedOrder: null,
      data: [],
      columns: [
        {
          label: 'Order No',
          key: 'task_name'
        },
        {
          label: 'Customer Name',
          key: 'task_customer_name'
        },
        {
          label: 'Customer Address',
          key: 'task_address'
        },
        {
          label: 'Status',
          key: 'status',
          render: (row) => row.status,
          component: 'Badge'
        }
      ],
      actions: [
        {
          label: 'View',
          onClick: async (row) => {
            console.log('row', row)
            this.selectedOrder = row;
            console.log('dialog open before', this.isViewDialogOpen);
            await this.getOrder(row.task_uuid);
            this.isViewDialogOpen = true;
            console.log('dialog open after', this.isViewDialogOpen);
          },
          icon: 'lucide:eye'
        },
        {
          label: 'Edit',
          onClick: (row) => {
            this.selectedOrder = row
            this.isOrderDialogOpen = true
          },
          icon: 'lucide:pencil'
        },
        {
          label: 'Feedback',
          onClick: (row) => {
            this.selectedOrder = row
            this.isOrderFeedbackDialogOpen = true
          },
          icon: 'lucide:message-circle'
        },
        {
          label: 'Delete',
          onClick: (row) => {
            this.selectedOrder = row
            this.isOrderSheetOpen = true
          },
          icon: 'lucide:trash'
        }
      ],
    }
  },
  methods: {
    getOrders,
    deleteOrder,
    addOrderSuccess,
    addOrderFeedbackSuccess,
    openAddOrderSheet,
    getOrder,
    handleRowClick,
    updateOrderSheetOpen,
    newOrderSuccess
  },
  mounted() {
    this.getOrders()
  }
}

function newOrderSuccess() {
  this.getOrders()
}

function openAddOrderSheet() {
  this.$store.sheet = 'add-order'
  this.isOrderSheetOpen = true
}

function handleRowClick(row) {
  this.selectedOrder = row
  this.isOrderSheetOpen = true
  this.$store.selectedOrder = row
  this.$store.sheet = 'view-order'
  console.log('row', row)
}

function updateOrderSheetOpen() {
  this.isOrderSheetOpen = false
}


async function getOrders() {
  const api = useApi()
  const { tasks } = await api.get('/task/get')
  this.data = tasks
}

async function deleteOrder(id) {
  const api = useApi()
  await api._delete(`/task/delete/${id}`)
  this.getOrders()
}

async function getOrder(id) {
  const api = useApi()
  const response = await api.get(`/task/get/${id}`)
  console.log('response',response)
  this.selectedOrder = response;
  this.isViewDialogOpen = true
}

function addOrderSuccess() {
  this.isOrderDialogOpen = false;
  this.getOrders()
}

function addOrderFeedbackSuccess() {
  this.isOrderFeedbackDialogOpen = false;
  this.getOrders()
}
</script>
