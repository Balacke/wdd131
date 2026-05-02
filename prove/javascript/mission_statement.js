
let selectElem = document.querySelector('select');
let logo = document.querySelector('img');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        // code for changes to colors and logo
       document.body.style.backgroundColor = "#381138";
       document.getElementById("content").style.backgroundColor = "#381138";
       //had to look up how to get it to change the color for each element with the class. 
       //Now that I already did it a work around I could've tried would be to use querySelector for each tag but that also would have been a hassle and might not have fully worked because I have multiple elements with the same tag.
        document.querySelectorAll(".text").forEach(el => { el.style.color = "#bcf8ef" });
        logo.src ="./images/byui-logo-black.png";
        logo.alt ="Dark Image";
        document.querySelector("hidden").style.opacity= "0";
    
    } else if (current == 'light') {
        document.body.style.backgroundColor = "#f0f8ff";
        document.getElementById("content").style.backgroundColor = "#bcf8ef";    
        document.querySelectorAll(".text").forEach(el => {el.style.color = "#381138" });
        logo.src = "./images/byui-logo-blue.webp";
        logo.alt ="Light Image";
        document.querySelector("hidden").style.opacity= "0";

    } else {
        // code for changes to colors and logo
        document.querySelector("hidden").style.opacity= "1";

    }
}
