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
    'je@luis.com': new User('je@luis.com', 'Jefferson', 'je123'),
    'neia@rosa.com': new User('neia@rosa.com', 'Lucinéia', 'neia123')
};
