<template>
  <div>
      <ChartLineBase :chart-data="chartData" />
  </div>
</template>

<script>
export default {
    data() {
        return {
            chartData: null,
            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        }
    },
    props: {
        datasets: {
            type: Array,
            default: [],
        },
    },
    mounted() {
        this.fillData();
    },
    methods: {
        fillData() {
            this.chartData = {
                labels: this.labels,
                datasets: this.datasets,
            };
        },
        updateChart() {
            this.$nextTick(() => {
                this.fillData();
            });
        }
    }
};
</script>