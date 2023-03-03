import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList ,TextInput} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  const [posts, setPosts]= useState(null);
  const [search, setSearch] = useState(null);
  const [filteredPost,setFilteredPosts]=useState(null);
  
  useEffect(()=>{
const dataApi = ()=>{
  fetch("https://jsonplaceholder.typicode.com/posts").then((res)=>setPosts(res.json())).catch((err)=>{
    console.log("err:",err);
  });
  }
  dataApi();
  },[]);

  const handleSearch=(text)=>{
if(!text || text === " "){
  return;  // text blank or contain space in the starting
}
else{
  const filteredPost=posts.filter((post)=>post.title.toLowerCase().includes(text.toLowerCase()));
  setFilteredPosts(filteredPost);
}
  }
  return (
    <View style={styles.container}>
    <TextInput placeholder ="Enter post title for search" value={search}/>
    <TouchableOpacity onPress={handleSearch}> <Text> click on me for search </Text></TouchableOpacity>
      <Text style={styles.paragraph}>
        All Posts
      </Text>
      <FlatList data={filteredPost} renderItem={({item})=>{
      <Card>
        <AssetExample  title={item.title} description={item.description}/>
      </Card>
      }} 
      keyExtractor={(item)=>item.id}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
