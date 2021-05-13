
export const styles = StyleSheet.create({
    max: {
      flex: 1,
    },
    buttonHolder: {
      height: 100,
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: '#0093E9',
      borderRadius: 10,
    },
    buttonText: {
      color: '#fff',
    },
    fullView: {
      width: dimensions.width,
      height: dimensions.height - 100,
    },
    remoteContainer: {
      width: '100%',
      height: 150,
      position: 'absolute',
      top: 5,
    },
    remote: {
      width: 150,
      height: 150,
      marginHorizontal: 2.5,
    },
    noUserText: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      color: '#0093E9',
    },
    heartContainer: {
      width: 10,
      height: 10,
      position: 'absolute',
      bottom: 24,
      right: 24,
    },
  });
  