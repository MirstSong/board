<template>
	<div id="main2" style="width: 100%;height:100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
	export default{
		data(){
			return{
				
			}
		},
		
		computed:{
			
		},
		mounted(){
			this.myechart()
		},
		methods:{
			myechart(){
				let myChart = echarts.init(document.getElementById('main2'))
				
				var option = {
					    title: {
					        text: '某站点用户访问来源',
					        left: 'center',
							textStyle: {
							     fontSize: 17,
								 color:'#f5f5f5'
							   },
					    },
					    tooltip: {
					        trigger: 'item'
					    },
					    legend: {
					        orient: 'vertical',
					        left: 'left',
							textStyle: {
								color:'#f5f5f5'
							   },
					    },
					    series: [
					        {
					            name: '访问来源',
					            type: 'pie',
					            radius: '50%',
					            data: [
					                {value: 1048, name: '搜索引擎',itemStyle:{color:'#dd6b66'}},
					                {value: 735, name: '直接访问',itemStyle:{color:'#759aa0'}},
					                {value: 580, name: '邮件营销',itemStyle:{color:'#e69d87'}},
					                {value: 484, name: '联盟广告',itemStyle:{color:'#8dc1a9'}},
					                {value: 300, name: '视频广告',itemStyle:{color:'#ea7e53'}}
					            ],
					            emphasis: {
					                itemStyle: {
					                    shadowBlur: 10,
					                    shadowOffsetX: 0,
					                }
					            }
					        }
					    ]
				};
				option && myChart.setOption(option);
				myChart.setOption(option),
				          window.addEventListener("resize", function() {
				            myChart.resize();
				          });
		}
	},
}	
</script>

<style>
</style>
