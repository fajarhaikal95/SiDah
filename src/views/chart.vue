<!DOCTYPE html>
<html>
  <head>
    <style>
      #app {
        height: 400px;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <v-chart autoresize :option="option" />
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.5"></script>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.3.3"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-echarts@6.2.3"></script>
    <script>
      Vue.component('v-chart', VueECharts);

      new Vue({
        el: '#app',
        data() {
          return {
            option: {
              textStyle: {
                fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
              },
              title: {
                text: 'Traffic Sources',
                left: 'center',
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: [
                  'Direct',
                  'Email',
                  'Ad Networks',
                  'Video Ads',
                  'Search Engines',
                ],
              },
              series: [
                {
                  name: 'Traffic Sources',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: [
                    { value: 335, name: 'Direct' },
                    { value: 310, name: 'Email' },
                    { value: 234, name: 'Ad Networks' },
                    { value: 135, name: 'Video Ads' },
                    { value: 1548, name: 'Search Engines' },
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                  },
                },
              ],
            },
          };
        },
      });
    </script>
  </body>
</html>
