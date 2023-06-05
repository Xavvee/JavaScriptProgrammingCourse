var first=window.prompt("Podaj pierwszą wartość: ");
var second=window.prompt("Podaj drugą wartość: ");
var third=window.prompt("Podaj trzcią wartość: ");
var fourth=window.prompt("Podaj czwartą wartość: ");
console.log(first, typeof first);
console.log(second, typeof second);
console.log(third, typeof third);
console.log(fourth, typeof fourth);


var forms = document.forms.form


function handleClick(){
    console.log("Rejestracja kliknięcia")
    console.log(forms.pole_tekstowe.value + " : " + typeof(forms.pole_tekstowe.value))
    console.log(forms.pole_liczbowe.value + " : " + typeof(forms.pole_liczbowe.value))
}