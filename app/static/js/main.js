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

function AddEventListenerOnButton(sliderDOM, method) {
    sliderDOM.addEventListener("click", () => {
        method();
    })
}

function MortgageCalculation() {
    let dept = $('#dept').val();
    let cuotas = $('#cuotas').val();
    let APR = $('#APR').val();
    let mortgage_type = $('#mortgage_type').val();
    dict = {"dept":dept,"cuotas":cuotas,"APR":APR,"mortgage_type":mortgage_type}
    console.log(dict)
}
