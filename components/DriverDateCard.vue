<template>
    <Card class="date-card flex flex-col align-center justify-center items-center p-2" @click="handleClick(date)" :class="{'active': isActive()}">
        <div class="text-center text-sm">{{ day }}</div>
        <div class="flex flex-col justify-center items-center text-xl font-medium rounded-full w-8 h-8" :class="{'today' : isToday()}">{{ dayDate }}</div>
        <div class="text-center text-sm">{{ month }}</div>
    </Card>
</template>
<script>
export default{
    props: {
        date: {
            type: Date, // Or Date if it's a Date object
            required: true,
        }
    },
    data(){
            return {
                dayDate: 0,
                day: 0,
                month: 0,
                year: 0,
                monthNames: [
                    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Decs"
                ],
                dayNames: [
                    "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
                ],
            }
        },
    mounted(){
        console.log('card date',this.date)
        this.dayDate = this.date.getDate()
        this.day = this.dayNames[this.date.getDay()]
        this.month = this.monthNames[this.date.getMonth()]
        this.year = this.date.getFullYear()
    },
    methods:{
        handleClick(date){
            console.log(date)
            this.setSelectedDate(date)

        },
        isActive(){
            //console.log(this.getSelectedDate().toLocaleDateString())
            if(this.date.toLocaleDateString() == this.getSelectedDate().toLocaleDateString()){
                //console.log("isactive")
                return true;
            };
            return false;
        },
        isToday(){
            const today = new Date();
            if(today.toLocaleDateString() == this.date.toLocaleDateString()){
                //console.log("istoday");
                return true;
            }
            return false;
        }
    },
    inject: ["setSelectedDate","getSelectedDate"],
}
</script>
<style>
.date-card{
    overflow: hidden;
}
.active{
    border: 2px solid green;
}
.today{
    background: #dacdf0;
}
</style>