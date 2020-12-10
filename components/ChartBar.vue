<template>
    <div>
        <ChartBarBase :chart-data="chartData" />
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
                labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                datasets: this.datasets,
            };
        }
    }
};
</script>