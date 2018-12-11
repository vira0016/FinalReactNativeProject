import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView,TouchableHighlight } from 'react-native';






export default class Listrestorant extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loaded: true,
      error: null
    }
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
      console.log("didMOUNT");
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
      console.log("lat error");
    this.setState({ error: err.message});
  }



  //this.getData();
  //geolocation -> fetch

render() {
    
   
    
   const {navigate, push, replace} = this.props.navigation;
  return (
      
      <React.Fragment>
    <ScrollView >
      {!this.state.loaded && (
        <Text>LOADING</Text>
      )}
      <Text style={styles.txt}>Gimme some data!</Text>
      <Button title="List of Restaurent"
        onPress={this.getData} />
        
      {this.state.error && (
        <Text style={styles.err}>{this.state.error}</Text>
      )}
      {this.state.data && this.state.data["businesses"].length > 0 && (
        this.state.data["businesses"].map(business => (
            <View key={business.id}>
            <TouchableHighlight  onPress={()=>navigate('details',{business: business})}>
                <Text  style={styles.txt}>
                    {business.name}</Text>
                    
                
          </TouchableHighlight>
          </View>
            
           
     
           
        ))
      )}
    </ScrollView>
</React.Fragment>




   
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