export class Post {
    constructor(
        public name:string,
        public body:string,
        public author:string,
        public image:string,
        public category_id: string,
        public published_at:string
    ) {}
}