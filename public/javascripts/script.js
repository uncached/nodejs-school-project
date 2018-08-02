function getVal() {
    var x = document.getElementById("address"),
    y = document.getElementById("port");
    if (y==null) y=80;
    else y = y.value;
    if (x||y) document.getElementById("result").innerHTML = x.value + ':' + y + ' ?';
}