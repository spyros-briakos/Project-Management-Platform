<template>
  <div>
    <div id="app"><chart></chart></div>
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
    <router-view></router-view> 
  </div>
</template>

<script>
import Chart from "../Project/Chart.vue";
import { mapGetters, mapActions } from "vuex"

export default {  
  name: "app",
  components: {
    chart: Chart
  },
  data() {
    return {
      sprintId: "60df2991c514e12171538144"
    };
  },
  created() {
    console.log("DDAAYSS", this.getTotalSprintDates())
    console.log("DDAAYSS", this.getTotalSprintDatesArray())
    
  },
  computed: {
    ...mapGetters({
        getHistory: "getHistory",
        projectName: "projectName",
        getTotalSprintDates: "getTotalSprintDates",
        getTotalSprintDatesArray: "getTotalSprintDatesArray",
        getTotalSprintDatesIdealBurn: "getTotalSprintDatesIdealBurn",
        getTotalSprintTaskDates: "getTotalSprintTaskDates",
        getTotalSprintTaskDatesArray: "getTotalSprintTaskDatesArray",
        getBurnDownIdealChartbySprintId: "getBurnDownIdealChartbySprintId",
        getBurnDownActualChartbySprintId: "getBurnDownActualChartbySprintId"
    }),

    chartOptions: function() {
      return  {
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
        text: this.projectName,
        x: -20
      },
      xAxis: {
        // categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6',
        //   'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12'
        // ]

        categories: this.getTotalSprintTaskDatesArray(this.sprintId),
        title: {
          text: 'Estimated Days'
        },
      },
      yAxis: {
        title: {
          text: 'Days of work'
        },
        plotLines: [{
          value: 0,
          width: 1
        }]
      },
      tooltip: {
        valueSuffix: ' ds',
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
                // data: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0, 10]
                data: this.getBurnDownIdealChartbySprintId(this.sprintId),
                
              }, {
                name: 'Actual Burn',
                color: 'rgba(0,120,200,0.75)',
                marker: {
                  radius: 6
                },
                // data: [100, 110, 125, 95, 64, 76, 62, 44, 35, 29, 18, 2, 10]
                data: this.getBurnDownActualChartbySprintId(this.sprintId)
                
              }]
    }
    }
  },
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