# light-vue-timepicker

<!-- ![alt text](https://julien-kennel.fr/images/git/table.PNG) -->

Simple timepicker for VUE.JS made with Bootstrap

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#example-usage)
- [Configuration](#configuration)

## Dependencies
* Vue.js. Required.
* Bootstrap (CSS). Required.
* Fontawesome. Optional. (https://fontawesome.com/)

## Installing

Install with npm:
```bash
npm i light-vue-timepicker
```

Import globally in app.js:

```javascript
import LightVueTimepicker from 'light-vue-timepicker';
Vue.component('light-vue-timepicker', LightVueTimepicker);



```

## Usage
```html
<light-vue-timepicker
v-model="time"
:hourRange="['8-12', '14-19']"
:classe="form-control col-5"
>
</light-vue-timepicker>
```

## Configuration


```html
comming soon
```
## Props

| Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type | Description | Default
| ----------------- | :--- | :--- | :--- |
| `hourRange`      | `Array` | Range of hour which displayed (ex ['8-12', '14-19', '22']) | ['00-23'] |
| `minuteRange`      | `Array` | Range of minute which displayed (ex ['0-30']) | ['00-59'] |
| `classe`      | `String` | class(boostrap or other) for input hour and minute | form-control col-5 |