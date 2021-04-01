<template>
  <div class="connter">
	  
	  <div class="connter_top">
		  <div class="new_time">
		  		 <img src="../assets/img/logo.png" alt="" width="85%" height="40%">
				 <h3>生产实时看板</h3>
				 <h5>{{current_time}}</h5>
				 <h5>{{current_day}}</h5>
		  </div>
		  <div class="look_work">
			  <div class="let_top">
			    <span>工单</span>
			    <span>机型</span>
			    <span>计划</span>
			    <span>产出</span>
			    <span>完工率</span>
			  </div>
			 <div class="item_wrap">
			    <div class="item" ref="itemRef">
			      <div class="one">
			        <List
			          v-for="(item, index) in listData"
			          :key="index"
			          :class="
			            LiIndex == index ||
			            (LiIndex == listData.length && index == 0)
			              ? 'active'
			              : ''
			          "
			          :item="item"
			        ></List>
			      </div>
			      <div class="two">
			        <List
			          v-for="(item, index) in listData"
			          :class="
			            LiIndex == index ||
			            (LiIndex == listData.length && index == 0)
			              ? 'active'
			              : ''
			          "
			          :key="index"
			          :item="item"
			        ></List>
			      </div>
			    </div>
			  </div>
		  </div>
	  </div>
	  
	  
	  <div class="connter_bottom">
		  <div class="ech_left" style="padding: 10px;"><ZZT :seriesData="seriesData"></ZZT></div>
		  <div class="ech_min" style="padding: 10px;"><shanxing :seriesData="seriesData"></shanxing></div>
		  <div class="ech_rig">
			  <div class="ech_rig_top">
				  <div>工单</div>
				  <div>机型</div>
			  </div>
			  <div class="ech_rig_bottom">
			  		<ul>
						<li v-for="(item,index) in listData" :key="index">
							<span style="width:40%;">{{item.work_order}}</span>
							<span style="width:60%;">{{item.jixing}}</span>
						</li>
					</ul>
			  </div>
		  </div>
	  </div>
	  
	  
  </div>
</template>

<script>
import $ from "jquery";
import List from "../components/List";
import ZZT from "../components/Echer/zhuzhuangtu.vue";
import shanxing from "../components/Echer/shanxing.vue";
export default {
	components:{
		List,
		ZZT,
		shanxing
	},
	  data(){
		  return{
			  current_time:"",
			  current_day:'',
			  listData:[],
			  animate: false,
			  option: {
			    time: 1500, //每次动画时间
			    suspend: 700, //暂停时长
			    height: 50, //每个元素的高
			  },
			  currentIndex: 0,
			  LiIndex: 0,
			  top: 0,
			  hide:true,
			  seriesData:[],
			  swith_time:0
		  }
	  },
	  created() {
	  },
	  mounted() {
	  	this.currentTime();
		this.get_list()
		this.move()
	  },
	  methods:{
		  //获取当前时间
		  formatDate() {
		    let date = new Date();
		    let year = date.getFullYear(); // 年
		    let month = date.getMonth() + 1; // 月
		    let day = date.getDate(); // 日
		    let week = date.getDay(); // 星期
		    let weekArr = [
		      "星期日",
		      "星期一",
		      "星期二",
		      "星期三",
		      "星期四",
		      "星期五",
		      "星期六",
		    ];
		    let hour = date.getHours(); // 时
		    hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
		    let minute = date.getMinutes(); // 分
		    minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
		    let second = date.getSeconds(); // 秒
		    second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
		    this.current_time = `${year}年${month}月${day}日 `;
			this.current_day=`${weekArr[week]}${hour}:${minute}:${second} `
		  },
		  //每段时间调用
		  currentTime() {
		    setInterval((e) => {
		      this.formatDate();
		    }, 500);
		  },
		  
		  //获取数据
		  get_list(){
			  this.$http.get('/workorder.json')
			  .then(res=>{
				 if (res.data.code == 1) {
				   console.log(res.data);
				   this.listData = res.data.list;
				   console.log(this.listData);
				   
				 }
			  })
	      },
		  
		  async move() {
		  	
		    await $(".item").animate(
		      { top: this.LiIndex * -this.option.height + "px" },
		      this.option.time,
		      () => {
		  		
		  		 this.LiIndex++;
		  		 
		  		//获取当前数据
		  		this.get_LISTdate()
		  	  //每次调用更改属性
		  	  	// this.show()
		        if (this.LiIndex == this.listData.length+1) {
		            console.log(this.listData)
		  		 this.LiIndex = 0;  //从1开始流畅   没有卡顿   但是会导致索引为0的获取不到
		  		 
		          console.log("结束,换位置");
		          $(".item").css("top", "0");
		  		//位置到达顶部再次重复获取
		  		this.get_LISTdate()
		        } 
		          setTimeout(() => {
		            this.move();
		          }, this.option.suspend);
		      }
		    );
		  },
		 get_LISTdate(){
		 		this.listData.forEach((item,index)=>{
		 			  if(this.LiIndex==index){
		 				  this.seriesData=item.Yaxle
						  console.log(this.seriesData)
		 			  }
		 		  })
		 	} 
		  
		  
	 }
}
</script>

<style lang="scss">
	.active{
		color: yellow;
		
	}
	.connter{
		background-color:#131b3f ;
		padding: 10px;
		width: 100%;
		height: 100vh;
		.connter_top{
			 display: flex;
			 width: 100%;
			 height: 35%;
			.new_time{
				text-align: center;
				width: 25%;
				border: 1px solid #f5f5f5;
				padding: 10px;
				&>h3{
					color: #4caf50;
					font-size:2rem;
					padding:1.5rem 0 1.5rem 0 ;
					letter-spacing:0.5rem;
				}
				&>h5{
					color: #f5f5f5;
					font-size:1.5rem;
				}
			}
			.look_work{
				margin-left: 0.5%;
				width: 74.5%;
				border: 1px solid #f5f5f5;
				color:#5fb878;
			}
			.let_top{
				display: flex;
				height: 50px;
				justify-content: space-around;
				border-bottom: 1px solid #f5f5f5;
				align-items: center;
				&>span{
					width: 20%;
					text-align: center;
					font-size:1.3rem ;
					font-weight: bold;
				}
			}
			.item_wrap {
			  position: relative;
			  height: calc(100% - 50px);
			  overflow: hidden;
			  .item {
			    position: absolute;
			    // top: -20px;
			    width: 100%;
			  }
			}
			
		}
		.one{
			&>li{
				border: 1px solid #f5f5f5;
				height: 50px;
				font-size:1.3rem;
			}
		}
	
	
	
	//下部分
	    .connter_bottom{
			width: 100%;
			display: flex;
			justify-content: space-between;
			height: 64%;
			&>div{
				width: 33%;
				height:100%;
				overflow: hidden;
				justify-content: space-between;
				margin-top: 10px;
				border: 1px solid #f5f5f5;
			}
		}
	
	
	    .ech_rig_top  {
			display:flex;
			justify-content: space-around;
			font-size: 1.6rem;
			color: #5fb978;
			font-weight: bold;
			border: 1px solid #f5f5f5;
			border-left: none;
			&>div{
				height: 50px;
				line-height: 50px;
			}
		}
		 .ech_rig_bottom>ul{
			font-size: 1.6rem;
			color: #5fb978;
			font-weight: bold;
			&>li{
				align-items: center;
				display: flex;
				justify-content: space-around;
				height: 50px;
				border: 1px solid #f5f5f5;
				border-left: none;
				&>span{
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
				}
			}
		 }
	}
	
	
</style>
