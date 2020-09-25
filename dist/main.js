import lightVueTimepicker from '../src/light-vue-timepicker.vue';

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("light-vue-timepicker", lightVueTimepicker);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

lightVueTimepicker.install = install;

export default lightVueTimepicker;