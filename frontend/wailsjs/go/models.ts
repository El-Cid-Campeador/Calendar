export namespace main {
	
	export class A {
	    date: string;
	    is_important: number;
	
	    static createFrom(source: any = {}) {
	        return new A(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.date = source["date"];
	        this.is_important = source["is_important"];
	    }
	}
	export class Todo {
	    id: string;
	    title: string;
	    is_important: number;
	
	    static createFrom(source: any = {}) {
	        return new Todo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.is_important = source["is_important"];
	    }
	}

}

