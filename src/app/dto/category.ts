
export class Category {

    id: number;
    name: string;
    displayName;

    constructor(id: number, name: string, displayName: string) {

        this.id = id;
        this.name = name;
        this.displayName = displayName;
    }
}