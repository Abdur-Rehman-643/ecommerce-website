console.clear();

if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

let cartContainer = document.getElementById('cartContainer');

let boxContainerDiv = document.createElement('div');
boxContainerDiv.id = 'boxContainer';

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob, itemCounter, itemId) {
    let boxDiv = document.createElement('div');
    boxDiv.id = 'box';
    boxContainerDiv.appendChild(boxDiv);

    let boxImg = document.createElement('img');
    boxImg.src = ob.preview || ob.image;
    boxDiv.appendChild(boxImg);

    let boxh3 = document.createElement('h3');
    let h3Text = document.createTextNode((ob.name || ob.title) + ' × ' + itemCounter);
    boxh3.appendChild(h3Text);
    boxDiv.appendChild(boxh3);

    let boxh4 = document.createElement('h4');
    let h4Text = document.createTextNode('Amount: Rs ' + ob.price);
    boxh4.appendChild(h4Text);
    boxDiv.appendChild(boxh4);

    // Delete button
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete'; // You can replace this with an icon
    deleteButton.onclick = function() {
        removeFromCart(itemId);
    };
    boxDiv.appendChild(deleteButton);

    cartContainer.appendChild(boxContainerDiv);
    cartContainer.appendChild(totalContainerDiv);

    return cartContainer;
}

let totalContainerDiv = document.createElement('div');
totalContainerDiv.id = 'totalContainer';

let totalDiv = document.createElement('div');
totalDiv.id = 'total';
totalContainerDiv.appendChild(totalDiv);

let totalh2 = document.createElement('h2');
let h2Text = document.createTextNode('Total Amount');
totalh2.appendChild(h2Text);
totalDiv.appendChild(totalh2);

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount) {
    let totalh4 = document.createElement('h4');
    let totalh4Text = document.createTextNode('Amount: Rs ' + amount);
    totalh4.id = 'toth4';
    totalh4.appendChild(totalh4Text);
    totalDiv.appendChild(totalh4);
    totalDiv.appendChild(buttonDiv);
    console.log(totalh4);
}

let buttonDiv = document.createElement('div');
buttonDiv.id = 'button';
totalDiv.appendChild(buttonDiv);

let buttonTag = document.createElement('button');
buttonDiv.appendChild(buttonTag);

let buttonLink = document.createElement('a');
buttonLink.href = './orderPlaced.html';
buttonTag.appendChild(buttonLink);

let buttonText = document.createTextNode('Place Order');
buttonTag.onclick = function() {
    console.log("clicked");
    window.location.href = './orderPlaced.html';
};
buttonTag.appendChild(buttonText);

function fetchData(apiUrl, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        } else if (this.readyState === 4) {
            console.log('call failed!');
        }
    };
    httpRequest.open('GET', apiUrl, true);
    httpRequest.send();
}

function processCartData(contentTitle) {
    let counter = Number(document.cookie.split(',')[1].split('=')[1]);
    document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter);

    let item = document.cookie.split(',')[0].split('=')[1].split(" ");
    console.log(counter);
    console.log(item);

    let totalAmount = 0;
    for (let i = 0; i < counter; i++) {
        let itemCounter = 1;
        for (let j = i + 1; j < counter; j++) {
            if (Number(item[j]) == Number(item[i])) {
                itemCounter += 1;
            }
        }
        let product = contentTitle.find(p => p.id == item[i]);
        totalAmount += Number(product.price) * itemCounter;
        dynamicCartSection(product, itemCounter, item[i]);
        i += (itemCounter - 1);
    }
    amountUpdate(totalAmount);
}

function removeFromCart(itemId) {
    let counter = Number(document.cookie.split(',')[1].split('=')[1]);
    let items = document.cookie.split(',')[0].split('=')[1].split(' ');

    let newItems = [];
    let found = false;
    for (let i = 0; i < items.length; i++) {
        if (items[i] == itemId && !found) {
            found = true;
            counter--;
        } else {
            newItems.push(items[i]);
        }
    }

    document.cookie = "orderId=" + newItems.join(" ") + ",counter=" + counter;
    document.getElementById("badge").innerHTML = counter;
    document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter);

    // Refresh cart
    boxContainerDiv.innerHTML = '';
    totalDiv.innerHTML = '';
    totalh2 = document.createElement('h2');
    h2Text = document.createTextNode('Total Amount');
    totalh2.appendChild(h2Text);
    totalDiv.appendChild(totalh2);
    fetchData('https://5d76bf96515d1a0014085cf9.mockapi.io/product', function(data1) {
        fetchData('https://fakestoreapi.com/products', function(data2) {
            data2 = data2.filter(p => p.id >= 11 && p.id <= 20);
            processCartData([...data1, ...data2]);
        });
    });
}

let api1Data = [];
let api2Data = [];

fetchData('https://5d76bf96515d1a0014085cf9.mockapi.io/product', function(data) {
    api1Data = data;
    fetchData('https://fakestoreapi.com/products', function(data) {
        api2Data = data.filter(p => p.id >= 11 && p.id <= 20);
        processCartData([...api1Data, ...api2Data]);
    });
});
