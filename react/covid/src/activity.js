import React, {
    Component
  } from 'react';

  import './map.css'
  import FusionCharts from 'fusioncharts';
  import Maps from 'fusioncharts/fusioncharts.maps';
  import World from 'fusioncharts/maps/fusioncharts.world';
  import ReactFC from 'react-fusioncharts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  ReactFC.fcRoot(FusionCharts, Maps, World, FusionTheme);

export default class Activity extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
      var activity=this.props.activity
        const chartConfigs= {
            type: 'multiaxisline',
            renderAt: 'chart-container',
            width: '400',
            height: '250',
            dataFormat: 'json',
            dataSource: {
              "chart": {
                "theme": "fusion",
                "bgColor":" #003366",
                "caption": "Case Analysis",
                "subcaption": "Last 6 Days",
                "baseFontColor": "#333333",
                "baseFont": "Helvetica Neue,Arial",
                "xaxisname": "Day of Week",
                "numDivLines": "0",
                "palettecolors": "#90ee90"

              },
              "categories": [{
                "category": [{
                    "label": ""
                  },
                  {
                    "label": ""
                  },
                  {
                    "label": ""
                  },
                  {
                    "label": ""
                  },
                  {
                    "label": ""
                  },
                  {
                    "label": ""
                  }
                ]
              }],
              "axis": [{
                  "title": "Total Cases",
                  "titlepos": "left",
                  "tickwidth": "10",
                  "dataset": [{
                    "data": [{
                        "value": activity[0]
                      },
                      {
                        "value": activity[3]
                      },
                      {
                        "value": activity[6]
                      },
                      {
                        "value": activity[9]
                      },
                      {
                        "value": activity[12]
                      },
                      {
                        "value": activity[15]
                      },
                      {
                        "value": "227"
                      }
                    ]
                  }]
                }
              ]
            }
        }
        return (
            <div>
                  <ReactFC {
        ...chartConfigs
      }
      />
            </div>
        )
    }
}
