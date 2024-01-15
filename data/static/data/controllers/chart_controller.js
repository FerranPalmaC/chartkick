import { Controller } from "../js/stimulus.js"

export default class extends Controller {
    static targets = ["button", "date"]

    async update() {

        const startDate = this.dateTargets[0].value;
        const endDate = this.dateTargets[1].value;

        if (!checkDate(startDate, endDate)) {
            return;
        }

        let encodedStartDate = ''
        let encodedEndDate = ''

        try {
            encodedEndDate = encodeURIComponent(endDate)
            encodedStartDate = encodeURIComponent(startDate)
        } catch (e) {
            console.log(e.message)
        };

        const queryParams = `?startDate=${encodedStartDate}&endDate=${encodedEndDate}`;
        const url = `http://localhost:8000/api/companies/${queryParams}`

        axios.get(url).then(function(response) {
            updateChart(response);
        }).catch(function(error) {
            console.log('Error fetching data from server: ', error);
        })

    }
}

function isDateInvalid(dateStr) {
    return isNaN(new Date(dateStr));
}

function checkDate(startDate, endDate) {
    if (isDateInvalid(startDate) || isDateInvalid(endDate)) {
        console.error('Start or/and end date is/are invalid. Please try again');
        alert('Start or/and end date is/are invalid. Please try again')
        return false;
    }

    // Never throws error. Conversion always work
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (startDate.getTime() >= endDate.getTime()) {
        console.error('End date has to be bigger than start date');
        alert('End date has to be bigger than start date')
        return false;
    }

    // Dates are valid and end > start
    return true;
}

function formatData(rawData) {
    const parsedData = {};
    rawData.forEach(company => {
        const count = parsedData[company.country];
        parsedData[company.country] = count + 1 || 1;
    });
    return parsedData;
}

async function updateChart(response) {
    const ctx = getContext()

    // const data = formatData(response.data)
    const data = response.data

    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [
                {
                    label: 'Companies',
                    data: data
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function getContext() {
    const parentDiv = document.getElementById('chart')
    const cnv = document.getElementsByTagName('canvas')[0];
    var contentDiv = parentDiv.getElementsByTagName('div')[0]
    cnv.remove()
    parentDiv.removeChild(contentDiv)

    contentDiv = document.createElement('div')
    contentDiv.classList.add('contents')
    parentDiv.prepend(contentDiv)

    var canv = document.createElement('canvas');
    contentDiv.appendChild(canv)

    const ctx = canv.getContext('2d')
    return ctx;
}




