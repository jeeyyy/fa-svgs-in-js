var iconList = require('./fa-icons-svg.json');

function getIcon(iconName) {
    var name = iconName + '.svg';
    var svg = iconList[name];
    if (svg) {
        return svg;
    } else {
        throw new Error('No Icon with the name: ' + iconName + ', requested in font-awesome. Refer http://fontawesome.io/icons/ for list of icons. Icon should be requested with just the name and without the fa- prefix, Eg: getIcon("pencil").');
    }
}

module.exports = getIcon;
