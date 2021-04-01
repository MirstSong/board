<template>
  <div id="main" style="width: 100%;height:100%;"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      series_data: [],
      option: {
        title: {
          text: "生产数据",
          textStyle: {
            fontSize: 17,
            color: "#f5f5f5",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#f5f5f5",
            },
          },
        },

        legend: {
          data: ["良品", "不良品", "折线图"],
          textStyle: {
            color: "#f5f5f5",
          },
        },
        xAxis: [
          {
            type: "category",
            color: "#f5f5f5",
            data: [
              "1季度",
              "2季度",
              "3季度",
              "4季度",
              "5季度",
              "6季度",
              "7季度",
              "8季度",
              "9季度",
            ],
            axisPointer: {
              type: "shadow",
            },
            textStyle: {
              color: "#f5f5f5",
            },
            axisLabel: {
              color: "#f5f5f5",
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#676b7a",
                width: 2,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "良品与不良品",
            min: 0,
            max: 100,
            interval: 20,
            nameTextStyle: {
              color: "#f5f5f5",
            },
            axisLabel: {
              color: "#f5f5f5",
            },
          },

          {
            show: false,
          },
        ],
        series: [
          {
            name: "良品",
            type: "bar",
            color: "#dd6b66",
            data: [],
          },
          {
            name: "不良品",
            type: "bar",
            color: "#759aa0",
            data: [],
          },
          {
            name: "折线图",
            type: "line",
            // yAxisIndex: 1,
            color: "#dd6b66",
            data: [],
          },
        ],
      },
    };
  },
  props: {
    seriesData: {
      type: [Array],
    },
  },
  computed: {
    main() {
      return echarts.init(document.getElementById("main"));
    },
  },
  watch: {
    seriesData(a, b) {
      this.echartsInfo();
    },
  },
  methods: {
    echartsInfo() {
      this.option.series[0].data = this.seriesData.map((v) => v.brokenLine)[0];
      this.option.series[1].data = this.seriesData.map((v) => v.goods)[0];
      this.option.series[2].data = this.seriesData.map((v) => v.rejects)[0];
      this.main.setOption(this.option);
    },
  },
  mounted() {
    this.echartsInfo();
  },
  created() {
    // this.get_zhuzhuangtu()
  },
};
</script>

<style></style>
