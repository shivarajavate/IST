
class SectionArea {
    constructor() {
        
        this.x;
        this.y;
        this.w;
        this.h;

        this.sectionID = -1;
    }

    init(x, y, w, h, sectionID) {
        
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.sectionID = sectionID;
    }
}