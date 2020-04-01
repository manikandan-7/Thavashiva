import React, {
    Component
  } from 'react';
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
                  }, {
                    "minvalue": "1",
                    "maxvalue": "5",
                    "code": "#B0BF92",
                  }, {
                    "minvalue": "6",
                    "maxvalue": "50",
                    "code": "#FF0000",
                  }, {
                    "minvalue": "51",
                    "code": "#FF0000",
                  }]
              },
              "data": this.state.mapdata,
              
            },
          };
      return(
      <div className="content">
          <div >
      <ReactFC {
        ...chartConfigs
      }
      />
      </div>
      <div className="tabledata">
          <Table data={this.state.mapdata}/>
      </div>
      </div>
      )
    }
  }
  
export default Map