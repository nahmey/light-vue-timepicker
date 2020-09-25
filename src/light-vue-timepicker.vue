<template>
	<div class="input-group">
		<select :class="cl" @change="updateHour()" :value="initialValue" v-model="hour">
			<option selected="selected" value="0">Heures</option>
			<option v-for="hour in hours_array" :value="hour">
				{{hour}}
			</option>
		</select>
		<select :class="cl" @change="updateHour()" :value="initialValue" v-model="minute">
			<option selected="selected" value="0">Min</option>
			<option v-for="minute in minutes_array" :value="minute">
				{{minute}}
			</option>
		</select>
		<div class="col-2 input-group-append" style="margin-left:-15px!important;">
	        <span class="btn btn-primary"><i class="fas fa-clock"></i></span>
	    </div>
	</div>
</template>

<script>
	export default {
		name: 'LightVueTimepicker',
		props :{
			withoutHour: false,
			withoutMinute: false,
			hourRange: Array,
			minuteRange: Array,
			classe: String,
			value: {
				hour: '',
				minute: '',
			}
		},
		data: function(){
			return{
				hours_array: [],
				minutes_array: [],
				hour: '0',
				minute: '0',
				hour_range: this.hourRange ? this.hourRange : ['00-23'],
				minute_range: this.minuteRange ? this.minuteRange : ['00-59'],
				cl: this.classe ? this.classe : 'form-control col-5',
			}
		},
		mounted(){
			
		},
		computed: {
			initialValue(){
				this.hour = this.value.hour != "" ? this.value.hour : '0';
				this.minute = this.value.minute != "" ? this.value.minute : '0';
			},
		},
		created(){
			this.generateHourMinute(this.hour_range, this.hours_array);
			this.generateHourMinute(this.minute_range, this.minutes_array);
		},
		methods: {
			generateHourMinute: function(prop, array){
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
					hour: self.hour != '0' ? self.hour : '',
					minute: self.minute != '0' ? self.minute : '',
				});
			}
		}
	}
</script>