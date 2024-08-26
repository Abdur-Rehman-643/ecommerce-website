document.addEventListener("DOMContentLoaded", function() {
    console.clear();
  
    let contentTitle;
  
    console.log(document.cookie);
    function dynamicClothingSection(ob) {
      let boxDiv = document.createElement("div");
      boxDiv.id = "box";
  
      let boxLink = document.createElement("a");
      boxLink.href = "./contentDetails.html?" + ob.id;
  
      let imgTag = document.createElement("img");
      imgTag.src = ob.preview || ob.image;
  
      let detailsDiv = document.createElement("div");
      detailsDiv.id = "details";
  
      let h3 = document.createElement("h3");
      let h3Text = document.createTextNode(ob.name || ob.title);
      h3.appendChild(h3Text);
  
      let h4 = document.createElement("h4");
      let h4Text = document.createTextNode(ob.brand || ob.category);
      h4.appendChild(h4Text);
  
      let h2 = document.createElement("h2");
      let h2Text = document.createTextNode("rs " + (ob.price || ob.price));
      h2.appendChild(h2Text);
  
      boxDiv.appendChild(boxLink);
      boxLink.appendChild(imgTag);
      boxLink.appendChild(detailsDiv);
      detailsDiv.appendChild(h3);
      detailsDiv.appendChild(h4);
      detailsDiv.appendChild(h2);
  
      return boxDiv;
    }
  
    let containerClothingMen = document.getElementById("containerClothingMen");
    let containerClothingWomen = document.getElementById("containerClothingWomen");
  
    function loadProductsFromFirstAPI() {
      let httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          contentTitle = JSON.parse(this.responseText);
          if (document.cookie.indexOf(",counter=") >= 0) {
            var counter = document.cookie.split(",")[1].split("=")[1];
            document.getElementById("badge").innerHTML = counter;
          }
          for (let i = 0; i < contentTitle.length && i < 5; i++) {
            if (i < 3) {
              containerClothingMen.appendChild(dynamicClothingSection(contentTitle[i]));
            } else {
              containerClothingWomen.appendChild(dynamicClothingSection(contentTitle[i]));
            }
          }
          loadProductsFromSecondAPI();
        } else if (this.readyState === 4) {
          console.log("First API call failed!");
        }
      };
      httpRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
      httpRequest.send();
    }
  
    function loadProductsFromSecondAPI() {
      let httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          let products = JSON.parse(this.responseText);
          for (let i = 0; i < products.length; i++) {
            if (products[i].id >= 15 && products[i].id <= 20) {
              console.log(products[i]);
              containerClothingWomen.appendChild(dynamicClothingSection(products[i]));
            }
          }
        } else if (this.readyState === 4) {
          console.log("Second API call failed!");
        }
      };
      httpRequest.open("GET", "https://fakestoreapi.com/products", true);
      httpRequest.send();
    }
  
    loadProductsFromFirstAPI();
  });
  