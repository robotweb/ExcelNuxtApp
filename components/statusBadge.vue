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
    }
}
</script>
