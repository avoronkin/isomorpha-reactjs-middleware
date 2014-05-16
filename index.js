var React = require('react');
var firstRender = true;

module.exports = function (params) {

    return function (req, res, next) {
        req.firstRender = firstRender;

        res.renderComponent = function (Component, data) {

            if (typeof window !== 'undefined') {
                React.renderComponent(Component(data), document.getElementById(params.rootElId));
            } else {
                var html = React.renderComponentToString(Component(data));

                res.render(params.layoutName, {
                    data: data,
                    component: html
                });

            }

            firstRender = false;
        };

        next();
    };
};
