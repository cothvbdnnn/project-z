<template>
    <div>
      <ChartDoughnutBase :chart-data="chartData" />
    </div>
</template>

<script>
export default {
    data() {
        return {
        chartData: null
        };
    },
    props: {
        labels: {
            type: Array,
            default: [],
        },
        data: {
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
                datasets: [
                    {
                        backgroundColor: ["#ccc", "#d3b161", "#2a2a2a", "#3c5e2c"],
                        data: this.data,
                    }
                ]
            };
        }
    }
};
</script>