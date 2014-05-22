var React = require('react');
var firstRender = true;
var _ = require('lodash');

module.exports = function (params) {

    return function (req, res, next) {
        req.firstRender = firstRender;

        res.renderComponent = function (Component, data) {
            data = _.extend({}, data, res.locals);

            if (typeof window !== 'undefined') {
                if(params.exportReact){//react dev tools support
                    window.React = React; 
                }

                document.title = data.title ? data.title : '';

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

