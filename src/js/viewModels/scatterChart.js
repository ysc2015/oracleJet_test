/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
//define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojnavigationlist'],
define([
    'ojs/ojcore', 
    'knockout', 
    'jquery', 
    'ojs/ojknockout', 
    'ojs/ojchart',
    'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojlabel'
],
        function (oj, ko, $)
        {
            function ScatterChartModel() {
                 var self = this;
                 
                /* chart data */
                var scatterSeries = [
                    {name: "Series 1", items: [{x: 15, y: 15}, {x: 25, y: 43}, {x: 25, y: 25}]},
                    {name: "Series 2", items: [{x: 25, y: 15}, {x: 55, y: 45}, {x: 57, y: 47}]},
                    {name: "Series 3", items: [{x: 17, y: 36}, {x: 32, y: 52}, {x: 26, y: 28}]},
                    {name: "Series 4", items: [{x: 38, y: 22}, {x: 43, y: 43}, {x: 58, y: 36}]}];
                
                var scatterGroups = ["Group A", "Group B", "Group C"];
                
                self.lineTypeValue = ko.observable('none');
                self.lineTypeOptions = [
                    {id: 'straight', label: 'straight'},
                    {id: 'curved', label: 'curved'},
                    {id: 'stepped', label: 'stepped'},
                    {id: 'segmented', label: 'segmented'},
                    {id: 'none', label: 'none'},
                ];
                
                var simpleData = "Series 1\\tSeries 2\\tSeries 3\\tSeries 4\\n" +
                        "15\\t15\\t25\\t43\\t25\\t25\\n25\\t15\\t55\\t45\\t57\\t47\\n17\\t36\\t32\\t52\\t26\\t28\\n38\\t22\\t43\\t43\\t58\\t36";
                
                this.scatterSeriesValue = ko.observableArray(scatterSeries);
                this.scatterGroupsValue = ko.observableArray(scatterGroups);
                this.simpleInputData = ko.observable(simpleData);
                
                this.parseData = function () {
                    var series = [];
                    // Check submited data
                    if (self.simpleInputData == null || self.simpleInputData == undefined)
                        return;
                    
                    // Initialize Series
                    self.scatterSeriesValue.removeAll();
                    self.scatterGroupsValue.removeAll();
                    // Parse data into lines
                    var lines = self.simpleInputData().split("\\n");
                    if (lines.length < 1)
                        return;
                    
                    // Get Series
                    var tmp = lines[0].split("\\t");
                    var seriesCount = tmp.length;
                    for (var i = 0; i < seriesCount; i++) {
                        series.push({name: tmp[i], items: []});
                    }
                    // Get Data
                    for (var l = 1; l < lines.length; l++) {
                        tmp = lines[l].split("\\t");
                        for(var k = 0; k < tmp.length; k++)
                        {
                            var y = 0;
                            var x = parseFloat(tmp[k]);
                            if (isNaN(x) || !isFinite(x))
                                x = 0;
                            k++;
                            if(k < tmp.length)
                                y = parseFloat(tmp[k]);
                            if (isNaN(y) || !isFinite(y))
                                y = 0;
                            series[l-1].items.push({x: x, y: y});
                        }
                    }
                    // Set data for chart
                    for (var l = 0; l < series.length; l++)
                        self.scatterSeriesValue.push(series[l]);
                }
            }

            return new ScatterChartModel();
        });
