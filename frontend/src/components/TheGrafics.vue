<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';

const props = defineProps({
    subscribers: {
        type: Array,
        default: () => [],
    },
});

Chart.register(...registerables);

let chart: Chart | null = null;
const canvasRef = ref(null);

onMounted(() => {
    const ctx = canvasRef.value.getContext('2d');
    const labels = props.subscribers.map(subscriber => subscriber.date);
    const data = props.subscribers.map(subscriber => subscriber.mrr);
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monthly Recurring Revenue',
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
    });
});
</script>

<template>
    <div>
        <canvas ref="canvasRef"></canvas>
    </div>
</template>