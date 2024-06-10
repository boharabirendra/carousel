var Carousel = /** @class */ (function () {
    function Carousel(carouselSelector) {
        this.counter = 0;
        this.carousel = document.querySelector(carouselSelector);
        this.images = this.carousel.querySelectorAll(".carousel-image");
        this.images.forEach(function (image, index) {
            image.style.left = "".concat(index * 100, "%");
        });
    }
    Carousel.prototype.showImage = function (dotNumber) {
        var _this = this;
        if (dotNumber !== undefined && dotNumber !== null) {
            this.counter = dotNumber;
        }
        this.images.forEach(function (image, index) {
            image.style.transform = "translateX(-".concat(_this.counter * 100, "%)");
        });
        this.removeDotBackgroundColor();
        var dot = document.querySelector("#dot-".concat(this.counter));
        if (dot) {
            dot.style.backgroundColor = "#FFF";
        }
    };
    Carousel.prototype.next = function () {
        this.counter = (this.counter + 1) % this.images.length;
        this.removeDotBackgroundColor();
        var dot = document.querySelector("#dot-".concat(this.counter));
        dot.style.backgroundColor = "#FFF";
        this.showImage();
    };
    Carousel.prototype.prev = function () {
        this.counter--;
        if (this.counter < 0) {
            this.counter = this.images.length - 1;
        }
        this.removeDotBackgroundColor();
        var dot = document.querySelector("#dot-".concat(this.counter));
        dot.style.backgroundColor = "#FFF";
        this.showImage();
    };
    Carousel.prototype.getNumberOfImages = function () {
        return this.images.length;
    };
    Carousel.prototype.removeDotBackgroundColor = function () {
        var dots = document.querySelectorAll(".dot");
        dots.forEach(function (dot) {
            dot.style.backgroundColor = "";
        });
    };
    return Carousel;
}());
document.addEventListener("DOMContentLoaded", function () {
    //creating carousel class object
    var carousel = new Carousel(".carousel-container");
    //getting carousel container from DOM
    var carouselContainer = document.querySelector(".carousel-container");
    // changing carousel images after each 3 seconds
    setInterval(function () {
        carousel.next();
    }, 3000);
    //  next button logic
    var nextBtn = document.querySelector(".next-btn");
    nextBtn.addEventListener("click", function () {
        carousel.next();
    });
    // prev button logic
    var prevBtn = document.querySelector(".prev-btn");
    prevBtn.addEventListener("click", function () {
        carousel.prev();
    });
    //creating dot container
    var dotContainer = document.createElement("div");
    dotContainer.style.position = "absolute";
    dotContainer.style.left = "50%";
    dotContainer.style.bottom = "12px";
    dotContainer.style.display = "flex";
    dotContainer.style.gap = "5px";
    var dotContainerWidth = carousel.getNumberOfImages() * 28 +
        carousel.getNumberOfImages() * 3;
    dotContainer.style.marginLeft = "-".concat(dotContainerWidth / 2, "px");
    //creating dot as per need i.e dot will be create according 
    // to the number of images present in carousel
    for (var i = 0; i < carousel.getNumberOfImages(); i++) {
        var dot = document.createElement("span");
        dot.style.width = "28px";
        dot.style.display = "block";
        dot.style.height = "5px";
        dot.style.cursor = "pointer";
        dot.setAttribute("dotNumber", i.toString());
        dot.id = "dot-".concat(i);
        dot.className = "dot";
        dot.style.backgroundColor = i === 0 ? "#FFF" : "";
        dot.style.border = "2px solid #FFF";
        dot.style.borderRadius = "5px";
        dot.style.transition = "background-color 1s";
        dotContainer.appendChild(dot);
    }
    carouselContainer === null || carouselContainer === void 0 ? void 0 : carouselContainer.appendChild(dotContainer);
    //  handling dot click
    var dots = document.querySelectorAll(".dot");
    dots.forEach(function (dot) {
        dot.addEventListener("click", function () {
            var dotNumber = dot.getAttribute("dotNumber");
            carousel.showImage(Number(dotNumber));
        });
    });
});
