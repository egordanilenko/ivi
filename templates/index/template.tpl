<script type="text/template" id="dayReportShort_template">
{{#each records}}
  	<tr>
		<td>{{date_system}}</td>
		<td>{{count_sms}}</td>
		<td>{{count_sait}}</td>
		<td>{{count_total}}</td>
		<td>{{count_unick_sms}}</td>
		<td>{{count_unick_sait}}</td>
		<td>{{count_unick_total}}</td>
		<td>{{count_1_sms}}</td>
		<td>{{count_1_sait}}</td>
		<td>{{count_bolee_1_sms}}</td>
		<td>{{count_bolee_1_sait}}</td>
	</tr>
{{/each}}
</script>

<script type="text/template" id="dayReportDetail_template">
{{#each records}}
  	<tr>
		<td>{{date_system}}</td>
		<td>{{count_sms}}</td>
		<td>{{count_sait}}</td>
		<td>{{count_total}}</td>
		<td>{{count_unick_sms}}</td>
		<td>{{count_unick_sait}}</td>
		<td>{{count_unick_total}}</td>
		<td>{{count_sms}}</td>
		<td>{{count_sait}}</td>
		<td>{{count_1_sms}}</td>
		<td>{{count_1_sait}}</td>
		<td>{{count_bolee_1_sms}}</td>
		<td>{{count_bolee_1_sait}}</td>
		<?php for ($i=0; $i < 24; $i++) {
			print '<td>{{count_ssh'.$i.'_sms}}</td>';
		} ?>
		<?php for ($i=0; $i < 24; $i++) {
			print '<td>{{count_sah'.$i.'_sms}}</td>';
		} ?>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td>{{count_max_1_sms}}</td>
		<td>{{count_max_1_sait}}</td>
		<td>{{count_max_1}}</td>
		<td>{{count_tel_mega}}</td>
		<td>{{count_tel_beeline}}</td>
		<td>{{count_tel_fonex}}</td>
		<td>{{count_tel_o}}</td>
		<td>{{count_tel_katel}}</td>
		<td>{{count_tel_nexi}}</td>
		<td>{{count_status_1}}</td>
		<td>{{count_status_0}}</td>
		<td>{{count_status_2}}</td>
		<td>{{count_status_0}}</td>
		<td>{{count_code_mega}}</td>
		<td>{{count_code_beeline}}</td>
		<td>{{count_code_fonex}}</td>
		<td>{{count_code_o}}</td>
		<td>{{count_code_katel}}</td>
		<td>{{count_code_nexi}}</td>
		<td></td>
		<td></td>
		<td></td>
		<?php for ($i=0; $i < 24; $i++) {
			print '<td>{{count_sait'.$i.'_v}}</td>';
		} ?>
		<?php for ($i=0; $i < 24; $i++) {
			print '<td>{{count_sait'.$i.'_p}}</td>';
		} ?>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
	</tr>
{{/each}}
</script>

<script type="text/template" id="monthReportShort_template">
{{#each records}}
  	<tr>
		<td>{{date_system}}</td>
		<td>{{count_sms}}</td>
		<td>{{count_sait}}</td>
		<td>{{count_total}}</td>
		<td>{{count_unick_sms}}</td>
		<td>{{count_unick_sait}}</td>
		<td>{{count_unick_total}}</td>
		<td>{{count_1_sms}}</td>
		<td>{{count_1_sait}}</td>
		<td>{{count_bolee_1_sms}}</td>
		<td>{{count_bolee_1_sait}}</td>
	</tr>
{{/each}}
</script>

<script type="text/template" id="monthReportDetail_template">
{{#each records}}
  	<tr>
		<td>{{date_system}}</td>
		<td>{{count_sms}}</td>
		<td>{{count_sait}}</td>
		<td>{{count_total}}</td>
		<td>{{count_unick_sms}}</td>
		<td>{{count_unick_sait}}</td>
		<td>{{count_unick_total}}</td>
		<td>{{count_sms}}</td>
		<td>{{count_sait}}</td>
		<td>{{count_1_sms}}</td>
		<td>{{count_1_sait}}</td>
		<td>{{count_bolee_1_sms}}</td>
		<td>{{count_bolee_1_sait}}</td>
		<?php for ($i=0; $i < 24; $i++) {
			print '<td>{{count_ssh'.$i.'_sms}}</td>';
		} ?>
		<?php for ($i=0; $i < 24; $i++) {
			print '<td>{{count_sah'.$i.'_sms}}</td>';
		} ?>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td>{{count_max_1_sms}}</td>
		<td>{{count_max_1_sait}}</td>
		<td>{{count_max_1}}</td>
		<td>{{count_tel_mega}}</td>
		<td>{{count_tel_beeline}}</td>
		<td>{{count_tel_fonex}}</td>
		<td>{{count_tel_o}}</td>
		<td>{{count_tel_katel}}</td>
		<td>{{count_tel_nexi}}</td>
		<td>{{count_status_1}}</td>
		<td>{{count_status_0}}</td>
		<td>{{count_status_2}}</td>
		<td>{{count_status_0}}</td>
		<td>{{count_code_mega}}</td>
		<td>{{count_code_beeline}}</td>
		<td>{{count_code_fonex}}</td>
		<td>{{count_code_o}}</td>
		<td>{{count_code_katel}}</td>
		<td>{{count_code_nexi}}</td>
		<td></td>
		<td></td>
		<td></td>
		<?php for ($i=0; $i < 24; $i++) {
			print '<td>{{count_sait'.$i.'_v}}</td>';
		} ?>
		<?php for ($i=0; $i < 24; $i++) {
			print '<td>{{count_sait'.$i.'_p}}</td>';
		} ?>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
	</tr>
{{/each}}
</script>

<script type="text/template" id="smsReport_template">
{{#if sms}}
{{else}}
<tr><td colspan="5">Нет записей на выбранную дату</td></tr>
{{/if}}
{{#each sms}}
  	<tr>
		<td>{{telephone}}</td>
		<td>{{sms_text}}</td>
		<td>{{date_system}}</td>
		<td>{{statusSms status}}</td>
		<td>{{typeSms typeid}}</td>

	</tr>
{{/each}}
</script>

<script>
	Handlebars.registerHelper("statusSms", function(status) {
		switch(status){
			case 0: return "неверный";
			case 1: return "верный";
			case 2: return "повторный";
		}
	});
	Handlebars.registerHelper("typeSms", function(typeid) {
		if(typeid)return "сайт";
		return "sms"
	});
</script>

<script type="text/template" id="prizeReport_template">
{{#each prizes}}
<tr">
	<td>{{priz_name}}</td>
	<td>{{ostatok}}</td>
</tr>
{{/each}}
</script>

<script type="text/template" id="leadersReport_template">
{{#if leaders}}
{{else}}
<tr><td colspan="10">Нет записей на выбранную дату</td></tr>
{{/if}}
{{#each leaders}}
<tr>
	<td rowspan="2">{{codeid}}</td>
	<td rowspan="2">{{date_system}}</td>
	<td rowspan="2"></td>
	<td rowspan="2"></td>
	<td rowspan="2"></td>
	<td rowspan="2">{{telephone}}</td>
	<td rowspan="2"></td>
	<td align="center">{{amount}}</td>
</tr>
<tr>
	<td>
		<select name="" id="" class="form-control" required="required">
			<option value="">Код(ы)</option>
			{{#each sms_text}}
			<option value="">{{sms_text}}</option>
			{{/each}}
		</select>
	</td>
</tr>

{{/each}}
</script>

<script type="text/template" id="winnersReport_template">
{{#if winners}}
{{else}}
<tr><td colspan="13">Нет записей на выбранную дату</td></tr>
{{/if}}
{{#each winners}}
  	<tr>
		<td>{{date_system}}</td>
		<td>{{telephone0}}</td>
		<td>{{telephone1}}</td>
		<td>{{telephone2}}</td>
		<td>{{telephone3}}</td>
		<td>{{telephone4}}</td>
		<td>{{telephone5}}</td>
		<td>{{telephone6}}</td>
		<td>{{telephone7}}</td>
		<td>{{telephone8}}</td>
		<td>{{telephone9}}</td>
		<td></td>
		<td></td>
	</tr>
{{/each}}
</script>