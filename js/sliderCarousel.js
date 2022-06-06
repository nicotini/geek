class SliderCarousel {
    constructor({
        main,
        next,
        prev,
        wrapper, 
        position = 0,
        slidesToShow = 3,
        center = false,
        responsive = [],
        auto = true,
       
    }) {
        if(!main || !wrapper) {
            console.warn('Необходимо подключить 2 свойства: "main", "wrapper"');
        }
        this.main = document.querySelector(main);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.wrapper = document.querySelector(wrapper);
        this.slides = document.querySelector(wrapper).children;
        this.slidesToShow = slidesToShow;
        this.center = this.center;
        this.options = {
            position,
            widthSlide: Math.floor(100 / this.slidesToShow),
        };
        this.responsive = responsive;
        this.auto = auto;
        
    }

    init() {
        this.addYodaClass();
        this.addStyle();
        if(this.prev && this.next) {
            this.controlSlider();
        } else {
            this.addArrow();
            this.controlSlider();
        }

        if(this.responsive){
            //console.log(1);
            this.responseInit();
        }
        if(this.auto) {
            this.autoSlider();
        }
        this.activeSlide();
    }
    addYodaClass() {
        this.main.classList.add('yoda-carousel');
        this.wrapper.classList.add('yoda-carousel__wrapper');
        Array.from(this.slides).forEach(function(elem) {
            elem.classList.add('yoda-carousel__item');
        });
        
    }
    addStyle() {
        let style = document.querySelector('#slider_carousel');
        if(!style) {
            style = document.createElement('style');
            style.id = 'slider_carousel';
        }
        style.textContent = `
        .yoda-carousel {
            
            overflow: hidden;
        }
        .yoda-carousel__wrapper {
            display: flex;
            transition: transform 0.5s;
            will-change: transition;
        }
        .yoda-carousel__item {
            display: flex;
            flex-direction: column;
            flex: 0 0 ${this.options.widthSlide}%;
            transition: 0.5 all ease;
        }`;
        document.head.append(style);
    
    }
    controlSlider(){
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }
    prevSlider() {
        -- this.options.position;
       // console.log(this.options.position);
        if(this.options.position < 0) {
            this.options.position = this.slides.length - this.slidesToShow;
           }
           this.wrapper.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;

    }
   nextSlider() {
       ++ this.options.position;
       /* console.log(this.options.position); */
       if(this.options.position > this.slides.length - this.slidesToShow) {
        this.options.position = 0;
       }
       this.wrapper.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
   }

    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'yoda-btn-left';
        this.next.className = 'yoda-btn-right';

        this.main.append(this.prev);
        this.main.append(this.next);
        
        let styleTag = document.querySelector('#slider_carousel');
        if(!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'slider_carousel';
        }
        
        styleTag.textContent = `
        .yoda-btn-left,
        .yoda-btn-right {
            position: absolute;
            top: 50%;
            border: transparent;
            padding: 20px;
            border: solid black;
            border-width: 0 3px 3px 0;
            display: inline-block;
            padding: 3px;
            background: transparent;
        }
        .yoda-btn-left {
            left: 0.5%;
            transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
        }
        .yoda-btn-right {
            right: 0.5%;
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
        }
        `;
        
        document.style.append(styleTag);
        console.log(style);
    }
    autoSlider() {
        let timer = setInterval(this.nextSlider.bind(this), 1500); 
    }

    responseInit() {
        const slisesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map(item => item.breakpoint);
       
        const maxResponse = Math.max(...allResponse);
        //console.log(maxResponse);

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            //console.log(widthWindow);
            if(widthWindow < maxResponse) {
                for( let i = 0; i < allResponse.length; i++) {
                    if(widthWindow < allResponse[i]) {
                        this.slidesToShow = this.responsive[i].slideToShow;
                        this.options.widthSlide = 100/this.slidesToShow;
                        this.addStyle();
                    } 
                }
            } else {
                this.slidesToShow = slisesToShowDefault;
                this.options.widthSlide = 100/this.slidesToShow;
                this.addStyle();
            }
        };
        checkResponse();
        window.addEventListener('resize',checkResponse);
    }
    activeSlide() {
        const centralIndex = Math.floor(this.slidesToShow /2);
    }
   

}