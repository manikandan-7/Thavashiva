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

export default class Statistics1 extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const chartConfigs = {
            type: 'multiaxisline',
            renderAt: 'chart-container',
            width: '200',
            height: '150',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "theme": "fusion",
                    "caption": this.props.total.confirmed,
                    "subCaption": "India Cases",
                    "bgColor": " #003366",
                    "numDivLines": "0",
                    "alignCaptionWithCanvas": "1",
                    "captionHorizontalPadding": "2",
                    "captionOnTop": "1",
                    "captionAlignment": "left",
                },
                "categories": [{
                    "category": [{
                        "label": "1"
                    },
                    {
                        "label": "2"
                    },
                    {
                        "label": "3"
                    },
                    {
                        "label": "4"
                    },
                    {
                        "label": "5"
                    }
                    ]
                }],
                "axis": [{
                    "dataset": [{
                        "data": [{
                            "value": "137"
                        },
                        {
                            "value": "124"
                        },
                        {
                            "value": "156"
                        },
                        {
                            "value": "131"
                        },
                        {
                            "value": "206"
                        }
                        ]
                    }]
                }]
            }
        }
        return (<div >
            <ReactFC {
                ...chartConfigs
            }
            />
        </div>
        )
    }
}
