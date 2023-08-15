<template>
  <canvas id="solar"></canvas>
</template>

<script setup>
import { onMounted } from 'vue'
import ChartService from '../services/ChartService'
import { Chart } from 'chart.js/auto'

onMounted(() => {
  ChartService.getSolarChart()
    .then((data) => {
      drawChart(data)
    })
    .catch((error) => {
      console.log('error: ', error)
    })
})

const drawChart = (data) => {
  new Chart(document.getElementById('solar'), {
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
          text: 'Hourly Solar Power (Kw) Time series Line plot for Last 24 hrs',
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
