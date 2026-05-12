let menuBtn = document.getElementsByClassName("menu-btn")[0];
console.log(menuBtn);

menuBtn.addEventListener("click", handleMenuBtnClick);

// function 
function handleMenuBtnClick(event) {
    console.log(event);
    //grab nav toggle .hide class on nav tag
    let nav = document.getElementsByTagName("nav")[0];
    nav.classList.toggle("hide");

    //toggle animation
    menuBtn.classList.toggle("change");
}
