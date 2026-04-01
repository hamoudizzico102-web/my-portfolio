function scrollToSection(){
    document.getElementById("editing").scrollIntoView({behavior:"smooth"});
}

function openModal(id){
    const modal = document.getElementById("modal");
    const content = document.getElementById("modal-content");

    content.innerHTML = document.getElementById(id).innerHTML;
    modal.classList.add("active");
}

function closeModal(){
    document.getElementById("modal").classList.remove("active");
}

function openImage(src){
    const lb = document.getElementById("lightbox");
    document.getElementById("lightbox-img").src = src;
    lb.classList.add("active");
}

function closeLightbox(){
    document.getElementById("lightbox").classList.remove("active");
}

function openCV(){
    document.getElementById("cv").classList.add("active");
}

function closeCV(){
    document.getElementById("cv").classList.remove("active");
}
