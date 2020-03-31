import React, {
    Component
  } from 'react';
  import FusionCharts from 'fusioncharts';
  import Maps from 'fusioncharts/fusioncharts.maps';
  import World from 'fusioncharts/maps/fusioncharts.world';
  import ReactFC from 'react-fusioncharts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  
  ReactFC.fcRoot(FusionCharts, Maps, World, FusionTheme);
  
 
  
  class Map extends Component {
      constructor(props) {
          super(props)
      
          this.state = {
               mapdata:[]
          }
      }
      componentDidMount=()=>{
          console.log("hihihi")
          this.mapdata()
      }
      mapdata=async()=>{
        const response = await fetch('http://localhost:9000/mapdata', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const body = await response.json();
        // console.log(body)

        this.setState({
            mapdata:body
        })
      }
      
    render() {
        const chartConfigs = {
            type: 'maps/tamilnadu',
            width: 600,
            height: 400,
            dataFormat: 'json',
            dataSource: {
              "chart": {
                "caption": "Covid-19 cases",
                "theme": "fusion",
                "formatNumberScale": "0",
                "numberSuffix": " People"
              },
              "colorrange": {
                "color": [{
                    "minvalue": "0",
                    "maxvalue": "0",
                    "code": "#008000",
                    "displayValue": "No cases"
                  }, {
                    "minvalue": "1",
                    "maxvalue": "5",
                    "code": "#B0BF92",
                    "displayValue": "Fewer cases"
                  }, {
                    "minvalue": "6",
                    "maxvalue": "50",
                    "code": "#91AF64",
                  }, {
                    "minvalue": "51",
                    "maxvalue": "500",
                    "code": "#FF0000",
                    "displayValue": "Extreme cases"
                  }]
              },
              "data": this.state.mapdata,
              
            },
          };
      return(
      <div>
          <div>
          <h2>Tamilnadu Districts-wise Info</h2>
      <ReactFC {
        ...chartConfigs
      }
      />
      </div>
      <div>
          
      </div>
      </div>
      )
    }
  }
  
export default Map