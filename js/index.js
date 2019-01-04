function setName() {
    document.getElementById("name").innerHTML = getName() + " your remaining bids are ...";
}

function setRemaining(str) {
    document.getElementById("rem").innerHTML = str;
}

function getName() {
    return document.getElementById("lname").value;
}

function getBids() {
    return document.getElementById("bids").value;
}

function findRemaining() {

    var name = getName().toUpperCase();
    var bids = getBids().trim();

    if(isEmpty("lname")) {
        alert ('Last Name: Empty value is not allowed');
        return;
    }
    
    if(isEmpty("bids")) {
        alert ('Bids: Emtpy value is not allowed');
        return;
    }

    var index = bids.indexOf(name);
    if(index < 0) {
        alert(name + " doesn't exist. Please make sure last name exist in bid text");
        return;
    }

    //get rid of commas and split on spaces
    var bidsArray = bids.replace(/,/g, '').split(/\s+/g);

    var array = Array(35).fill(0);

    if(index === 0) {
        printRemaining(bidsArray, array);
        return;
    }

    //read up to the first "CPT"
    bidsArray = bidsArray.slice(bidsArray.indexOf("CPT"));

    //read through the array each time on CPT slice the array
    for(var i = 0; bidsArray[i] !== name; i++) {
        if(bidsArray[i] === "CPT") {
            bidsArray = bidsArray.slice(i+1);
            findBid(array,bidsArray);
            i = 0;
        }
    }
    printRemaining(bidsArray, array);
}

function printRemaining(bidsArray, array){

    //read up through users "CPT"
    bidsArray = bidsArray.slice(bidsArray.indexOf("CPT")+1);

    var rem = [];
    //while there's things left in array and they're digits
    for(var i = 0; i < bidsArray.length && /^\d+$/.test(bidsArray[i]); i++){
        if(array[bidsArray[i]] === 0)
            rem.push(' ' + bidsArray[i]);
    }

    setName(name);
    setRemaining(rem);
}

//find what bid each person is getting
function findBid(array, bids) {
    if(array[bids[0]] === 0)
        array[bids[0]] = bids[0];
    else {
        bids = bids.slice(1);
        findBid(array,bids);
    }
}

function isEmpty(field) { 
    return !document.getElementById(field).value.match(/\S/);
}