export class Item {
    id: number;
    title: string;
    date: string;
    image: string;
    content: string;

    constructor(id: number, title: string, date: string, image: string, content: string) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.image = image;
        this.content = content;
    }
}