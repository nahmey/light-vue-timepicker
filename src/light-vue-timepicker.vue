<template>
  <div class="input-group flex flex-nowrap">
    <template v-if="withH">
      <select :class="cl" @change="updateHour()" v-model="props.modelValue.hour">
        <option :selected="true" value="0">{{ display_lang["hour"] }}</option>
        <option v-for="hour in hours_array" :value="hour">
          {{ hour }}
        </option>
      </select>
    </template>
    <template v-if="withM">
      <select :class="cl" @change="updateHour()" v-model="props.modelValue.minute">
        <option :selected="true" value="0">{{ display_lang["min"] }}</option>
        <option v-for="minute in minutes_array" :value="minute">
          {{ minute }}
        </option>
      </select>
    </template>
    <template v-if="withS">
      <select :class="cl" @change="updateHour()" v-model="props.modelValue.second">
        <option :selected="true" value="0">{{ display_lang["sec"] }}</option>
        <option v-for="second in seconds_array" :value="second">
          {{ second }}
        </option>
      </select>
    </template>
    <template v-if="format == '12'">
      <select :class="cl" @change="updateHour()" v-model="props.modelValue.a">
        <option :selected="true" value="0">{{ display_lang["a"] }}</option>
        <option value="am">AM</option>
        <option value="pm">PM</option>
      </select>
    </template>
    <div class="col-2 input-group-append" style="margin-left: -15px !important">
      <span class="btn btn-primary"><i class="fas fa-clock"></i></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, onMounted, onUpdated, onUnmounted, ref, watch, reactive } from "vue";

//export default {
//name: "LightVueTimepicker",
//  props: {
type TVModel = {
  hour: String;
  minute: String;
  second: String;
  a: String;
};
//defineProps и defineEmits — макросы компилятора используемые только внутри <script setup>. Их не нужно импортировать и они будут компилироваться при обработке <script setup>.

interface Props {
  withHour: Boolean;
  withMinute: Boolean;
  withSecond: Boolean;
  hourRange: Array<String>;
  minuteRange: Array<String>;
  secondRange: Array<String>;
  classe: String;
  format: String;
  lang: string;
  modelValue: TVModel;
}
//const props = withDefaults(defineProps<Props>(), {  value: { hour: "0", minute: "0", second: "0", a: "24" },});
const props = defineProps<Props>();

var withH: any = ref(props.withHour ? props.withHour : true);
var withM: any = ref(props.withMinute ? props.withMinute : true);
var withS: any = ref(props.withSecond ? props.withSecond : false);
var hours_array: Array<String> = [""];
var minutes_array: Array<String> = [""];
var seconds_array: Array<String> = [""];
//var hour: String = ref(props.modelValue.hour);
//var minute: String = ref(props.modelValue.minute);
//var second: String = ref(props.modelValue.second);
//var a: any = ref("0");
var hour_range: Array<String> = !!props.hourRange ? props.hourRange : ["00-23"];
var minute_range: Array<String> = !!props.minuteRange ? props.minuteRange : ["00-59"];
var second_range: Array<String> = !!props.secondRange ? props.secondRange : ["00-59"];
var cl: any = ref(!!props.classe ? props.classe : "form-control col-5");
const la = ref("");
la.value = !!props.lang ? props.lang : "";

//la.value = props.lang ? props.lang : "";
const display_lang = reactive({
  hour: "HH",
  min: "MM",
  sec: "SS",
  a: "--",
});

onMounted(() => {
  //onCreated() {
  if (props.format == "12" && !props.hourRange) {
    hour_range = ["01-12"];
  }
  console.log(props);
  generateHourMinuteSecond(hour_range, hours_array);
  generateHourMinuteSecond(minute_range, minutes_array);
  generateHourMinuteSecond(second_range, seconds_array);
  generateLang(la.value);
});
//onMounted() {    console.log("mntd!!!", this);  },
/*const initialValue = computed({
  get() {
    return {
      hour: props.value && props.value.hour != "" ? props.value.hour : "0",
      minute: props.value && props.value.minute != "" ? props.value.minute : "0",
      second: props.value && props.value.second != "" ? props.value.second : "0",
      a: props.value && props.value.a != "" ? props.value.a : "0",
    };
  },
});*/

function generateLang(lang = props.lang) {
  if (lang == "fr") {
    display_lang["hour"] = "Heures";
    display_lang["min"] = "Min";
    display_lang["sec"] = "Sec";
    display_lang["a"] = "--";
  } else if (lang == "en") {
    display_lang["hour"] = "Hour";
    display_lang["min"] = "Min";
    display_lang["sec"] = "Sec";
    display_lang["a"] = "--";
  }
  //console.log(display_lang);
}
function generateHourMinuteSecond(prop: Array<String>, array: Array<String>) {
  //let self = this;
  let debut = "";
  let debut2 = 0;
  let fin = "";
  let fin2 = 0;
  prop.forEach((item, idx, arr) => {
    let debut = "";
    let fin = "";
    if (typeof item == "string") {
      if (item.split("-")[0] != undefined) {
        debut = String(item.split("-")[0]);
      }
      if (item.split("-")[1] != undefined) {
        fin = String(item.split("-")[1]);
      } else fin = String(item.split("-")[0]);
      debut2 = parseInt(debut);
      fin2 = parseInt(fin);
      for (let h = debut2; h <= fin2; h++) {
        if (h >= 0 && h <= 9) array.push("0" + String(h));
        else array.push(String(h));
      }
    }
  });
  function compareFn(a: String, b: String) {
    return parseInt(a.toString()) - parseInt(b.toString());
  }
  array.sort(compareFn);
  array = array.filter(function (item, pos) {
    return array.indexOf(item) == pos;
  });
}

function updateHour() {
  //let self = this;
  //$emit("input",
  //console.log(hour, minute, second, a);
  /*return {
    hour: !!hour ? hour : "0",
    minute: !!minute ? minute : "0",
    second: !!second ? second : "0",
    a: !!a ? a : "0",
  };*/
  /*});*/
}
//
</script>

<style lang="scss" scoped></style>
