<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import { Chart, registerables } from 'chart.js';

const props = defineProps({
    metricsByMonth: {
        type: Object,
        required: true
    }
});

Chart.register(...registerables);

let mrrChart: Chart | null = null;
let growthChart: Chart | null = null;
let retentionChart: Chart | null = null;
let attractionChart: Chart | null = null;
let churnRateChart: Chart | null = null;
let monthlyRevenueForecastChart: Chart | null = null;
let annualRevenueForecastChart: Chart | null = null;
const mrrCanvasRef = ref(null);
const growthCanvasRef = ref(null);
const retentionCanvasRef = ref(null);
const attractionCanvasRef = ref(null);
const churnRateCanvasRef = ref(null);
const monthlyRevenueForecastCanvasRef = ref(null);
const annualRevenueForecastCanvasRef = ref(null);

const updateCharts = () => {
    const months = Object.keys(props.metricsByMonth);
    const mrrData = months.map(month => props.metricsByMonth[month].mrr);
    const revenueGrowthData = months.map(month => props.metricsByMonth[month].revenueGrowth);
    const retentionRateData = months.map(month => props.metricsByMonth[month].retentionRate);
    const attractionRateData = months.map(month => props.metricsByMonth[month].attractionRate);
    const churnRateData = months.map(month => props.metricsByMonth[month].churnRate);
    const monthlyRevenueForecastData = months.map(month => props.metricsByMonth[month].monthlyRevenueForecast);
    const annualRevenueForecastData = months.map(month => props.metricsByMonth[month].annualRevenueForecast);

    if (mrrChart && mrrCanvasRef.value) {
        mrrChart.data.labels = months;
        mrrChart.data.datasets[0].data = mrrData;
        mrrChart.update();
    }

    if (growthChart && growthCanvasRef.value) {
        growthChart.data.labels = months;
        growthChart.data.datasets[0].data = revenueGrowthData;
        growthChart.update();
    }

    if (retentionChart && retentionCanvasRef.value) {
        retentionChart.data.labels = months;
        retentionChart.data.datasets[0].data = retentionRateData;
        retentionChart.update();
    }

    if (attractionChart && attractionCanvasRef.value) {
        attractionChart.data.labels = months;
        attractionChart.data.datasets[0].data = attractionRateData;
        attractionChart.update();
    }

    if (churnRateChart && churnRateCanvasRef.value) {
        churnRateChart.data.labels = months;
        churnRateChart.data.datasets[0].data = churnRateData;
        churnRateChart.update();
    }

    if (monthlyRevenueForecastChart && monthlyRevenueForecastCanvasRef.value) {
        monthlyRevenueForecastChart.data.labels = months;
        monthlyRevenueForecastChart.data.datasets[0].data = monthlyRevenueForecastData;
        monthlyRevenueForecastChart.update();
    }

    if (annualRevenueForecastChart && annualRevenueForecastCanvasRef.value) {
        annualRevenueForecastChart.data.labels = months;
        annualRevenueForecastChart.data.datasets[0].data = annualRevenueForecastData;
        annualRevenueForecastChart.update();
    }
};

onMounted(() => {
    const mrrCtx = mrrCanvasRef.value?.getContext('2d');
    const growthCtx = growthCanvasRef.value?.getContext('2d');
    const retentionCtx = retentionCanvasRef.value?.getContext('2d');
    const attractionCtx = attractionCanvasRef.value?.getContext('2d');
    const churnRateCtx = churnRateCanvasRef.value?.getContext('2d');
    const monthlyRevenueForecastCtx = monthlyRevenueForecastCanvasRef.value?.getContext('2d');
    const annualRevenueForecastCtx = annualRevenueForecastCanvasRef.value?.getContext('2d');


    if (mrrCtx && growthCtx && retentionCtx && attractionCtx) {
        const months = Object.keys(props.metricsByMonth);
        const mrrData = months.map(month => props.metricsByMonth[month].mrr);
        const growthData = months.map(month => props.metricsByMonth[month].revenueGrowth);
        const retentionData = months.map(month => props.metricsByMonth[month].retentionRate);
        const attractionData = months.map(month => props.metricsByMonth[month].attractionRate);
        const churnRateData = months.map(month => props.metricsByMonth[month].churnRate);
        const monthlyRevenueForecastData = months.map(month => props.metricsByMonth[month].monthlyRevenueForecast);
        const annualRevenueForecastData = months.map(month => props.metricsByMonth[month].annualRevenueForecast);

        mrrChart = new Chart(mrrCtx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'MRR - Receita Recorrente Mensal',
                    data: mrrData,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        });

        growthChart = new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Crescimento',
                    data: growthData,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        });

        retentionChart = new Chart(retentionCtx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Taxa de Retenção',
                    data: retentionData,
                    backgroundColor: 'rgb(75, 192, 192)'
                }]
            }
        });

        attractionChart = new Chart(attractionCtx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Taxa de atração',
                    data: attractionData,
                    backgroundColor: 'rgb(75, 192, 192)'
                }]
            }
        });

        churnRateChart = new Chart(churnRateCtx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Taxa de Churn',
                    data: churnRateData,
                    backgroundColor: 'rgb(75, 192, 192)'
                }]
            }
        });

        monthlyRevenueForecastChart = new Chart(monthlyRevenueForecastCtx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Previsão de Receita Mensal',
                    data: monthlyRevenueForecastData,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        });

        annualRevenueForecastChart = new Chart(annualRevenueForecastCtx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Previsão de Receita annual',
                    data: annualRevenueForecastData,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        });
    }
    updateCharts();
    openTab('MRR');
});

const openTab = (tabName: string) => {
    let i: number;
    const x = document.getElementsByClassName('tabcontent');
    for (i = 0; i < x.length; i++) {
        (x[i] as HTMLElement).style.display = 'none';
    }
    (document.getElementById(tabName) as HTMLElement).style.display = 'block';
}

watch(() => [props.metricsByMonth], updateCharts, { immediate: true });
</script>

<template>
    <div>
        <div class="tab">
            <button class="tablinks" @click="openTab('MRR')">MRR - Receita Recorrente Mensal</button>
            <button class="tablinks" @click="openTab('Revenue Growth')">Crescimento</button>
            <button class="tablinks" @click="openTab('Retention Rate')">Taxa de Retenção</button>
            <button class="tablinks" @click="openTab('Attraction Rate')">Taxa de Atração</button>
            <button class="tablinks" @click="openTab('Churn Rate')">Taxa de Churn</button>
            <button class="tablinks" @click="openTab('Monthly Revenue Forecast')">Previsão de Receita Mensal</button>
            <button class="tablinks" @click="openTab('annual Revenue Forecast')">Previsão de Receita annual</button>
        </div>

        <div id="MRR" class="tabcontent">
            <canvas ref="mrrCanvasRef"></canvas>
            <p>O gráfico MRR (Monthly Recurring Revenue) mostra a receita recorrente mensal. Isso ajuda a entender a previsibilidade do faturamento.</p>
        </div>

        <div id="Revenue Growth" class="tabcontent">
            <canvas ref="growthCanvasRef"></canvas>
            <p>O gráfico de crescimento da receita mostra como a receita está crescendo ao longo do tempo. Isso ajuda a entender a taxa de crescimento do negócio.</p>
        </div>

        <div id="Retention Rate" class="tabcontent">
            <canvas ref="retentionCanvasRef"></canvas>
            <p>O gráfico de taxa de retenção mostra a porcentagem de clientes que continuam a usar o serviço ao longo do tempo. Isso ajuda a entender a satisfação do cliente.</p>
        </div>

        <div id="Attraction Rate" class="tabcontent">
            <canvas ref="attractionCanvasRef"></canvas>
            <p>O gráfico de taxa de atração mostra a porcentagem de novos clientes em relação ao total de clientes. Isso ajuda a entender a eficácia das estratégias de aquisição de clientes.</p>
        </div>

        <div id="Churn Rate" class="tabcontent">
            <canvas ref="churnRateCanvasRef"></canvas>
            <p>O gráfico de taxa de churn mostra a porcentagem de clientes que cancelaram o serviço ao longo do tempo. Isso ajuda a entender a retenção de clientes.</p>
        </div>

        <div id="Monthly Revenue Forecast" class="tabcontent">
            <canvas ref="monthlyRevenueForecastCanvasRef"></canvas>
            <p>O gráfico de previsão de receita mensal mostra a receita recorrente mensal prevista. Isso ajuda a entender a previsibilidade do faturamento.</p>
        </div>

        <div id="annual Revenue Forecast" class="tabcontent">
            <canvas ref="annualRevenueForecastCanvasRef"></canvas>
            <p>O gráfico de previsão de receita annual mostra a receita recorrente annual prevista. Isso ajuda a entender a previsibilidade do faturamento.</p>
        </div>
    </div>
</template>

<style scoped>
.tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

.tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
}

.tab button:hover {
    background-color: #ddd;
}

.tab button.active {
    background-color: #ccc;
}

.tabcontent {
    display: none;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-top: none;
}
</style>