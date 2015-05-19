
// ako zovemo module sa jednim argumentom, onda znači da na postojeći dodajemo novu funkciju
angular.module("customServices", [])
.factory("logService", function () {
    var messageCount = 0;
    return {
        //service objekt koji fja vraća je singleton, znači svi koji koriste servis dobivaju isti objekt
        // varijablu messageCount modificiraju sve komponente koje zovu servis
        log: function (msg) {
            console.log("(LOG + " + messageCount++ + ") " + msg);
        }

    };
});