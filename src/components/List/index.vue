<template>
  <li ref="liRef" class="item_height">
    <span class="title" v-text="item.work_order"></span>
    <span class="date" v-text="item.jixing"></span>
    <span class="date" v-text="item.jihua"></span>
    <span class="date" v-text="item.chanchu"></span>
    <span class="date" >
		<el-progress :text-inside="true" :stroke-width="25" :percentage="item.complete"></el-progress>
	</span>
  </li>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>

<style scoped lang="scss">
	.item_height{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	span{
		width: 24%;
		text-align: center;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.item_height{
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
			flex-wrap: nowrap;
		}
	}
</style>
