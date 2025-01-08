<template>
    <Badge :variant="variant">
        <slot />
    </Badge>
</template>
<script>
export default {
    name: 'StatusBadge',
    props: {
        variant: {
            type: String,
            required: true
        }
    },
    computed: {
        variant() {
            return this.variant.split('-').join('')
        }
    }
}
</script>
