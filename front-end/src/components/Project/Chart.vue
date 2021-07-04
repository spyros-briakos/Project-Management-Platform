<template>
  <div>
    <div id="app"><chart></chart></div>
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
    <router-view></router-view> 
  </div>
</template>

<script>
import Chart from "../Project/Chart.vue";

export default {
  name: "app",
  components: {
    chart: Chart
  },
  data() {
    return {
      chartOptions: {
        // series: [
        //   {
        //     data: [1, 2, 3]
        //   }
        // ]
        credits: {
            enabled: false
        },
        title: {
        text: 'Burndown Chart',
        x: -20 //center
        },
        colors: ['blue', 'red'],
        plotOptions: {
        line: {
            lineWidth: 3
        },
        tooltip: {
            hideDelay: 200
        }
        },
        subtitle: {
        text: 'Sprint 1',
        x: -20
        },
        xAxis: {
        categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6',
                    'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12']
        },
        yAxis: {
        title: {
            text: 'Hours'
        },
        plotLines: [{
            value: 0,
            width: 1
        }]
        },
        tooltip: {
        valueSuffix: ' hrs',
        crosshairs: true,
        shared: true
        },
        legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
        },
        series: [{
        name: 'Ideal Burn',
        color: 'rgba(255,0,0,0.25)',
        lineWidth: 2,
        data: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
        }, {
        name: 'Actual Burn',
        color: 'rgba(0,120,200,0.75)',
        marker: {
            radius: 6
        },
        data: [100, 110, 125, 95, 64, 76, 62, 44, 35, 29, 18, 2]
        }]
      }
    };
  }
};
</script>

<style>
.hc {
  padding-left: 90px;
  padding-top: 50px;
  width: 1690px;
  height: 700px;
}
</style>