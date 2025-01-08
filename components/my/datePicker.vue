<template>
    <Popover>
    <PopoverTrigger class="w-full">
      <Button variant="outline" class="w-full">
        <Icon name="lucide:calendar" class="mr-2" />
        <template v-if="range.start">
          <template v-if="range.end">
            {{ range.start }} - {{ range.end }}
          </template>
          <template v-else>
            {{ range.start }}
          </template>
        </template>
        <template v-else>
        Pick a date
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar v-model="range" :number-of-months="months" @update:start-value="(startDate) => range.start = startDate" @update:end-value="(endDate) => range.end = endDate"/>
    </PopoverContent>
  </Popover>
</template>
<script>
export default {
    name: 'MyDatePicker',
    props: {
        months: {
            type: Number,
            required: false,
            default: 1
        },
        value: {
            type: Object,
            required: false,
            default: null
        }
    },
    data() {
        return {
            range: {
                start: null,
                end: null
            }
        }
    },
    computed: {
        value() {
          console.log('computed value', this.value)
        }
    },
    mounted() {
        console.log('mounted value', this.value)
        if (this.value) {
            this.range.start = this.value.start
            this.range.end = this.value.end
        }
    },
    watch: {
        async range(newValue) {
            newValue = {
                start: newValue.start,
                end: newValue.end
            }
            console.log('watch emit update', newValue)
            this.$emit('update', newValue)
        },
        value(newValue) {
            if(newValue == null) {
                this.range = { start: null, end: null }
            }
            console.log('watch props value', newValue)
        }
    }
}
</script>
