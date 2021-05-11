Nova.booting((Vue, router, store) => {
  Vue.component('index-nova-color-picker', require('./components/IndexField'))
  Vue.component('detail-nova-color-picker', require('./components/DetailField'))
  Vue.component('form-nova-color-picker', require('./components/FormField'))
})
