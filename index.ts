class Carousel {
  private carousel: HTMLElement;
  private images: NodeListOf<HTMLImageElement>;
  private counter: number = 0;

  constructor(carouselSelector: string) {
    this.carousel = document.querySelector(carouselSelector) as HTMLElement;
    this.images = this.carousel.querySelectorAll(".carousel-image");
    
    this.images.forEach((image: HTMLImageElement, index:number)=>{
        image.style.left = `${index * 100}%`;
    })

  }


   showImage(dotNumber?:number){
    if (dotNumber !== undefined && dotNumber !== null) {
        this.counter = dotNumber;
    }
    this.images.forEach((image: HTMLImageElement, index: number) => {
        image.style.transform = `translateX(-${this.counter * 100}%)`;
    });

    this.removeDotBackgroundColor();
    const dot = document.querySelector(`#dot-${this.counter}`) as HTMLElement;
    if (dot) {
        dot.style.backgroundColor = "#FFF";
    }
  }

  next(){
    this.counter = (this.counter + 1) % this.images.length;
    this.removeDotBackgroundColor();
    const dot = document.querySelector(`#dot-${this.counter}`) as HTMLElement;
    dot.style.backgroundColor = "#FFF";
    this.showImage();
  }

  prev(){
    this.counter--;
    if(this.counter < 0){
        this.counter = this.images.length - 1;
    }
    this.removeDotBackgroundColor();
    const dot = document.querySelector(`#dot-${this.counter}`) as HTMLElement;
    dot.style.backgroundColor = "#FFF";
    this.showImage();
  }

  getNumberOfImages(): number{
    return this.images.length;
  }

  removeDotBackgroundColor(){
    const dots = document.querySelectorAll(".dot") as NodeListOf<HTMLElement>;
    dots.forEach((dot: HTMLElement)=>{
        dot.style.backgroundColor = "";
    })
  }

}



document.addEventListener("DOMContentLoaded", () => {
//creating carousel class object
const carousel =  new Carousel(".carousel-container");


//getting carousel container from DOM
const carouselContainer = document.querySelector(".carousel-container");

 

// changing carousel images after each 3 seconds
 setInterval(()=>{
    carousel.next();
 }, 3000);



//  next button logic
 const nextBtn = document.querySelector(".next-btn") as HTMLButtonElement;
 nextBtn.addEventListener("click", ()=>{
   carousel.next();
 })

 // prev button logic
 const prevBtn = document.querySelector(".prev-btn") as HTMLButtonElement;
 prevBtn.addEventListener("click", ()=>{
   carousel.prev();
 })

 

 //creating dot container
 const dotContainer = document.createElement("div");
 dotContainer.style.position = "absolute";
 dotContainer.style.left = "50%";
 dotContainer.style.bottom = "12px";
 dotContainer.style.display = "flex";
 dotContainer.style.gap = "5px";


 const dotContainerWidth =
  carousel.getNumberOfImages() * 28 + 
  carousel.getNumberOfImages() * 3;

 dotContainer.style.marginLeft = `-${dotContainerWidth / 2}px`;


 //creating dot as per need i.e dot will be create according 
 // to the number of images present in carousel
 for(let i = 0; i < carousel.getNumberOfImages(); i++){
    const dot = document.createElement("span");
    dot.style.width = "28px";
    dot.style.display = "block";
    dot.style.height = "5px";
    dot.style.cursor = "pointer";
    dot.setAttribute("dotNumber", i.toString());
    dot.id = `dot-${i}`;
    dot.className = "dot";
    dot.style.backgroundColor = i === 0 ? "#FFF" : "";
    dot.style.border = "2px solid #FFF";
    dot.style.borderRadius = "5px";
    dot.style.transition = "background-color 1s";
    dotContainer.appendChild(dot);
 }
 carouselContainer?.appendChild(dotContainer);



//  handling dot click
 const dots = document.querySelectorAll(".dot") as NodeListOf<HTMLElement>;
 dots.forEach((dot: HTMLElement)=>{
      dot.addEventListener("click", ()=>{
        const dotNumber = dot.getAttribute("dotNumber");
        carousel.showImage(Number(dotNumber));
      })
 })
 
});
