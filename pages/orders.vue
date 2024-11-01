<template>
  <div class="flex justify-end gap-2 w-full">
    <Button>Upload</Button><Button @click="isOrderDialogOpen = true">Add Order</Button>
  </div>
  <DialogAddOrder v-model:open="isOrderDialogOpen" />
  <div class="my-4 flex items-center gap-2">
    <Button><Icon name="lucide:search" /></Button>
    <Input placeholder="Search" />
    <Button><Icon name="lucide:clock" /></Button>
    <Button><Icon name="lucide:filter" /></Button>
    <Button><Icon name="lucide:download" /></Button>
  </div>
  <DataTable :data="data" :columns="columns" :actions="actions"/>
</template>
<script>
definePageMeta({
  layout: 'loggedin'
})

export default {
  data() {
    return {
      isOrderDialogOpen: false,
      data: [
        {
          id: '112123',
          name: 'John Doe',
          supplier: 'Supplier 1',
          paymentTerm: 'Payment Term 1',
          amount: 1000,
          date: '2024-01-01'
        },
        {
          id: '1111111',
          name: 'Jane Doe',
          supplier: 'Supplier 2',
          paymentTerm: 'Payment Term 2',
          amount: 2000,
          date: '2024-01-02'
        },
        {
          id: '111232323',
          name: 'Jim Doe',
          supplier: 'Supplier 3',
          paymentTerm: 'Payment Term 3',
          amount: 3000,
          date: '2024-01-03',
        }
      ],
      columns: [
        {
          label: 'ID',
          key: 'id'
        },
        {
          label: 'Name',
          key: 'name'
        },
        {
          label: 'Supplier',
          key: 'supplier'
        },
        {
          label: 'Payment Term',
          key: 'paymentTerm'
        },
        {
          label: 'Amount',
          key: 'amount'
        },
        {
          label: 'Date',
          key: 'date'
        }
      ],
      actions: [
        {
          label: 'View',
          onClick: (row) => {
            console.log(row)
          },
          icon: 'lucide:eye'
        },
        {
          label: 'Edit',
          onClick: (row) => {
            console.log(row)
          },
          icon: 'lucide:pencil'
        },
        {
          label: 'Delete',
          onClick: (row) => {
            console.log(row)
          },
          icon: 'lucide:trash'
        }
      ]
    }
  }
}
</script>
