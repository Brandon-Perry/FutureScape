import React from 'react';
import {Line} from 'react-chartjs-2'

let ChartJS = require('chart.js')

const Chart = ({predictions}) => {


    let yesList = predictions.filter(el => {
        if (el.choice_id === 1) {
            return el
        }
    })

    let noList = predictions.filter(el => {
        if (el.choice_id === 2) {
            return el
        }
    })

    const yes_labels = yesList.map(el => {
        return el.created_at
    })

    const yes_values = yesList.map(el => {
        return el.probability
    })

    const data = {
        labels: yes_labels,
        datasets: [{
            data: yes_values,
            label: 'Probability Yes',
            borderColor: 'rgba(0,128,0,.5)',
            backgroundColor:'rgba(0,128,0,.2)',
        }]
    }

    const options = {
                scales: {
                    xAxes: [{
                        type: 'time'
                    }],
                    yAxes: [{
                        ticks: {
                            min: 1,
                            max: 99
                        }
                    }]
                },
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
            }

    return (
        <Line 
            data={data} 
            options={options} 
        />
    )


}




export default Chart

