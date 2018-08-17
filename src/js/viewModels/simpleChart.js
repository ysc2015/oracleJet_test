/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart', 'ojs/ojselectcombobox', 'ojs/ojinputtext', 'ojs/ojlabel'],
        function (oj, ko, $) {

            function SimpleChartViewModel() {
                var self = this;
                self.chartType = ko.observable("bar");
                self.selectedItems = [];
                self.chartData = "ColumnA\\tColumnB\\tColumnC\\tColumnD\\n1\\t2\\t3\\t4\\na\\tb\\tc\\td";
                self.headers = ko.observableArray();
                self.selectedGroups = "";

                self.barSeriesValue = ko.observableArray();
                self.barGroupsValue = ko.observableArray();
                
                

                self.selectionListener = function () {
                }

                self.submitGroups = function () {
                    // Parse Groups
                    self.barGroupsValue.removeAll();
                    // if no groups set it to default
                    if(self.selectedGroups == "" && self.selectedGroups.indexOf(";") == -1)
                        return;
                    
                    var grp = self.selectedGroups.split(";");
                    if (grp.length > 0) {
                        for (var i = 0; i < grp.length; i++)
                        {
                            self.barGroupsValue.push(grp[i]);
                        }
                    }
                }

                self.submitData = function () {
                    var series = [];
                    // Check submited data
                    if (self.chartData == null || self.chartData == undefined)
                        return;
                    
                    // Initialize Series
                    self.barSeriesValue.removeAll();
                    // Parse data into lines
                    var lines = self.chartData.split("\\n");
                    if (lines.length < 1)
                        return;
                    
                    // Get Header
                    var tmp = lines[0].split("\\t");
                    var seriesCount = tmp.length;
                    for (var i = 0; i < seriesCount; i++) {
                        series.push({name: tmp[i], items: []});
                    }
                    
                    // Get Data
                    for (var l = 1; l < lines.length; l++) {
                        tmp = lines[l].split("\\t");
                        for (var i = 0; i < seriesCount; i++) {
                            var cast = parseFloat(tmp[i]);
                            if (!isNaN(cast) && isFinite(cast))
                                series[i].items.push(cast);
                            else
                                series[i].items.push(0);
                        }
                    }
                    // Set data for chart
                    for (var l = 0; l < series.length; l++)
                        self.barSeriesValue.push(series[l]);
                }
                // Init chart view on default data
                self.submitData();
            }
            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new SimpleChartViewModel();
        }
);
