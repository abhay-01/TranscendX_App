import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Switch, ScrollView } from 'react-native';

const Account = () => {
  const [showPosts, setShowPosts] = useState(true);

  // Dummy user data
  const userData = {
    name: 'John Doe',
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={require('../assets/dummy.png')}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{userData.name}</Text>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Show Posts</Text>
        <Switch
          value={showPosts}
          onValueChange={(value) => setShowPosts(value)}
        />
        <Text style={styles.switchText}>Show Images</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        {showPosts ? (
          <View>
            <Text style={styles.tabTitle}>Posts</Text>
            {/* Dummy data for posts */}
            <Text style={styles.post}>Post 1</Text>
            <Text style={styles.post}>Post 2</Text>
            <Text style={styles.post}>Post 3</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.tabTitle}>Images</Text>
            {/* Dummy data for images */}
            <Image source={require("../assets/dummy.png")} style={styles.image} />
            <Image source={require('../assets/dummy.png')} style={styles.image} />
            <Image source={require('../assets/dummy.png')} style={styles.image} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchText: {
    fontSize: 16,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  post: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default Account;
