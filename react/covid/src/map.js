import React, {
  Component
} from 'react';
import Zoom from 'react-reveal/Zoom';
import Prismazoom from 'react-prismazoom'

import './map.css'
import FusionCharts from 'fusioncharts';
import Maps from 'fusioncharts/fusioncharts.maps';
import World from 'fusioncharts/maps/fusioncharts.world';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import Table from './table'
ReactFC.fcRoot(FusionCharts, Maps, World, FusionTheme);



class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }


  render() {
    const chartConfigs = {
      type: 'maps/tamilnadu',
      width: 800,
      height: 500,
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "caption": "Covid-19 cases",
          "theme": "fusion",
          "formatNumberScale": "0",
          "numberSuffix": " People",
          "bgColor": "#",
          "toolTipBorderColor": "#666666",
          "toolTipBgColor": "#efefef",
          "toolTipBgAlpha": "80",
          "showToolTipShadow": "1",

        },
        "colorrange": {
          "color": [{
            "minvalue": "0",
            "maxvalue": "0",
            "code": "#FF0000",

          }, {
            "minvalue": "1",
            "maxvalue": "5",
            "code": "#FF0000",

          }, {
            "minvalue": "6",
            "maxvalue": "50",
            "code": "#0000FF",

          }, {
            "minvalue": "51",
            "maxvalue": "200",
            "code": "#00008b",

          }]
        },
        "data": this.props.mapdata,

      },
    };
    return (
      <div className="content">
        <div >
          <div >
            <div >
              <Prismazoom
                maxZoom={3}
                scrollVelocity={0}   >
                <ReactFC {
                  ...chartConfigs
                }
                />
              </Prismazoom>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

export default Map