<template>
	<div class="input-group">
		<template v-if="withH">
			<select :class="cl" @change="updateHour()" :value="initialValue" v-model="hour">
				<option selected="selected" value="0">{{display_lang['hour']}}</option>
				<option v-for="hour in hours_array" :value="hour">
					{{hour}}
				</option>
			</select>
		</template>
		<template v-if="withM">
			<select :class="cl" @change="updateHour()" :value="initialValue" v-model="minute">
				<option selected="selected" value="0">{{display_lang['min']}}</option>
				<option v-for="minute in minutes_array" :value="minute">
					{{minute}}
				</option>
			</select>
		</template>
		<template v-if="withS">
			<select :class="cl" @change="updateHour()" :value="initialValue" v-model="second">
				<option selected="selected" value="0">{{display_lang['sec']}}</option>
				<option v-for="second in seconds_array" :value="second">
					{{second}}
				</option>
			</select>
		</template>
		<template v-if="format == '12'">
			<select :class="cl" @change="updateHour()" :value="initialValue" v-model="a">
				<option selected="selected" value="0">{{display_lang['a']}}</option>
				<option value="am">AM</option>
				<option value="pm">PM</option>
			</select>
		</template>
		<div class="col-2 input-group-append" style="margin-left:-15px!important;">
	        <span class="btn btn-primary"><i class="fas fa-clock"></i></span>
	    </div>
	</div>
</template>

<script>
	export default {
		name: 'LightVueTimepicker',
		props :{
			withHour: Boolean,
			withMinute: Boolean,
			withSecond: Boolean,
			hourRange: Array,
			minuteRange: Array,
			secondRange: Array,
			classe: String,
			format: String,
			lang: String,
			value: {
				hour: '0',
				minute: '0',
				second : '0',
				a: '0',
			}
		},
		data: function(){
			return{
				withH: this.withHour ? this.withHour : true,
				withM: this.withMinute ? this.withMinute : true,
				withS: this.withSecond ? this.withSecond : false,
				hours_array: [],
				minutes_array: [],
				seconds_array: [],
				hour: '0',
				minute: '0',
				second : '0',
				a: '0',
				hour_range: this.hourRange ? this.hourRange : ['00-23'],
				minute_range: this.minuteRange ? this.minuteRange : ['00-59'],
				second_range: this.secondRange ? this.secondRange : ['00-59'],
				cl: this.classe ? this.classe : 'form-control col-5',
				la: this.lang ? this.lang : '',
				display_lang: {
					'hour' : 'HH',
					'min' : 'MM',
					'sec' : 'SS',
					'a' : '--',
				},
			}
		},
		mounted(){
			
		},
		computed: {
			initialValue(){
				this.hour = this.value && this.value.hour != "" ? this.value.hour : '0';
				this.minute = this.value && this.value.minute != "" ? this.value.minute : '0';
				this.second = this.value && this.value.second != "" ? this.value.second : '0';
				this.a = this.value && this.value.a != "" ? this.value.a : '0';
			},
		},
		created(){
			if(this.format == '12' && !this.hourRange){
				this.hour_range = ['01-12'];
			}
			this.generateHourMinuteSecond(this.hour_range, this.hours_array);
			this.generateHourMinuteSecond(this.minute_range, this.minutes_array);
			this.generateHourMinuteSecond(this.second_range, this.seconds_array);
			this.generateLang(this.la);
		},
		methods: {
			generateLang: function(lang){
				if(this.lang == 'fr'){
					this.display_lang['hour'] = 'Heures';
					this.display_lang['min'] = 'Min';
					this.display_lang['sec'] = 'Sec';
					this.display_lang['a'] = '--';
				}
				if(this.lang == 'en'){
					this.display_lang['hour'] = 'Hour';
					this.display_lang['min'] = 'Min';
					this.display_lang['sec'] = 'Sec';
					this.display_lang['a'] = '--';
				}
			},
			generateHourMinuteSecond: function(prop, array){
				let self = this;
		        let debut = '';
		        let fin = '';

		        prop.forEach(function(item){
		            let debut = '';
		            let fin = '';
		            if(typeof item == "string"){
		                if(item.split('-')[0] != undefined){
		                    debut = String(item.split('-')[0])
		                }

		                if(item.split('-')[1] != undefined){
		                    fin = String(item.split('-')[1])
		                }else fin = String(item.split('-')[0]);

		                debut = parseInt(debut);
		                fin = parseInt(fin);

		                for (let h = debut; h <= fin; h++) {
		                    if(h >= 0 && h <= 9)
				                array.push('0' + String(h));
				            else
				                array.push(String(h));
		                }
		            }
		        })

		        array.sort(function(a, b) {
		            return a - b;
		        });

		        array = array.filter(function(item, pos) {
		            return array.indexOf(item) == pos;
		        })
			},
			updateHour:function(){
				let self = this
				this.$emit('input', {
					hour: self.hour != '0' ? self.hour : '0',
					minute: self.minute != '0' ? self.minute : '0',
					second: self.second != '0' ? self.second : '0',
					a: self.a != '0' ? self.a : '0',
				});
			}
		}
	}
</script>