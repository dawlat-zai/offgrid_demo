<template>
<canvas id="battery"></canvas>
</template>

<script setup>
import { onMounted } from 'vue'
import ChartService from '../services/ChartService'
import { Chart } from 'chart.js/auto'

onMounted(() => {
  ChartService.getBatteryChart()
    .then((data) => {
      drawChart(data)
    })
    .catch((error) => {
      console.log('error: ', error)
    })
})

const drawChart = (data) => {
  new Chart(document.getElementById('battery'), {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Power',
          data: data
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Hourly Battery Voltage (V) Time series Line plot for last 24 hrs',
          font: {
            size: 14
          }
        },
        legend: {
          display: false
        }
      },
      backgroundColor: 'rgba(16,44,139, 0.3)',
      mantainAspectRatio: false,
      responsive: true,
      spanGaps: true
    }
  })
}
</script>

