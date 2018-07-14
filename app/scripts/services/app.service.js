
var ist = angular.module('ist');
ist.service('AppService', [
    '$http',
    function ($http) {

        var resources = null;

        function loadResources() {

            var request = {
                method: 'GET',
                url: appConst.request.resource.url
            };

            return $http(request).then(function (response) {
                resources = response.data[0].value;
            });
        }

        function getResourceText(id) {
            return resources[appConst.lang][id].text;
        }

        function loginUser(username, password) {

            var request = {
                method: 'POST',
                url: appConst.request.publicRepositoryServer.url,
                params: {
                    username: username,
                    password: password
                }
            };

            return $http(request);
        }

        function stringToJson(bcStr, options) {
            var bcList = [];
            var bcStrList = bcStr[1].split(/][\s;]/);
            bcStrList.forEach(bcStr => {
                if (bcStr != "") {

                    var bc = {
                        name: '',
                        value: {
                            positive: [],
                            negative: []
                        }
                    };

                    bc.name = bcStr.substring(0, bcStr.indexOf(options.openSquareBracket));
                    bcStr = bcStr.replace(bc.name, options.space).replace(options.openSquareBracket, options.space).replace(options.closeSquareBracket, options.space).trim();

                    var scenarioStartIndex = bcStr.indexOf(options.openRoundBracket);
                    var scenarioEndIndex = bcStr.indexOf(options.closeRoundBracket);
                    var scenarioStr = bcStr.substring(scenarioStartIndex + 1, scenarioEndIndex);
                    if (scenarioStr != "") {
                        bc.value.positive = scenarioStr.split(options.comma);
                    }
                    bcStr = bcStr.replace(options.openRoundBracket + scenarioStr + options.closeRoundBracket, options.space);

                    var scenarioStartIndex = bcStr.indexOf(options.openRoundBracket);
                    var scenarioEndIndex = bcStr.indexOf(options.closeRoundBracket);
                    var scenarioStr = bcStr.substring(scenarioStartIndex + 1, scenarioEndIndex);
                    if (scenarioStr != "") {
                        bc.value.negative = scenarioStr.split(options.comma);
                    }
                    bcStr = bcStr.replace(options.openRoundBracket + scenarioStr + options.closeRoundBracket, options.space);

                    bcList.push(bc);
                }

            });
            return bcList;
        }

        return {
            stringToJson: stringToJson,
            loginUser: loginUser,
            loadResources: loadResources,
            getResourceText: getResourceText
        };
    }
]);
