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
      <RangeCalendar v-model="range" :number-of-months="months" @update:start-value="(startDate) => range.start = startDate" @update:end-value="(endDate) => range.end = endDate" />
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
            console.log(this.value)
            return {
                start: this.range.start,
                end: this.range.end
            }
        }
    },
    watch: {
        async range(newValue) {
            newValue = {
                start: newValue.start,
                end: newValue.end
            }
            console.log(newValue)
            this.$emit('update', newValue)
        }
    }
}
</script>
