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
    'je@je.com': new User('je@je.com', 'Jefferson Luís Nascimento', '123'),
    'neia@neia.com': new User('neia@neia.com', 'Lucinéia Rosa da Silva', '123')
};
