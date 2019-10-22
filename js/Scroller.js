class Scroller{
    constructor(rootSelector){
        const rootElement = document.querySelector(rootSelector);
        this.sections = document.querySelectorAll('section');

        // console.log(this.sections);
        // const sectionsArr = Array.prototype.slice.call(this.sections);
        const sectionsArr = [...this.sections];
        // const sectionsArr = this.sections.findIndex((element)=>this.isScrolledIntoView(element));

        const currentSectionIndex = sectionsArr.findIndex(this.isScrolledIntoView);
        // console.log(this.currentSectionIndex);

        // this.currentSectionIndex = currentSectionIndex < 0 ? 0 : currentSectionIndex;
        this.currentSectionIndex = Math.max(currentSectionIndex, 0);

        this.isThrottled = false;

        // this.isScrolledIntoView(this.sections[0]);

        this.drawNavigation();
    }
    isScrolledIntoView(el){
        const rect = el.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = Math.floor(rect.bottom);

        const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);

        return isVisible;
    }
    listenScroll(e) {
        if (this.isThrottled) return;
        this.isThrottled = true;

        setTimeout(() => {
            this.isThrottled = false;
        }, 1000);

        const direction = e.deltaY > 0 ? 1 : -1;
        this.scroll(direction);
        // console.log(e.wheelDelta);
    }

        scroll(direction) {
            // console.log(direction);
            if (direction === 1) {
                const isLastSection = this.currentSectionIndex === this.sections.length - 1;
                if (isLastSection) return;
            } else if (direction === -1) {
                const firstSection = this.currentSectionIndex === 0;
                if (firstSection) return;
            }
            this.currentSectionIndex = this.currentSectionIndex + direction;
            this.scrollCurrentSection();
        }
    scrollCurrentSection() {
        this.selectActiveNavItem();
        this.sections[this.currentSectionIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    drawNavigation(){
        this.navigationContainer = document.createElement('aside');
        this.navigationContainer.setAttribute('class','scroller__navigation');
        const list = document.createElement('ul');

        this.sections.forEach((section, index)=>{
            const listItem = document.createElement('li');
            // listItem.textContent = 'home';

            listItem.addEventListener('click', ()=>{
                this.currentSectionIndex = index;

                this.scrollCurrentSection();
            })

            list.appendChild(listItem);
        })
        this.navigationContainer.appendChild(list);
        document.body.appendChild(this.navigationContainer);
        this.selectActiveNavItem();
    }

    selectActiveNavItem() {
        if(this.navigationContainer){
        const navigationItem = this.navigationContainer.querySelectorAll('li');

        navigationItem.forEach((item, index) => {
            if (index === this.currentSectionIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        }
    }
}