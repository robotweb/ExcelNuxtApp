export default defineNuxtPlugin(() => {
  const debounce = (fn: Function, wait: number) => {
    let timeout: NodeJS.Timeout;

    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        fn(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  return {
    provide: {
      debounce
    }
  }
}) 