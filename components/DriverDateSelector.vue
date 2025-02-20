<template>
    <div>
        <div class="flex justify-between">
            <p class="font-semibold ml-2">{{ dateString }}</p>
            <Button variant="secondary" @click="logout">Sign out</Button>
        </div>
        <div class="flex overflow-scroll date-container my-2">
            <div v-for="date in dates" :key="date">
                <DriverDateCard v-bind:date="date" @changeDate="setDate"/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            today : new Date(),
            dates : [],
            dateString: ""
        }
    },
    props:{
        selectedDate: {
            type: Date,
            required: true,
        }
    },
    methods: {
        setLoadedDates(){
            //console.log(this.selectedDate)
            this.dates = []
            for (let i = -2; i <= 2; i++) {
                const date = new Date();
                date.setDate(this.selectedDate.getDate() + i);
                this.dates.push(date); // Format: YYYY-MM-DD
            }
            //console.log(this.dates)

        },
        setDate(date){
            this.dateString = date.toLocaleDateString().split("T")[0]
            this.setLoadedDates()
        },
        logout(){
            const cookie = useCookie('jwt');
            cookie.value = null;
            navigateTo('/login')
        }
    },
    mounted(){
        //console.log(this.selectedDate)
        //this.setDate(this.selectedDate)
        //this.setLoadedDates()
    },
    watch:{
        selectedDate(newVal,oldVal){
            //console.log("new2",newVal)
            this.setDate(newVal)
        }
    },
    inject: ["setSelectedDate"]
}
</script>
<style>
.static{
    position: static;
}
.date-container{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    gap: 10px; /* Space between cards */
}
</style>