<template>
  <Dialog v-bind:open="isOrderDialogOpen">
    <DialogContent class="max-h-[60vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div class="flex flex-col gap-2">
        <label for="order-no">Order No.</label>
        <Input id="order-no" placeholder="16000000000" v-model="selectedOrder.task_name"/>
      </div>
      <div class="flex flex-col gap-2">
        <label for="customer-name">Customer Name</label>
        <Input id="customer-name" placeholder="John Doe" v-model="selectedOrder.task_customer_name"/>
      </div>
      <div class="flex flex-col gap-2">
        <label for="customer-address">Customer Address</label>
        <Input id="customer-address" placeholder="123 Main St, Anytown, USA" v-model="selectedOrder.task_address"/>
      </div>
      <div class="flex flex-col gap-2">
        <label for="customer-phone">Customer Phone</label>
        <Input id="customer-phone" placeholder="123-456-7890" v-model="selectedOrder.task_phone"/>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label for="customer-notes">Supplier</label>
        <Popover class="w-full">
          <PopoverTrigger as-child class="w-full">
            <Button
              variant="outline"
              role="combobox"
              :aria-expanded="open"
              class="w-full justify-between"
            >
              {{ selectedSupplier ? selectedSupplier.supplier_name : 'Select supplier...' }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search Supplier..." />
              <CommandEmpty>No supplier found.</CommandEmpty>
              <CommandList>
                <CommandItem
                  v-for="supplier in suppliers"
                  @select="selectSupplier(supplier)"
                  :key="supplier.supplier_uuid"
                  :value="supplier.supplier_name"
                >
                  {{ supplier.supplier_name }}
                </CommandItem>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label for="payment-terms">Payment Terms</label>
        <Popover class="w-full">
          <PopoverTrigger as-child class="w-full">
            <Button
              variant="outline"
              role="combobox"
              :aria-expanded="open"
              class="w-full justify-between"
            >
              {{ selectedPaymentMethod ? selectedPaymentMethod.payment_method_name : 'Select payment term...' }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search Payment Term..." />
              <CommandEmpty>No payment term found.</CommandEmpty>
              <CommandList>
                <CommandItem
                  v-for="method in paymentTerms"
                  @select="selectPaymentTerm(method)"
                  :key="method.payment_method_uuid"
                  :value="method.payment_method_name"
                >
                  {{ method.payment_method_name }}
                </CommandItem>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label for="amount">Amount</label>
        <Input id="amount" placeholder="1000" v-model="selectedOrder.task_amount"/>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label for="description">Description</label>
        <Textarea id="description" placeholder="Description" v-model="selectedOrder.task_description"/>
      </div>
      <DialogFooter>
        <Button @click="saveOrder" v-if="!selectedOrder.task_uuid">Save</Button>
        <Button @click="updateOrder" v-if="selectedOrder.task_uuid">Update</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
<script>
export default {
  props: {
    isOrderDialogOpen: {
      type: Boolean,
      required: true
    },
    selectedOrder: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      value: null,
      supplierValue: null,
      supplierSearch: null,
      suppliers: [],
      paymentTermValue: null,
      paymentTermSearch: null,
      paymentTerms: [],
      value: null,
      selectedSupplier: null,
      selectedPaymentMethod: null,
    }
  },
  methods: {
    selectSupplier,
    selectPaymentTerm,
    saveOrder,
    updateOrder,
    getSuppliers,
    getPaymentTerms
  },
  mounted() {
    this.getSuppliers()
  }
}

function selectSupplier(supplier) {
  console.log('selected supplier',supplier)
  this.selectedSupplier = supplier
  this.getPaymentTerms(supplier.supplier_uuid)
}

function selectPaymentTerm(method) {
  this.selectedPaymentMethod = method
}

async function saveOrder() {
  console.log(this.form)
  const api = useApi()
  try {
    const task = {
      task_name: this.selectedOrder.task_name,
      task_customer_name: this.selectedOrder.task_customer_name,
      task_address: this.selectedOrder.task_address,
      task_phone: this.selectedOrder.task_phone,
      task_supplier_uuid: this.selectedSupplier?.supplier_uuid,
      task_payment_method_uuid: this.selectedPaymentMethod?.payment_method_uuid,
      task_amount: this.selectedOrder.task_amount,
      task_description: this.selectedOrder.task_description
    }
    await api.post('task/create', task)
    .then(response => {
      console.log(response)
      this.$emit('success');
    })
    .catch(error => {
      throw new Error(error)
    })
  } catch (error) {
    console.log(error)
  }
}

async function updateOrder() {
  const api = useApi()
  try {
    const task = {
      task_name: this.selectedOrder.task_name,
      task_customer_name: this.selectedOrder.task_customer_name,
      task_address: this.selectedOrder.task_address,
      task_phone: this.selectedOrder.task_phone,
      task_supplier_uuid: this.selectedSupplier?.supplier_uuid,
      task_payment_method_uuid: this.selectedPaymentMethod?.payment_method_uuid,
      task_amount: this.selectedOrder.task_amount,
      task_description: this.selectedOrder.task_description
    }
    await api.put(`task/update/${this.selectedOrder.task_uuid}`, task)
    .then(response => {
      console.log(response)
      this.$emit('success');
    })
  } catch (error) {
    console.log(error)
  }
}

async function getSuppliers() {
  const api = useApi()
  const {suppliers} = await api.get('supplier/get')
  this.suppliers = suppliers
}

async function getPaymentTerms(supplierUuid) {
  const api = useApi()
  const {paymentMethods} = await api.get(`supplier/get_payment_methods/${supplierUuid}`)
  console.log('payment methods',paymentMethods)
  this.paymentTerms = paymentMethods
}
</script>
