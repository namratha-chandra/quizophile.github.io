//javascript for validation
function validationform() {
    var x = document.getElementById("myname");
    var a = x.value.search(/^[A-Z][a-z]+, ?[A-Z][a-z]+, ?[A-Z]\.?$/);
    if (a != 0) {
        alert("The name you entered (" + x.value + ") is not in the correct form. \n" +
            "The correct form is:" +
            "last-name, first-name, middle-initial \n" +
            "Please go back and fix your name");
        return false;
    } else {
        return true;
    }
}

function phonevalidation() {
    var y = document.getElementById("myphone");
    var z = y.value.search(/^\d{3}-\d{3}-\d{4}$/);
    if (z != 0) {
        alert("The phone number you enterd is wrong.\n(" + y.value + ")is not a correct form" +
            "The corect form is ddd-ddd-dddd \n" +
            "please enter the correct phone number :\n");
        return false;
    } else
        return true;
}