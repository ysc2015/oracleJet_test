/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojinputtext'],
        function (oj, ko, $)
        {
            function BoxPlotChartModel() {
                var self = this;

                /* chart data */
                var boxPlotSeries = [
                ];
                var boxPlotGroups = ["Group A", "Group B", "Group C", "Group D"];

                self.boxPlotSeriesValue = ko.observableArray(boxPlotSeries);
                self.boxPlotGroupsValue = ko.observableArray(boxPlotGroups);

                /* toggle buttons */
                self.orientationValue = ko.observable('vertical');

                self.orientationValues = [
                    {id: 'vertical', label: 'vertical'},
                    {id: 'horizontal', label: 'horizontal'}
                ];

                var simpleData = "Series 1\\t4\\tSeries 2\\t4\\n3\\t8\\t12\\t17\\t28\\t40\\t50\\n21\\t24\\t36\\t44\\t65\\t15\\n7\\t16\\t23\\t32\\t49\\n8\\t12\\t16\\t27\\t49\\t61\\n12\\t17\\t21\\t24\\t35\\n5\\t14\\t24\\t31\\t47\\n26\\t37\\t48\\t52\\t71\\t9\\t12\\t78\\n10\\t14\\t37\\t50\\t58";

                this.simpleInputData = ko.observable(simpleData);
                this.getValue = function (num) {
                    var x = parseFloat(num);
                    if (isNaN(x) || !isFinite(x))
                        x = 0;
                    return x;
                };

                this.parseData = function () {
                    var series = [];
                    var nLinePerSerie = [];
                    // Check submited data
                    if (self.simpleInputData == null || self.simpleInputData == undefined)
                        return;
                    
                    //console.log("simpleInputData", self.simpleInputData());
                    
                    // Initialize Series
                    self.boxPlotSeriesValue.removeAll();
                    self.boxPlotGroupsValue.removeAll();
                    // Parse data into lines
                    var lines = self.simpleInputData().split("\\n");
                    if (lines.length < 1)
                        return;
                    //console.log("lines", lines);
                    // Get Series
                    var tmp = lines[0].split("\\t");
                    var seriesCount = tmp.length;
                    for (var i = 0; i < seriesCount; i++) {
                        if(i % 2 === 0)
                            series.push({name: tmp[i], items: []});
                        else
                            nLinePerSerie.push(self.getValue(tmp[i]));
                    }
                    
                   // console.log("series", series);
                   // console.log("nLinePerSerie", nLinePerSerie);
                    
                    var serieN = 0;
                    // Get Data
                    for (var l = 1; l < lines.length; l++) {
                        var low = 0, q1 = 0, q2 = 0, q3 = 0, high = 0, items = [];
                        for(var ns = 0; l < lines.length && ns < nLinePerSerie[serieN]; ns++, l++)
                        {
                            tmp = lines[l].split("\\t");
                            for (var k = 0; k < tmp.length; k++)
                            {
                                switch(k){
                                    case 0:
                                        low = self.getValue(tmp[k]);
                                        break;
                                    case 1:
                                        q1 = self.getValue(tmp[k]);
                                        break;
                                    case 2:
                                        q2 = self.getValue(tmp[k]);
                                        break;
                                    case 3:
                                        q3 = self.getValue(tmp[k]);
                                        break;
                                    case 4:
                                        high = self.getValue(tmp[k]);
                                        break;
                                    default:
                                        items.push(self.getValue(tmp[k]));
                                        break;       
                                }
                            }
                            series[serieN].items.push({low: low, q1: q1, q2: q2, q3: q3, high: high, items: items});
                        }
                        serieN++;
                    }
                    //console.log("series", series);
                    // Set data for chart
                    for (var l = 0; l < series.length; l++)
                        self.boxPlotSeriesValue.push(series[l]);
                }
                this.parseData();
            }

            return new BoxPlotChartModel();
        });
