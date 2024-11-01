<template>
  <Dialog v-bind:open="isOrderDialogOpen">
    <DialogContent class="max-w-2xl h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col gap-2">
        <label for="order-no">Order No.</label>
        <Input id="order-no" placeholder="16000000000" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="order-date">Order Date</label>
        <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
      </div>
      <div class="flex flex-col gap-2">
        <label for="customer-name">Customer Name</label>
        <Input id="customer-name" placeholder="John Doe" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="customer-address">Customer Address</label>
        <Input id="customer-address" placeholder="123 Main St, Anytown, USA" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="customer-phone">Customer Phone</label>
        <Input id="customer-phone" placeholder="123-456-7890" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="customer-email">Customer Email</label>
        <Input id="customer-email" placeholder="john.doe@example.com" />
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
              {{ supplier ? supplier : 'Select supplier...' }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[300px] p-0">
            <Command v-model="value" class="w-full">
              <CommandInput placeholder="Search Supplier..." v-model="supplierSearch"/>
              <CommandEmpty>No supplier found.</CommandEmpty>
              <CommandList class="w-full">
                <CommandGroup>
                  <CommandItem
                    v-for="supplier in suppliers"
                    @select="selectSupplier(supplier.id)"
                    class="cursor-pointer"
                    :key="supplier.id"
                    :value="supplier.id"
                  >
                    {{ supplier.label }}
                  </CommandItem>
                </CommandGroup>
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
              {{ paymentTerm ? paymentTerm : 'Select payment term...' }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[300px] p-0">
            <Command v-model="value" class="w-full">
              <CommandInput placeholder="Search Payment Term..." v-model="paymentTermSearch"/>
              <CommandEmpty>No payment term found.</CommandEmpty>
              <CommandList class="w-full">
                <CommandGroup>
                  <CommandItem
                    v-for="paymentTerm in paymentTerms"
                    @select="selectPaymentTerm(paymentTerm.id)"
                    class="cursor-pointer"
                    :key="paymentTerm.id"
                    :value="paymentTerm.id"
                  >
                    {{ paymentTerm.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label for="amount">Amount</label>
        <Input id="amount" placeholder="1000" />
      </div>
      <DialogFooter> <Button>Save</Button> </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
<script>
export default {
  props: {
    isOrderDialogOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      value: null,
      supplier: null,
      supplierSearch: null,
      suppliers: [
        { id: 1, label: 'Supplier 1' },
        { id: 2, label: 'Supplier 2' }
      ],
      paymentTerm: null,
      paymentTermSearch: null,
      paymentTerms: [
        { id: 1, label: 'Payment Term 1' },
        { id: 2, label: 'Payment Term 2' }
      ],
      value: null
    }
  },
  methods: {
    selectSupplier,
    selectPaymentTerm
  }
}

function selectSupplier(supplierId) {
  this.supplier = supplierId
}

function selectPaymentTerm(paymentTermId) {
  this.paymentTerm = paymentTermId
}
</script>
