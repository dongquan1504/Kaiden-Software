/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import _min from 'lodash/min';
import _max from 'lodash/max';

import fakedata from "@/constant/sensor-histories-sample-data.json";
import { format } from 'date-fns';

interface LineChartProp {
  labels: string[];
  data: number[];
  title: string
}

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

// Line.defaults.backgroundColor = '#9BD0F5'

const chartAreaBackgroundColorPlugin = {
  id: 'customCanvasBackgroundColor',
  beforeDatasetsDraw: (chart: any) => {
    const { ctx, chartArea: { top, left, height, width } } = chart;

    ctx.save();
    ctx.fillStyle = 'rgba(235,235,235,0.2)'; // background color
    ctx.fillRect(left, top, width, height);
  }
}

const LineChart = ({
  labels,
  data,
  title = ""
}: LineChartProp) => {
  const maxValue = parseInt(_max(data)?.toString() || '0') + 2;

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        max: maxValue,
        min: parseInt(_min(data)?.toString() || '0'),
        grid: {
          color: '#C8C8C8', // grid color, line phân vạch
          drawTicks: false
        },
      }
    },
    plugins: {
      title: {
        display: true,
        text: title,
        position: 'bottom',
        font: {
          weight: 'bold',
        }
      },
      subtitle: {
        position: 'left',
        display: true,
        text: 'Custom Chart Subtitle',
        font: {
          weight: 'bold',
        }
      },
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'line',
        }
      }
    },
  }

  const dataLine = {
    labels: labels,
    datasets: [
      {
        label: 'GeeksforGeeks Line Chart',
        data: data,
        pointRadius: 0,
        fill: false,
        borderColor: 'red',
        tension: 0.1,
        backgroundColor: '#D0560F', // line color
      },
    ],
  };

  return (
    <div style={{ width: '700px', height: '300px' }}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Line data={dataLine} options={options}
      plugins={[chartAreaBackgroundColorPlugin]}
      />
    </div>
  );
};

//not use component below when reuse
const PageChart = () => {
  const { minute_sensor_data, hour_sensor_data, day_sensor_data, week_sensor_data } = fakedata;
  // console.log(minute_sensor_data.histories.map((item: any) => item.value));
  // console.log(minute_sensor_data.histories.map((item: any) => format(item.date_time, "HH:mm")));

  return (<>
    minute_sensor_data
    <LineChart
      data={minute_sensor_data.histories.map((item: any) => item.value)}
      labels={minute_sensor_data.histories.map((item: any) => format(item.date_time, "HH:mm"))}
      title={format(minute_sensor_data.current_date, "yyyy/MM/dd")} />
    hour_sensor_data
    <LineChart
      data={hour_sensor_data.histories.map((item: any) => item.value)}
      labels={hour_sensor_data.histories.map((item: any) => format(item.date_time, "MM:dd"))}
      title={format(minute_sensor_data.current_date, "yyyy/MM/dd")} />
    day_sensor_data
    <LineChart
      data={day_sensor_data.histories.map((item: any) => item.value)}
      labels={day_sensor_data.histories.map((item: any) => format(item.date_time, "MM/dd"))}
      title={format(minute_sensor_data.current_date, "yyyy/MM/dd")} />
    week_sensor_data
    <LineChart
      data={week_sensor_data.histories.map((item: any) => item.value)}
      labels={week_sensor_data.histories.map((item: any) => format(item.date_time, "yyyy/MM"))}
      title={format(minute_sensor_data.current_date, "yyyy/MM/dd")} />
  </>)
}
export default PageChart;
