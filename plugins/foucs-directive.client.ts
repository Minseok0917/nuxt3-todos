export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("focus", {
    mounted($element, binding) {
      if (binding.value) {
        $element.focus();
      }
    },
  });
});
