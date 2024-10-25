import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Scan: undefined;
  // Add other screen names here
};

export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Scan'
>;
