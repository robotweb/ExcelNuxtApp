import { useToast } from '@/components/ui/toast/use-toast'

export default defineNuxtPlugin((nuxtApp) => {
    const { toast } = useToast()
    return {
        provide: {
            toast: toast
        }
    }
})