import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    from: 'Tepela',
    body:"When you are in westlands you don't have to go to town there are supemetro busses at the Galitos coridor, it is 90 bob to Juja, there might be long lines"
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    from: 'Tepela',
    body:"When you are in westlands you don't have to go to town there are supemetro busses at the Galitos coridor, it is 90 bob to Juja, there might be long lines"
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    from: 'Tepela',
    body:"When you are in westlands you don't have to go to town there are supemetro busses at the Galitos coridor, it is 90 bob to Juja, there might be long lines"
  },
];

const Item = ({from,body}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{from}</Text>
    <Text style={styles.title}>{body}</Text>
  </View>
);

const detail = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item from={item.from}  body={item.body}/>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default detail;