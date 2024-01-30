const FRONT_SELECTED_CUOTA = {{FRONT_SELECTED_CUOTA}}
const CUOTA_OPTIONS = {{CUOTA_OPTIONS}}
const MORTGAGE_OPTIONS = {{MORTGAGE_OPTIONS}}
const FRONT_SELECTED_MORTGAGE = {{FRONT_SELECTED_MORTGAGE}}

window.addEventListener('load', function() {
    
    cuotasSelectList = document.getElementById("cuotas");
    mortgage_SelectList = document.getElementById("mortgage_type");

    createSelectOptions(cuotasSelectList, CUOTA_OPTIONS, FRONT_SELECTED_CUOTA );
    createSelectOptions(mortgage_SelectList, MORTGAGE_OPTIONS, FRONT_SELECTED_MORTGAGE )

    button = document.getElementById("calculate");
    AddEventListenerOnButton(button, MortgageCalculation)
})

function createSelectOptions(selectList, option_list, selected_value) {
    console.log(option_list)
    for (var key in option_list) {
        var option = document.createElement("option");
        var value = option_list[key]
        option.value = value;
        option.text = value;
        if (value == selected_value) {
            option.selected = true
        }
        selectList.appendChild(option);
    }
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

    document.getElementById("resume").style.display = null

    document.getElementById("Total_Dept").innerHTML = commaSeparateNumber(response.initial_dept)
    document.getElementById("Total_Interest_Pay").innerHTML = commaSeparateNumber(response.total_interest_pay)
    document.getElementById("Total_Pay").innerHTML = commaSeparateNumber(response.total_pay)

    if ( $.fn.dataTable.isDataTable('#DataTable') ) {
        $('#DataTable').DataTable().destroy();
        $('#DataTable').empty();
    }
    
    new DataTable('#DataTable', {
        data: response.roadmap,
        columns: [
            { "data" : "dept", "title" : "Dept" },
            { "data" : "charge_off", "title" : "Charge Off" },
            { "data" : "interest_pay", "title" : "Interest Pay" },
            { "data" : "cumulative_interest_pay", "title" : "Cumulative Interest Pay" },
            { "data" : "topay", "title" : "To Pay" },
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
        pageLength: -1,
        searching: false, 
        paging: false,
        info: false,
        dom: 'Bfrtip',
        buttons: ['copyHtml5', 'excelHtml5', 'pdfHtml5', 'csvHtml5']

    });
}

function commaSeparateNumber(val) {
    var number = DataTable.render.number(',', '.', 2, '€ ').display(val);
    return number;
}