import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';


export default class details extends React.Component {
  constructor(props) {
      
    super();
    this.state = {
      data: props.navigation.state.params.business,
      loaded: true,
      error: null
    }
      console.log(props.navigation.state.params.business)
  }
    
    baseURL = 'https://api.yelp.com/v3/businesses/search?';
    
  getData = (ev) => {

    console.log("long",this.state.lng);
    
    console.log(this.baseURL);
    this.setState({ loaded: false, error: null });
    let url = this.baseURL + 'longitude='+this.state.lng+'&latitude='+this.state.lat;
    let h = new Headers();
    h.append('Authorization', 'Bearer 37ew6Arg4_5rpn_u657Y1zS_DY2zBksQvdjoYAi92gqLEx5D7j-NhBPbxDqn09114scNvttPRct5zWjo_ZvT9WJ8MU-vyciZomi-U7hw_Yu-eAIOR-H2sNvHtbX9W3Yx');
    // h.append('X-Client', 'Steve and Friends');

    let req = new Request(url, {
      headers: h,
      method: 'GET'
    });

    fetch(req)
      .then(response => response.json())
      .then(this.showData)
      .catch(this.badStuff)
  }
  showData = (data) => {
    this.setState({ loaded: true, data });
    console.log(data);
    console.log(data["businesses"]);
  }
  badStuff = (err) => {
    this.setState({ loaded: true, error: err.message });
  }
  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24
    };
    this.setState({ ready: false, error: null });
    navigator.geolocation.getCurrentPosition(this.geoSuccess,
      this.geoFailure,
      geoOptions);
  }

  geoSuccess = (position) => {
    console.log(position.coords.latitude);

    this.setState({
      ready: true,
      lat: position.coords.latitude, 
      lng: position.coords.longitude 
    })
  }
  geoFailure = (err) => {
    this.setState({ error: err.message});
  }



  //this.getData();
  //geolocation -> fetch

render() {
  return (
      
     
    <ScrollView >
    
        
            
          <Text>{this.state.data.name}</Text>
          <Text>{this.state.data.phone}</Text>
          <Text>{this.state.data.rating}</Text>
          <Text>{this.state.data.location.address1}</Text>
          <Text>{this.state.data.price}</Text>
          <Text>{this.state.data.city}</Text>

            
            
           

    </ScrollView>





  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 24,
    color: '#333'
  },
  err: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold'
  }
});