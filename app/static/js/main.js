window.addEventListener('load', function() {
    selectList = document.getElementById("cuotas");

    for (var i = 2; i < 251; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        if (i == 50) {
            option.selected = true
        }
        
        selectList.appendChild(option);

        
    }

    button = document.getElementById("calculate");
    AddEventListenerOnButton(button, MortgageCalculation)
})


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
