
var ist = angular.module('ist');
ist.service('WidgetService', [
    '$http',
    function ($http) {

        function parseWidgetJSON(widgetData) {
            var widget = null;
            try {
                widgetData.content.rendered = widgetData.content.rendered.replace(/&quot;/g, "\"");
                widgetData.content.rendered = widgetData.content.rendered.replace(/&#8220;/g, "\"");
                widgetData.content.rendered = widgetData.content.rendered.replace(/&#8221;/g, "\"");
                widgetData.content.rendered = widgetData.content.rendered.replace(/&#8216;/g, "\'");
                widgetData.content.rendered = widgetData.content.rendered.replace(/&#8217;/g, "\'");
                widgetData.content.rendered = widgetData.content.rendered.replace(/<br \/>/g, "");
                widgetData.content.rendered = widgetData.content.rendered.replace(/<\/p>/g, "");
                widgetData.content.rendered = widgetData.content.rendered.replace(/<p>/g, "");

                var platform_header = JSON.parse(widgetData.content.rendered.split("@@##")[0]);
                var widget_header = JSON.parse(widgetData.content.rendered.split("@@##")[1]);
                var widget_data = JSON.parse(widgetData.content.rendered.split("@@##")[2]);

                widget = {
                    id: widgetData.id,
                    info: {
                        type: widget_header.type,
                        version: widget_header.widget_version,
                        parent_widgets: widget_header.parent_widgets,
                        created_by: widget_header.created_by,
                        created_at: widget_header.created_at,
                        last_modified_at: widget_header.last_modified_at,
                        related_widgets: widget_header.related_widgets,
                        domain: widget_header.domain,
                        technology: widget_header.technology,
                        language: widget_header.language
                    },
                    data: {
                        name: widget_data.name,
                        description: widget_data.description,
                        category: widget_data.category,
                        conditions: widget_data.conditions,
                        criteria: widget_data.criteria,
                        issues: widget_data.issues,
                        heuristics: widget_data.heuristics,
                        actions: widget_data.heuristics,
                        data: widget_data.data,
                        links: widget_data.links,
                        repo: widget_data.repo,
                        status: widget_data.status,
                        comments: widget_data.comments
                    }

                }
            }
            catch (error) {
                console.log("Error while parsing the widget: " + widgetData.id);
            }
            return widget;
        }

        function getPublicWidgetById(id, publicToken) {

            var request = {
                method: 'GET',
                url: appConst.request.publicWidgetRepository.url + id,
                params: {
                    offset: appConst.request.publicWidgetRepository.params.offset,
                    per_page: appConst.request.publicWidgetRepository.params.per_page
                },
                headers: {
                    'Authorization': 'Bearer ' + publicToken
                }
            };

            return $http(request).then(function (response) {

                var widgetData = response.data;

                var widget = parseWidgetJSON(widgetData);
                return widget;
            });
        }

        function getPublicWidgets(publicToken) {

            var request = {
                method: 'GET',
                url: appConst.request.publicWidgetRepository.url,
                params: {
                    offset: appConst.request.publicWidgetRepository.params.offset,
                    per_page: appConst.request.publicWidgetRepository.params.per_page
                },
                headers: {
                    'Authorization': 'Bearer ' + publicToken
                }
            };

            return $http(request).then(function (response) {

                var widgetsData = response.data;
                var widgets = [];

                widgetsData.forEach(function (widgetData) {

                    var widget = parseWidgetJSON(widgetData);

                    if (widget) {
                        widgets.push(widget);
                    }
                });
                return widgets;

            }, function (error) {
                console.log("Error while fetching widgets: " + error.status);
            });
        }

        return {
            getPublicWidgetById: getPublicWidgetById,
            getPublicWidgets: getPublicWidgets
        }
    }
]);