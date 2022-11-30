const ctx = document.getElementById('myChart');
let regionSelected = '';

let region = 'INDONESIA';
let t2014  = 1267;
let t2018  = 4394;
let t2021  = 1338;

let elementChart = '';

const defaultValue = () => {
    region = 'Indonesia';
    t2014  = 1267;
    t2018  = 4394;
    t2021  = 1338;
}

const showChart = () => {
    elementChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['2014', '2018', '2021'],
          datasets: [{
            label: region,
            data: [t2014, t2018, t2021],
            borderWidth: 1
          }]
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

const handleShowChart = (value) => {
    region = value.dataset.region;
    t2014  = value.dataset.t2014;
    t2018  = value.dataset.t2018;
    t2021  = value.dataset.t2021;
    elementChart.destroy();
    showChart();
}

const getData = async () => {
    let res = await axios.get('/assets/sample.json');
    
    let list = '';

    res.data.map(r => {
        list += `
            <tr>
                <td>${r.region.toUpperCase()}</td>
                <td class="text-end">${r.t2014}</td>
                <td class="text-end">${r.t2018}</td>
                <td class="text-end">${r.t2021}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary" onclick="handleShowChart(this)" data-region="${r.region.toUpperCase()}"  data-t2018 ="${r.t2018}" data-t2014 ="${r.t2014}" data-t2021 ="${r.t2021}">
                        show 
                    </button>
                </td>
            </tr>
        `
    });

    document.querySelector('#table-body').innerHTML = list;
}

function isRegion(region) {
    return region.region === regionSelected;
}

window.addEventListener('load', function(){
    defaultValue();
    getData();
    showChart();
})