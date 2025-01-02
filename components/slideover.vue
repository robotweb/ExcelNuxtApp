<template>
    <Sheet :open="isOpen" @update:open="updateOpen">
        <SheetContent>
            <slot />
        </SheetContent>
    </Sheet>
</template>
<script>
export default {
    name: 'Slideover',
    computed: {
        isOpen() {
            return this.$store.sheetOpen === true;
        }
    },
    methods: {
        updateOpen(open) {
            this.$store.orderSheetData = null;
            this.$store.sheetOpen = false;
        }
    }
}
</script>