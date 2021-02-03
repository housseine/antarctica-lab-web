import { Directive, HostListener, Input } from '@angular/core';

@Directive({ selector: '[zoom]' })
export class zoomer {

    @Input('img-id') imgID: string;
    @Input('result-id') resultID: string;

    ngAfterViewInit() {
        this.zoom(document.getElementById(this.imgID), document.getElementById(this.resultID));
    }

    zoom(img, result) {
        var lens, cx, cy;
        /* Create lens: */
        lens = document.createElement("DIV");
        lens.setAttribute("class", "img-zoom-lens");
        lens.style.position = "absolute";
        lens.style.border = "1px solid #d4d4d4";
        lens.style.width = "40px";
        lens.style.height = "40px";
        /* Insert lens: */
        img.parentElement.insertBefore(lens, img);
        /* Calculate the ratio between result DIV and lens: */
        cx = result.offsetWidth / lens.offsetWidth;
        cy = result.offsetHeight / lens.offsetHeight;
        /* Set background properties for the result DIV */
        result.style.backgroundImage = "url('" + img.src + "')";
        result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
        if( result.style.backgroundSize==0 ){
            result.style.backgroundSize=1000 + "px " + 1000 + "px";
        }
        /* Execute a function when someone moves the cursor over the image, or the lens: */
        lens.addEventListener("mousemove", moveLens);
        img.addEventListener("mousemove", moveLens);
        /* And also for touch screens: */
        lens.addEventListener("touchmove", moveLens);
        img.addEventListener("touchmove", moveLens);
        if(is_touch_enabled()){
            result.style.display="none";
        }

        function moveLens(e) {
            var pos, x, y;
            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            /*get the cursor's x and y positions:*/

            if (e.type == "touchmove") {
                pos = getPos(e);
                y = pos.y - (lens.offsetHeight / 2);
            }
            else {
                pos = getCursorPos(e);
                y = pos.y - (lens.offsetHeight / 2);
            }
            x = pos.x - (lens.offsetWidth / 2);
            /*prevent the lens from being positioned outside the image:*/
            if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
            if (x < 0) { x = 0; }
            if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
            if (y < 0) { y = 0; }
            /*set the position of the lens:*/
            lens.style.left = x + "px";
            lens.style.top = y + "px";
            /*display what the lens "sees":*/
            result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
           
        }
        function getCursorPos(e) {
            var a, x = 0, y = 0;
            e = e || window.event;
            /*get the x and y positions of the image:*/
            a = img.getBoundingClientRect();
            /*calculate the cursor's x and y coordinates, relative to the image:*/
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x: x, y: y };
        }
        function getPos(event) {
            var a, x = 0, y = 0;
            event = event || window.event;
            a = img.getBoundingClientRect();
            x = event.touches[0].clientX - window.pageXOffset;
            y = event.touches[0].clientY - window.pageYOffset;
            return { x: x, y: y };
        }
        function is_touch_enabled() { 
            return ( 'ontouchstart' in window ) ||  
                   ( navigator.maxTouchPoints > 0 ) ||  
                   ( navigator.msMaxTouchPoints > 0 ); 
        } 
    }

}