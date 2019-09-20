"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    'je@je.com': new User('je@je.com', 'Jefferson Luís Nascimento', '123'),
    'neia@neia.com': new User('neia@neia.com', 'Lucinéia Rosa da Silva', '123')
};
