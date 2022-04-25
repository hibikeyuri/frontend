var allData = 0;
var responseData = 0; //for District
var getKey = [];

var total = 0;
var siteborrowEnable = 0;
var siteemptyEnable = 0;


const rendering = document.getElementById("myChart").getContext("2d");
let renderingChart = 0;


// var xlabel = 0;
// var xlabels = [];
// var ylabel = 0;
// var ydata = [];

getAllData_async();

//test function
$(document).ready(function () {
    $("button").click(function () {
        $.getJSON('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json', function (data) {
            let display = `area:${data[0].ar}<br>`
            console.log(data);
            $(".test").append(display);
            allData = data;
        });
    });
})

//I have magic number here, how do I revise this condition
//front-en part
function getDistrict(Data) {
    let temp = 0;
    for (let i = 0; i < Data.length; ++i) {
        if (Data[i].sareaen !== temp) {
            temp = Data[i].sareaen
            $("#district-list").append(
                '<option value="' + temp + '">'
            )
            console.log(temp)
        }
    }
}


//async part
//if async is down, return promise object. Using promise object method
//.then to use call back function
//using global variable
function getAllData_async() {
    axios.get("https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json")
        .then(function (response) {
            responseData = response.data
            console.log(responseData);
            getDistrict(responseData);
            getDifferentKey(responseData, getKey);
            // $("form").change(update);
        }).catch(function (error) {
            console.log(error)
        })
}

//different key thing
//frond-end part
function getDifferentKey(Data, getkey) {
    if (getkey.length < 1) {
        getkey = Object.keys(Data[0])
        console.log(getkey)
    }
    let forlist = "key-list"
    let idclass = "key-list-choice"
    $("form").append(`<label for=${idclass} bike data</label>`)
    $("form").append(`<input list=${forlist} id=${idclass} name=${idclass}>`)
    $("form").append(`<br>`)
    $("form").append(`<datalist id=${forlist}>`)
    for (let i = 0; i < getkey.length; ++i) {
        $("#" + forlist).append("<option value=" + getkey[i] + ">")
    }
    $("form").append(`</datalist>`)
}

function isCanvasBlank(chartcanvas) {
    const blank = document.createElement('canvas');
    blank.width = chartcanvas.width;
    blank.height = chartcanvas.height;

    console.log(blank.toDataURL())
    console.log(chartcanvas.toDataURL())
    return chartcanvas.toDataURL() === blank.toDataURL();
}

//event trigger function for form element
var update = function () {
    $("#serializearray").text(
        JSON.stringify($("form").serializeArray())
    )
    let formdata = $("form").serializeArray()
    //check all form are selected
    if (formdata[0].value !== "" && formdata[1].value !== "") {
        const [xlabels, ydata] = dataProccess(responseData, formdata);
        console.log(xlabels);
        console.log(ydata);
        const chartconfig = settingDrawing(xlabels, ydata);
        if(isCanvasBlank(document.getElementById("myChart"))){
            renderingChart = new Chart(rendering, chartconfig);
            // alert("update success");
        }
        else{
            console.log("renew canvas settings");
            renderingChart.data.labels = xlabels;
            renderingChart.data.datasets[0].data = ydata;
            console.log(renderingChart.data.labels)
            console.log(renderingChart.data.datasets[0].data)
            renderingChart.update();
        }
    }
    // alert("trigger form udate")
}

function dataProccess(Data, formData) {
    if (typeof Data !== "object") {
        console.log(typeof Data)
        console.log("Data type is not array")
    }
    else {
        let xlabel = formData[0].value;
        let ylabel = formData[1].value;
        let xlabels = [];
        let ydata = [];
        console.log(xlabel, ylabel)
        for (let i = 1; i < Data.length; ++i) {
            if (Data[i]["sareaen"] === xlabel) {
                xlabels.push(Data[i]["ar"])
                ydata.push(Data[i][ylabel])
            }
        }
        return [xlabels, ydata]
    }
}

$("form").change(update);

function settingDrawing(xLabels, yData) {
    const labels = xLabels;
    const data = {
        labels: labels,
        datasets: [{
            label: 'test dataset',
            data: yData,
            backgroundColor: [
                'rgba(223, 239, 224, 1)',
                'rgba(252, 226, 217, 1)'
            ],
            borderColor: [
                'rgba(223, 239, 224, 0.2)',
                'rgba(252, 226, 217, 0.2)'
            ],
            borderWidth: 1
        }]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
    return config;
}

console.log(responseData);
console.log(getKey);