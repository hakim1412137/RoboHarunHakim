import { View, Button } from "react-native-web"
import { Text } from "react-native-elements"

export default function Services() {
  return (
    <View style={{ width: '100%', height: '100%', padding: 100, alignItems: 'center', backgroundColor: '#ffebbf' }}>
      <Text style={{ fontSize: 30, fontWeight: 800 }}>Welcome to the Robotic Educational and Shopping Center!</Text>
      <View style={{ width: '70%', paddingBlock: 50 }}>
        <Button title="View Courses" onPress={() => navigation.navigate('Courses')} />
        <Button title="View Competitions" onPress={() => navigation.navigate('Competitions')} />
        <Button title="View Resources" onPress={() => navigation.navigate('Resources')} />
        <Button title="Events" onPress={() => navigation.navigate('Events')} />
        <Button title="Shop Now" onPress={() => navigation.navigate('Shop')} />
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
      </View>
    </View>
  )
}
