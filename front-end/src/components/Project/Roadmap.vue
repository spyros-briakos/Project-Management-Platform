<template>
  <div>
    <!-- <router-link to="/projects/roadmap"></router-link> -->
    <div id="app"><chart></chart></div> 
    <highcharts :constructorType="'ganttChart'" class="hc" :options="chartOptions" ref="chart"></highcharts>
    <router-view></router-view> 
  </div>
</template>


<script>
import Roadmap from "../Project/Roadmap.vue";

export default {
  name: "app",
  components: {
    chart: Roadmap
  },
  data() {
    return {
      chartOptions: {
        title: {
          text: "Gantt Chart with Progress Indicators"
        },
        xAxis: {
          min: Date.UTC(2021, 10, 17),
          max: Date.UTC(2021, 10, 30)
        },

        series: [
          {
            name: "Project 1",
            data: [
              {
                name: "Start prototype",
                start: Date.UTC(2021, 10, 18),
                end: Date.UTC(2021, 10, 25),
                completed: 0.25
              },
              {
                name: "Test prototype",
                start: Date.UTC(2021, 10, 27),
                end: Date.UTC(2021, 10, 29)
              },
              {
                name: "Develop",
                start: Date.UTC(2021, 10, 20),
                end: Date.UTC(2021, 10, 25),
                completed: {
                  amount: 0.12,
                  fill: "#fa0"
                }
              },
              {
                name: "Run acceptance tests",
                start: Date.UTC(2021, 10, 23),
                end: Date.UTC(2021, 10, 26)
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

<style>
.hc {
  padding-left: 50px;
  padding-top: 50px;
}
</style>