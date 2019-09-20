export class User {
    constructor(public email: string,
                public name: string,
                private password: string) {}

    matches(another: User): boolean {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
    }
}

export const users: {[key: string]: User} =  {
    'je@luis.com': new User('je@luis.com', 'Jefferson', 'je123'),
    'neia@rosa.com': new User('neia@rosa.com', 'Lucinéia', 'neia123')
};
