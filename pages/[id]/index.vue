<template>
    <div>
        <h1>Company {{ $route.params.id }}</h1>
    </div>
</template>
<script>
definePageMeta({
    layout: 'loggedin'
})
export default {
    name: 'CompanyPage'
}
</script>