<template>
    <Dialog :open="isOpen" @update:open="updateOpen">
        <DialogContent>
            <slot />
        </DialogContent>
    </Dialog>
</template>
<script>
export default {
    name: 'Dialogue',
    computed: {
        isOpen() {
            return this.$store.dialogOpen === true;
        }
    },
    methods: {
        updateOpen(open) {
            this.$store.dialogOpen = false;
            // clear selected popup content
            this.$store.dialogContent = null;
        }
    }
}
</script>