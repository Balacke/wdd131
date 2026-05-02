
let selectElem = document.querySelector('select');
let logo = document.querySelector('img');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        // code for changes to colors and logo
        document.body.style.backgroundColor = "#381138";
        //had to look up how to stretch javascript accross multiple lines
        document.querySelector("h1").style.textShadow = `
            -1.5px -1.5px 0 #035e9d,
            1.5px -1.5px 0 #035e9d,
            -1.5px  1.5px 0 #035e9d,
            1.5px  1.5px 0 #035e9d,

            0 0 14px  #035e9d,
            0 0 28px  #035e9d,
            0 0 42px  #035e9d `;
        document.querySelector("h1").style.color = "#bcf8ef"
        document.getElementById("content").style.backgroundColor = "#381138";
       //had to look up how to get it to change the color for each element with the class. 
       //Now that I already did it a work around I could've tried would be to use querySelector for each tag but that also would have been a hassle and might not have fully worked because I have multiple elements with the same tag.
        document.querySelectorAll(".text").forEach(el => { el.style.color = "#bcf8ef" });
        logo.src ="./images/byui-logo-black.png";
        logo.alt ="Dark Image";
        document.querySelector("hidden").style.opacity= "0";
    } else if (current == 'light') {
        document.body.style.backgroundColor = "#f0f8ff";        
        document.querySelector("h1").style.textShadow = `
            -1.25px -1.25px 0 #381138,
            1.25px -1.25px 0 #381138,
            -1.25px  1.25px 0 #381138,
            1.25px  1.25px 0 #381138,

            0 0 18px  #381138,
            0 0 32px  #381138,
            0 0 48px  #381138 `;
        document.querySelector("h1").style.color = "#035e9d"
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
