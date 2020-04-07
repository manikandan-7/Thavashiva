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

export default class Datamap extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    var total = this.props.total
    var tamilnadu = this.props.tamilnadu
    const chartConfigs = {
      type: 'sunburst',
      renderAt: 'container',
      width: '400',
      height: '200',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "theme": "fusion",
          "bgColor": "transparent",
          "showPlotBorder": "1",
          "animation": "1",
          "animationDuration": "1",
          "fillColor": "#ff0000",
          "centerAngle": "90",
          "paletteColors": "ffffff, A88CCC, 77ECC8, 97FAA4, CFF69D, EED482, FFAE91, FE93B5, D98ACF, 7BCDE8, 94A8E9",

        },
        data: [
          {
            "id": "IND",
            "parent": "",
            "label": "IND",
          },
          {
            "id": "TN",
            "parent": "IND",
            "label": "TN",
          }
          ,
          {
            "id": "CNFRM",
            "parent": "TN",
            "label": "CONFIRMED",
            "value": tamilnadu.confirmed
          },
          {
            "id": "REC",
            "parent": "TN",
            "label": "RECOVERED",
            "value": tamilnadu.recovered
          },
          {
            "id": "DEATH",
            "parent": "TN",
            "label": "Deaths",
            "value": tamilnadu.deaths
          },
          {
            "id": "Active",
            "parent": "TN",
            "label": "Active",
            "value": tamilnadu.active
          }
        ]
      }
    }

    return (<div className="datamap">
      <h5>[Data Map]</h5>
      <ReactFC {
        ...chartConfigs
      }
      />
    </div>
    )
  }
}
