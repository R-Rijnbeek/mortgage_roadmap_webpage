window.addEventListener('load', function() {
    
    cuotasSelectList = document.getElementById("cuotas");
    mortgage_SelectList = document.getElementById("mortgage_type");

    cuota_options = createCuotaOptions()
    createSelectOptions(cuotasSelectList, cuota_options, 50 );
    createSelectOptions(mortgage_SelectList, ["contant Pay Mortgage", "constant Chargoff Mortgage"], "contant Pay Mortgage" )

    button = document.getElementById("calculate");
    AddEventListenerOnButton(button, MortgageCalculation)
})

function createSelectOptions(selectList, option_list, selected_value) {

    let i = 0;

    while (i < option_list.length) {
        var option = document.createElement("option");
        value = option_list[i]
        option.value = value;
        option.text = value;
        if (value == selected_value) {
            option.selected = true
        }
        selectList.appendChild(option);
        i++;
    }

}

function createCuotaOptions() {
    var Start = 2;
    var End = 250;
    var arr = [];
    for (var i = Start; i <= End; i++) {
        arr.push(i);
    }
    return arr
}

function AddEventListenerOnButton(buttonDOM, method) {
    buttonDOM.addEventListener("click", () => {
        method();
    })
}

function MortgageCalculation() {
    let dept = $('#dept').val();
    let cuotas = $('#cuotas').val();
    let APR = $('#APR').val();
    let mortgage_type = $('#mortgage_type').val();
    $.ajax(
        {
        url:"/mortgage_calculation",
        type:"POST",
        data: { "dept": dept,
                "cuotas": cuotas,
                "APR": APR,
                "mortgage_type": mortgage_type
        },
        success: function(response){
            console.log("INFO: Succesfull calculation" + JSON.stringify(response))
            CreateDataTableByResponse(response)
        },
        error: function(error){
            console.log("ERROR: Unespected error => " + error.status)
        },
    });
}

function CreateDataTableByResponse(response) {

    if ( $.fn.dataTable.isDataTable('#DataTable') ) {
        $('#DataTable').DataTable().destroy();
        $('#DataTable').empty();
    }

    new DataTable('#DataTable', {
        data: response.roadmap,
        columns: [
            { "data" : "dept", "title" : "dept" },
            { "data" : "charge_off", "title" : "charge_off" },
            { "data" : "interest_pay", "title" : "interest_pay" },
            { "data" : "cumulative_interest_pay", "title" : "cumulative_interest_pay" },
            { "data" : "topay", "title" : "topay" },
        ],
        columnDefs : [
            {
                "render": function (data, type, row) {
                     return commaSeparateNumber(data);
                },
                "targets":'_all' 
            },
        ],
        order: [[0, 'desc']],
        pageLength: 100,
        lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ]
    });
}


function commaSeparateNumber(val) {
    var number = DataTable.render.number(',', '.', 2, '€ ').display(val);

    return number;
}