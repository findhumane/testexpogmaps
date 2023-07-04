import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

export default function App() {
  const renderLoading = (status) => {
    if (status == Status.LOADING) {
      return <h3>Loading...</h3>;
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <Wrapper
        apiKey={Constants.expoConfig.extra.apiKey}
        render={renderLoading}
        libraries={["marker"]}
      >
        <Text>Loaded</Text>
      </Wrapper>
    </View>
  );
}
