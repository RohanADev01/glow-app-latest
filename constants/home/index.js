import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  mainCard: {
    width: '85%',
    height: 380,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 18,
    paddingHorizontal: 10,
    letterSpacing: -0.8,
  },
  cardSubtitle: {
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    letterSpacing: -0.4,
    color: '#6c757d',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    paddingVertical: 5,
  },
})